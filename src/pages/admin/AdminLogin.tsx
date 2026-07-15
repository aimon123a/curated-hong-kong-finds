import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const AdminLogin = () => {
  useDocumentMeta({
    title: "管理後台登入 | jaagSELECT",
    description: "jaagSELECT 內部訂單與客戶管理系統登入。",
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "登入失敗", description: error.message, variant: "destructive" });
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-lg p-8 shadow-sm space-y-5"
      >
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold tracking-tight">
            jaag<span className="text-primary">SELECT</span> 管理後台
          </h1>
          <p className="text-xs text-muted-foreground">Internal CRM</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">密碼</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "登入中..." : "登入"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          帳號需先在 Supabase Authentication 建立。
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
