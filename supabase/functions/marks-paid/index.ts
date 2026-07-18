// Stripe Webhook — checkout.session.completed → mark order paid + fire confirmation email
// Deploy to Supabase Dashboard as `marks-paid` with **Verify JWT = OFF**.
// Requires secrets: STRIPE_WEBHOOK_SECRET, INTERNAL_EMAIL_SECRET (also SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY auto-injected).

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*, stripe-signature, content-type",
  "Access-Control-Max-Age": "86400",
};

const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const INTERNAL_EMAIL_SECRET = Deno.env.get("INTERNAL_EMAIL_SECRET");

// Constant-time-ish string comparison
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function parseSigHeader(h: string): { t?: string; v1: string[] } {
  const parts = h.split(",");
  let t: string | undefined;
  const v1: string[] = [];
  for (const p of parts) {
    const [k, v] = p.split("=");
    if (k === "t") t = v;
    if (k === "v1" && v) v1.push(v);
  }
  return { t, v1 };
}

async function verifyStripeSignature(payload: string, header: string, secret: string, toleranceSec = 300) {
  const { t, v1 } = parseSigHeader(header);
  if (!t || v1.length === 0) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - Number(t)) > toleranceSec) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${payload}`));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return v1.some((v) => safeEqual(v, hex));
}

async function fetchOrder(orderId: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}&select=*`,
    {
      headers: { apikey: SERVICE_ROLE!, Authorization: `Bearer ${SERVICE_ROLE}` },
    },
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

async function markOrderPaid(orderId: string, sessionId: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}`, {
    method: "PATCH",
    headers: {
      apikey: SERVICE_ROLE!,
      Authorization: `Bearer ${SERVICE_ROLE}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      payment_status: "paid",
      paid_at: new Date().toISOString(),
      stripe_session_id: sessionId,
    }),
  });
  if (!res.ok) console.error("markOrderPaid failed:", res.status, await res.text());
}

async function triggerConfirmationEmail(order: any) {
  if (order.confirmation_email_status === "sent") return; // idempotent
  const url = `${SUPABASE_URL}/functions/v1/send-order-confirmation`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": INTERNAL_EMAIL_SECRET ?? "",
      apikey: SERVICE_ROLE!,
      Authorization: `Bearer ${SERVICE_ROLE}`,
    },
    body: JSON.stringify({
      to: order.email,
      orderId: order.id,
      orderNumber: order.order_number,
      customerName: order.customer_name,
      amount: order.amount,
      shippingAddress: order.shipping_address,
      products: order.products,
    }),
  });
  if (!res.ok) console.error("confirmation email trigger failed:", res.status, await res.text());
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  if (!STRIPE_WEBHOOK_SECRET || !SUPABASE_URL || !SERVICE_ROLE) {
    return new Response(JSON.stringify({ error: "Missing server secrets" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const sigHeader = req.headers.get("stripe-signature");
  const rawBody = await req.text();
  if (!sigHeader) {
    return new Response(JSON.stringify({ error: "Missing stripe-signature" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const valid = await verifyStripeSignature(rawBody, sigHeader, STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data?.object ?? {};
    const orderId = session.metadata?.order_id || session.client_reference_id;
    if (orderId) {
      const order = await fetchOrder(orderId);
      if (order) {
        await markOrderPaid(orderId, session.id ?? "");
        await triggerConfirmationEmail(order);
      } else {
        console.warn("Order not found for session:", session.id, orderId);
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
