import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";

interface AdminAuthData {
  authenticated: boolean;
  username?: string;
  role?: string;
}

function extractApiError(err: any, fallback: string): string {
  try {
    const errMsg = err?.message || "";
    const jsonStart = errMsg.indexOf("{");
    if (jsonStart !== -1) {
      const parsed = JSON.parse(errMsg.slice(jsonStart));
      if (parsed.error) return parsed.error;
    }
  } catch {}
  return fallback;
}

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const { data: authData, isLoading: authLoading } = useQuery<AdminAuthData>({
    queryKey: ["/api/admin/me"],
  });

  useEffect(() => {
    if (!authLoading && authData?.authenticated) {
      setLocation("/admin");
    }
  }, [authData, authLoading, setLocation]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/admin/login", { username, password });
      const data = await res.json();
      queryClient.setQueryData(["/api/admin/me"], { authenticated: true, username: data.username, role: data.role });
      toast({ title: "Login successful" });
      setLocation("/admin");
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: extractApiError(err, "Something went wrong. Please try again."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotLoading(true);
    try {
      await apiRequest("POST", "/api/admin/forgot-password", { email: forgotEmail.trim() });
      setForgotSent(true);
    } catch (err: any) {
      toast({
        title: "Couldn't send reset link",
        description: extractApiError(err, "Please try again in a moment."),
        variant: "destructive",
      });
    } finally {
      setForgotLoading(false);
    }
  };

  const closeForgotDialog = () => {
    setForgotOpen(false);
    setTimeout(() => {
      setForgotEmail("");
      setForgotSent(false);
    }, 200);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-[#063970]">Admin Login</CardTitle>
          <p className="text-muted-foreground">Excel Facility Services CRM</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="email"
                data-testid="input-username"
              />
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="pr-10"
                data-testid="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                data-testid="button-toggle-password"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-sm text-[#0A5EB9] hover:underline"
                data-testid="link-forgot-password"
              >
                Forgot password?
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={forgotOpen} onOpenChange={(open) => (open ? setForgotOpen(true) : closeForgotDialog())}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-forgot-password">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              {forgotSent
                ? "If an account exists for that email, we've sent a reset link. Check your inbox (and spam folder) — the link expires in 1 hour."
                : "Enter the email address linked to your admin account and we'll send you a reset link."}
            </DialogDescription>
          </DialogHeader>
          {!forgotSent ? (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <Label htmlFor="forgot-email">Email</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="you@company.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  autoComplete="email"
                  required
                  data-testid="input-forgot-email"
                />
              </div>
              <DialogFooter className="gap-2 sm:gap-2">
                <Button type="button" variant="outline" onClick={closeForgotDialog} data-testid="button-forgot-cancel">
                  Cancel
                </Button>
                <Button type="submit" disabled={forgotLoading || !forgotEmail.trim()} data-testid="button-forgot-submit">
                  {forgotLoading ? "Sending..." : "Send reset link"}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <DialogFooter>
              <Button type="button" onClick={closeForgotDialog} data-testid="button-forgot-done">
                Done
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
