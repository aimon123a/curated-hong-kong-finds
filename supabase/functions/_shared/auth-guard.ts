// Shared authorization helper for edge functions.
// Accepts either:
//   1) `X-Internal-Secret: <INTERNAL_EMAIL_SECRET>` — for server-to-server calls (e.g. marks-paid webhook)
//   2) A Supabase user JWT belonging to a user with role='admin' in public.user_roles
export async function authorizeAdminOrInternal(req: Request): Promise<
  { ok: true; via: "internal" | "admin"; userId?: string } | { ok: false; status: number; error: string }
> {
  const INTERNAL = Deno.env.get("INTERNAL_EMAIL_SECRET");
  const provided = req.headers.get("x-internal-secret");
  if (INTERNAL && provided && provided === INTERNAL) {
    return { ok: true, via: "internal" };
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const ANON = Deno.env.get("SUPABASE_ANON_KEY");
  if (!SUPABASE_URL || !SERVICE_ROLE) {
    return { ok: false, status: 500, error: "Server misconfigured (SUPABASE_URL / SERVICE_ROLE)" };
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.toLowerCase().startsWith("bearer ") ? authHeader.slice(7).trim() : "";
  if (!token) return { ok: false, status: 401, error: "Missing bearer token" };

  // Validate the token via Supabase Auth
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${token}`, apikey: ANON ?? SERVICE_ROLE },
  });
  if (!userRes.ok) return { ok: false, status: 401, error: "Invalid token" };
  const user = await userRes.json();
  if (!user?.id) return { ok: false, status: 401, error: "Invalid user" };

  // Check user_roles for admin (use service role, bypassing RLS)
  const roleRes = await fetch(
    `${SUPABASE_URL}/rest/v1/user_roles?user_id=eq.${encodeURIComponent(user.id)}&role=eq.admin&select=user_id`,
    {
      headers: {
        apikey: SERVICE_ROLE,
        Authorization: `Bearer ${SERVICE_ROLE}`,
      },
    },
  );
  if (!roleRes.ok) return { ok: false, status: 500, error: "Role lookup failed" };
  const rows = (await roleRes.json()) as unknown[];
  if (!Array.isArray(rows) || rows.length === 0) {
    return { ok: false, status: 403, error: "Admin role required" };
  }
  return { ok: true, via: "admin", userId: user.id };
}
