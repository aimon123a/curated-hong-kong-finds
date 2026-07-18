// supabase/functions/create-checkout-session/index.ts
// Stripe Checkout Session 產生器 — 手動貼上 Supabase Dashboard 部署（Verify JWT 關閉）
//
// 安全性：本 Function 不再信任前端傳入的金額。
// 只接受 order_id，並以 Service Role Key 直接向 orders 表查詢真實金額。
//
// Env 需求（Supabase Secrets）：
//   STRIPE_SECRET_KEY            必填
//   SUPABASE_URL                 Supabase 自動注入
//   SUPABASE_SERVICE_ROLE_KEY    Supabase 自動注入
//
// Request body（JSON）：
//   {
//     order_id: string        // Supabase orders.id (uuid) — 必填
//     success_url?: string    // 選填；預設回 /checkout
//     cancel_url?: string     // 選填；預設回 /checkout
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
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!STRIPE_SECRET_KEY) {
    return json({ error: "Missing STRIPE_SECRET_KEY" }, 500);
  }
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "Missing Supabase service credentials" }, 500);
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const orderId: string | undefined = payload?.order_id;
  if (!orderId || typeof orderId !== "string") {
    return json({ error: "order_id 為必填" }, 400);
  }

  // Server-side lookup: fetch canonical order from DB via Service Role.
  // 前端傳來的 amount 一律忽略，避免被竄改。
  const orderRes = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}&select=id,order_number,amount,email`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Accept: "application/json",
      },
    },
  );

  if (!orderRes.ok) {
    const text = await orderRes.text();
    console.error("Order lookup failed:", orderRes.status, text);
    return json({ error: "Failed to load order" }, 500);
  }

  const rows = (await orderRes.json()) as Array<{
    id: string;
    order_number: string;
    amount: number | string;
    email: string | null;
  }>;

  if (!rows.length) {
    return json({ error: "訂單不存在" }, 404);
  }

  const order = rows[0];
  const amount = Number(order.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return json({ error: "訂單金額無效" }, 400);
  }

  const orderNumber = order.order_number || order.id;
  const customerEmail = order.email || undefined;

  // Round to nearest HKD cent
  const unitAmount = Math.round(amount * 100);
  const productName = `jaagSELECT Order #${orderNumber}`;

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

  // Stripe REST API 使用 application/x-www-form-urlencoded
  const params = new URLSearchParams();
  params.append("mode", "payment");
  params.append("success_url", successUrl);
  params.append("cancel_url", cancelUrl);
  params.append("line_items[0][price_data][currency]", "hkd");
  params.append("line_items[0][price_data][product_data][name]", productName);
  params.append("line_items[0][price_data][unit_amount]", String(unitAmount));
  params.append("line_items[0][quantity]", "1");
  params.append("client_reference_id", order.id);
  params.append("metadata[order_id]", order.id);
  params.append("metadata[order_number]", orderNumber);
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
