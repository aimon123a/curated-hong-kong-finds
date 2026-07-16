import { buildShippedEmail, OrderEmailData } from "../_shared/email-template.ts";
import { updateEmailStatus } from "../_shared/update-email-status.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM = "jaagSELECT <no-reply@jaagselect.com>";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const body = (await req.json().catch(() => ({}))) as OrderEmailData & { to: string; orderId?: string };
  const kind = "shipped" as const;

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
      await updateEmailStatus(kind, body, "failed", `Resend ${res.status}: ${text.slice(0, 500)}`);
      return new Response(JSON.stringify({ error: "Resend failed", status: res.status, details: text }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    await updateEmailStatus(kind, body, "sent", null);
    return new Response(JSON.stringify({ ok: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = (e as Error).message;
    console.error(e);
    await updateEmailStatus(kind, body, "failed", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
