// Writes email delivery status back to public.orders using the service role.
// Uses PostgREST directly to avoid extra dependencies.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

export type EmailKind = "confirmation" | "shipped";
export type EmailStatus = "sent" | "failed";

interface StatusRefs {
  orderId?: string;
  orderNumber?: string;
}

export async function updateEmailStatus(
  kind: EmailKind,
  refs: StatusRefs,
  status: EmailStatus,
  error: string | null,
) {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.warn("Supabase env not configured, skipping status update");
    return;
  }
  const prefix = kind === "confirmation" ? "confirmation_email" : "shipped_email";
  const patch: Record<string, unknown> = {
    [`${prefix}_status`]: status,
    [`${prefix}_error`]: status === "sent" ? null : error,
  };
  if (status === "sent") patch[`${prefix}_sent_at`] = new Date().toISOString();

  const params = refs.orderId
    ? `id=eq.${encodeURIComponent(refs.orderId)}`
    : refs.orderNumber
    ? `order_number=eq.${encodeURIComponent(refs.orderNumber)}`
    : null;
  if (!params) {
    console.warn("No orderId/orderNumber, skipping status update");
    return;
  }

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
    if (!res.ok) {
      console.error("Failed to update email status:", res.status, await res.text());
    }
  } catch (e) {
    console.error("Failed to update email status:", e);
  }
}
