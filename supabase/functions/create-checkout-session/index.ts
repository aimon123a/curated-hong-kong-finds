// supabase/functions/create-checkout-session/index.ts
// Stripe Checkout Session 產生器 — 手動貼上 Supabase Dashboard 部署（Verify JWT 關閉）
//
// Env 需求：
//   STRIPE_SECRET_KEY   （必填，Supabase Secrets）
//
// Request body（JSON）：
//   {
//     order_id: string        // Supabase orders.id (uuid)
//     order_number?: string   // 顯示用；若無會 fallback 到 order_id
//     amount: number          // HKD（以「元」為單位，會轉成分）
//     success_url?: string    // 選填；預設回 order 頁
//     cancel_url?: string     // 選填；預設回 order 頁
//     customer_email?: string // 選填；預填 Stripe Checkout
//   }
//
// Response：{ url: string, id: string }

// deno-lint-ignore-file no-explicit-any
// @ts-nocheck

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, prefer, x-supabase-api-version, accept, accept-profile, content-profile, range",
  "Access-Control-Max-Age": "86400",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
  if (!STRIPE_SECRET_KEY) {
    return json({ error: "Missing STRIPE_SECRET_KEY" }, 500);
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const orderId: string | undefined = payload?.order_id;
  const orderNumber: string = payload?.order_number ?? orderId ?? "";
  const amount = Number(payload?.amount);
  const customerEmail: string | undefined = payload?.customer_email;

  if (!orderId || !Number.isFinite(amount) || amount <= 0) {
    return json({ error: "order_id 與 amount 為必填，且 amount 必須 > 0" }, 400);
  }

  // Round to nearest HKD cent
  const unitAmount = Math.round(amount * 100);
  const productName = `jaagSELECT Order #${orderNumber || orderId}`;

  // Origin fallback for success/cancel URLs
  const origin =
    req.headers.get("origin") ||
    req.headers.get("referer")?.replace(/\/+$/, "") ||
    "https://jaagselect.com";

  const successUrl =
    payload?.success_url ||
    `${origin}/checkout?order=${encodeURIComponent(orderNumber)}&status=success&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl =
    payload?.cancel_url ||
    `${origin}/checkout?order=${encodeURIComponent(orderNumber)}&status=cancelled`;

  // Build Stripe form-encoded body (Stripe REST API 使用 application/x-www-form-urlencoded)
  const params = new URLSearchParams();
  params.append("mode", "payment");
  params.append("success_url", successUrl);
  params.append("cancel_url", cancelUrl);
  params.append("line_items[0][price_data][currency]", "hkd");
  params.append("line_items[0][price_data][product_data][name]", productName);
  params.append("line_items[0][price_data][unit_amount]", String(unitAmount));
  params.append("line_items[0][quantity]", "1");
  params.append("client_reference_id", orderId);
  params.append("metadata[order_id]", orderId);
  if (orderNumber) params.append("metadata[order_number]", orderNumber);
  if (customerEmail) params.append("customer_email", customerEmail);

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await stripeRes.json();

  if (!stripeRes.ok) {
    console.error("Stripe error:", data);
    return json(
      {
        error: data?.error?.message || "Stripe API error",
        code: data?.error?.code,
      },
      stripeRes.status,
    );
  }

  return json({ url: data.url, id: data.id });
});
