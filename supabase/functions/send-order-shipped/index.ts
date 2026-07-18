// Standalone Edge Function — 已發貨通知電郵
// Paste this entire file into Supabase Dashboard → Edge Functions → send-order-shipped

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*, authorization, x-client-info, apikey, content-type, prefer, x-supabase-api-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const FROM = "jaagSELECT <no-reply@jaagselect.com>";
const LOGO_URL = "https://jaagselect.com/__l5e/assets-v1/1771e200-16e7-4add-b069-f0bc9d2a8a31/jaag-logo.png";
const IG_URL = "https://www.instagram.com/jaag_select/";

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  amount: number | string;
  shippingAddress: string;
  products: string;
  sfTracking?: string | null;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );

const productsToRows = (products: string) =>
  products
    .split(/[、,]/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (p) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px dashed #E5E5E5;font-size:14px;color:#333;">${escapeHtml(p)}</td>
        </tr>`,
    )
    .join("");

const orderDetailsBlock = (o: OrderEmailData) => `
  <div style="margin:24px 0;">
    <div style="border-top:1px dashed #CCCCCC;padding-top:16px;">
      <h2 style="font-size:15px;color:#333;margin:0 0 12px;letter-spacing:0.5px;font-weight:600;">商品內容信息</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:6px 0;font-size:14px;color:#666;width:110px;">訂單編號</td>
          <td style="padding:6px 0;font-size:14px;color:#333;font-family:monospace;">${escapeHtml(o.orderNumber)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:14px;color:#666;">訂單金額</td>
          <td style="padding:6px 0;font-size:14px;color:#333;font-weight:600;">HKD ${escapeHtml(String(o.amount))}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:14px;color:#666;vertical-align:top;">送貨地址</td>
          <td style="padding:6px 0;font-size:14px;color:#333;">${escapeHtml(o.shippingAddress)}</td>
        </tr>
        ${
          o.sfTracking
            ? `<tr>
          <td style="padding:6px 0;font-size:14px;color:#666;">順豐單號</td>
          <td style="padding:6px 0;font-size:14px;color:#333;font-family:monospace;font-weight:600;">${escapeHtml(o.sfTracking)}</td>
        </tr>`
            : ""
        }
      </table>
      <h3 style="font-size:14px;color:#333;margin:16px 0 8px;font-weight:600;">購買商品</h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px dashed #E5E5E5;">
        ${productsToRows(o.products)}
      </table>
    </div>
  </div>
`;

const footerInfoBox = `
  <div style="background-color:#FFF9E6;padding:20px;border-radius:6px;margin:24px 0;">
    <p style="margin:0 0 8px;font-size:14px;color:#333;font-weight:600;">jaagSELECT 客服中心</p>
    <p style="margin:0 0 6px;font-size:13px;color:#555;line-height:1.6;">
      若有任何疑問，歡迎隨時透過下方 Instagram 連結與我們聯繫。
    </p>
    <p style="margin:0;font-size:12px;color:#888;">※ 此郵件由系統自動發送，請勿直接回覆。</p>
  </div>
`;

const socialAndCopyright = `
  <div style="text-align:center;padding:20px 0;">
    <a href="${IG_URL}" style="color:#555;text-decoration:none;font-size:14px;font-weight:500;">
      Follow us on Instagram → @jaag_select
    </a>
  </div>
  <div style="background-color:#1F2937;padding:16px;text-align:center;">
    <p style="margin:0;color:#FFFFFF;font-size:12px;letter-spacing:0.5px;">
      Copyright © jaagSELECT All Rights Reserved.
    </p>
  </div>
`;

const shell = (bodyHtml: string) => `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#F5F5F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:32px 32px 16px;text-align:center;border-bottom:1px solid #EEEEEE;">
          <img src="${LOGO_URL}" alt="jaagSELECT" style="max-width:120px;height:auto;display:inline-block;" />
        </td></tr>
        <tr><td style="padding:32px;color:#333;font-size:15px;line-height:1.7;">
          ${bodyHtml}
        </td></tr>
        <tr><td>${socialAndCopyright}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const buildShippedEmail = (o: OrderEmailData) => {
  const body = `
    <p style="margin:0 0 12px;font-size:16px;color:#222;">您好 ${escapeHtml(o.customerName)}，</p>
    <p style="margin:0 0 12px;">商品將於本週抵港，預計下週為您寄出。</p>
    <p style="margin:0 0 12px;">您的順豐單號為：<strong style="font-family:monospace;">${escapeHtml(o.sfTracking ?? "")}</strong>。</p>
    <p style="margin:0 0 12px;">您可以透過 <a href="https://www.sf-express.com/" style="color:#B45309;text-decoration:underline;">順豐官網</a> 追蹤物流狀態。</p>
    ${orderDetailsBlock(o)}
    <div style="border-top:1px dashed #CCCCCC;padding-top:20px;margin-top:8px;">
      <h3 style="font-size:15px;color:#333;margin:0 0 12px;font-weight:600;">客戶問卷小調查</h3>
      <p style="margin:0 0 10px;font-size:14px;color:#444;line-height:1.7;">
        為了進一步了解客戶需求並提升服務質素，我們希望能向您作一個簡單的問卷小調查：
      </p>
      <ol style="margin:0 0 12px;padding-left:20px;font-size:14px;color:#444;line-height:1.8;">
        <li>請問您當初是怎麼找到我們的？</li>
        <li>若日後覺得產品效果不錯，請問您會考慮訂購更划算的補充裝嗎？</li>
      </ol>
      <p style="margin:0;font-size:13px;color:#666;">
        歡迎點擊下方 <a href="${IG_URL}" style="color:#B45309;text-decoration:underline;">Instagram</a> 連結私訊告訴我們！
      </p>
    </div>
    ${footerInfoBox}
  `;
  return {
    subject: `[jaagSELECT] 您的訂單即將寄出！內附物流追蹤編號`,
    html: shell(body),
  };
};

async function updateEmailStatus(
  refs: { orderId?: string; orderNumber?: string },
  status: "sent" | "failed",
  error: string | null,
) {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.warn("Supabase env not configured, skipping status update");
    return;
  }
  const patch: Record<string, unknown> = {
    shipped_email_status: status,
    shipped_email_error: status === "sent" ? null : error,
  };
  if (status === "sent") patch.shipped_email_sent_at = new Date().toISOString();

  const params = refs.orderId
    ? `id=eq.${encodeURIComponent(refs.orderId)}`
    : refs.orderNumber
    ? `order_number=eq.${encodeURIComponent(refs.orderNumber)}`
    : null;
  if (!params) return;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?${params}`, {
      method: "PATCH",
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(patch),
    });
    if (!res.ok) console.error("Failed to update email status:", res.status, await res.text());
  } catch (e) {
    console.error("Failed to update email status:", e);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const body = (await req.json().catch(() => ({}))) as OrderEmailData & { to: string; orderId?: string };

  try {
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");
    if (!body.to || !body.orderNumber || !body.customerName || !body.sfTracking) {
      throw new Error("Missing required fields (to, orderNumber, customerName, sfTracking)");
    }

    const { subject, html } = buildShippedEmail(body);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [body.to], subject, html }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend error:", res.status, text);
      await updateEmailStatus(body, "failed", `Resend ${res.status}: ${text.slice(0, 500)}`);
      return new Response(JSON.stringify({ error: "Resend failed", status: res.status, details: text }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    await updateEmailStatus(body, "sent", null);
    return new Response(JSON.stringify({ ok: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = (e as Error).message;
    console.error(e);
    await updateEmailStatus(body, "failed", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
