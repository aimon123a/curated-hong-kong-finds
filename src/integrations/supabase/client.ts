import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Surface clear guidance in the browser console instead of a cryptic runtime error.
  // eslint-disable-next-line no-console
  console.warn(
    "[Supabase] VITE_SUPABASE_URL 或 VITE_SUPABASE_ANON_KEY 未設定，請在專案 .env 中加入。"
  );
}

export const supabase = createClient(
  SUPABASE_URL ?? "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY ?? "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: localStorage,
    },
  }
);

export type OrderStatus = "等待入貨" | "已到港" | "已發貨";
export type ShippingMethod = "到宅配送" | "順豐智能櫃";

export interface OrderRow {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string;
  ig_handle: string | null;
  shipping_method: ShippingMethod;
  shipping_address: string;
  products: string;
  amount: number;
  sf_tracking: string | null;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export const ORDER_STATUSES: OrderStatus[] = ["等待入貨", "已到港", "已發貨"];
export const SHIPPING_METHODS: ShippingMethod[] = ["到宅配送", "順豐智能櫃"];

export const generateOrderNumber = (): string => {
  const d = new Date();
  const dateStr = d.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  return `JS-${dateStr}-${rand}`;
};
