import { createClient } from "@supabase/supabase-js";

// Publishable values — safe to ship in the client bundle. Access is protected by RLS.
const SUPABASE_URL = "https://cubduvdmxfzfdfembkcw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1YmR1dmRteGZ6ZmRmZW1ia2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzk0MzYsImV4cCI6MjA5OTcxNTQzNn0.MjG8AptfwQI8zt9OYDmvjIAr1ge93AY1SYYODJ2j8zA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
  },
});

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
