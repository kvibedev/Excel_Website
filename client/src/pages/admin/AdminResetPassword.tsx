import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Eye, EyeOff, CheckCircle2, AlertTriangle } from "lucide-react";

interface VerifyResponse {
  valid: boolean;
  reason?: "missing" | "invalid" | "expired" | "inactive" | "error";
  email?: string;
}

export default function AdminResetPassword() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const token = useMemo(() => new URLSearchParams(window.location.search).get("token") || "", []);
  const isSetup = useMemo(() => new URLSearchParams(window.location.search).get("setup") === "1", []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: verify, isLoading: verifyLoading } = useQuery<VerifyResponse>({
    queryKey: ["/api/admin/reset-password/verify", { token }],
    queryFn: async () => {
      const res = await fetch(`/api/admin/reset-password/verify?token=${encodeURIComponent(token)}`);
      return res.json();
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setLocation("/admin/login"), 2500);
      return () => clearTimeout(t);
    }
  }, [success, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", description: "Re-enter the same password in both fields.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/admin/reset-password", { token, password });
      setSuccess(true);
      toast({ title: "Password reset", description: "You can now sign in with your new password." });
    } catch (err: any) {
      let message = "Please try again.";
      try {
        const m = err?.message || "";
        const idx = m.indexOf("{");
        if (idx !== -1) {
          const parsed = JSON.parse(m.slice(idx));
          if (parsed.error) message = parsed.error;
        }
      } catch {}
      toast({ title: "Couldn't reset password", description: message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const reasonMessage = (reason?: VerifyResponse["reason"]) => {
    switch (reason) {
      case "expired":
        return "This reset link has expired. Please request a new one from the login page.";
      case "inactive":
        return "This account is no longer active. Please contact your administrator.";
      case "missing":
      case "invalid":
        return "This reset link is invalid. Please request a new one from the login page.";
      default:
        return "We couldn't verify this reset link. Please request a new one.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-[#063970]">{isSetup ? "Welcome — Set Your Password" : "Reset Password"}</CardTitle>
          <p className="text-muted-foreground">{isSetup ? "Choose a password to finish setting up your admin account." : "Choose a new password for your admin account"}</p>
        </CardHeader>
        <CardContent>
          {!token || verifyLoading ? (
            <div className="text-center text-muted-foreground py-6" data-testid="text-verify-loading">
              {!token ? "No reset token provided." : "Verifying reset link..."}
            </div>
          ) : !verify?.valid ? (
            <div className="space-y-4" data-testid="state-invalid-token">
              <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-900">{reasonMessage(verify?.reason)}</p>
              </div>
              <Link href="/admin/login">
                <Button className="w-full" data-testid="button-back-to-login">Back to login</Button>
              </Link>
            </div>
          ) : success ? (
            <div className="space-y-4 text-center" data-testid="state-reset-success">
              <div className="flex justify-center">
                <CheckCircle2 className="w-12 h-12 text-[#97CC06]" />
              </div>
              <p className="text-sm text-gray-700">Your password has been updated. Redirecting you to login...</p>
              <Link href="/admin/login">
                <Button variant="outline" className="w-full" data-testid="button-go-to-login">Go to login now</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {verify.email && (
                <p className="text-sm text-muted-foreground" data-testid="text-reset-email">
                  {isSetup ? "Setting password for " : "Resetting password for "}
                  <strong className="text-gray-900">{verify.email}</strong>
                </p>
              )}
              <div>
                <Label htmlFor="new-password">{isSetup ? "Choose a password" : "New password"}</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    className="pr-10"
                    required
                    data-testid="input-new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                    data-testid="button-toggle-new-password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm new password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    className="pr-10"
                    required
                    data-testid="input-confirm-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                    data-testid="button-toggle-confirm-password"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-reset-password">
                {isLoading ? "Saving..." : isSetup ? "Set password and continue" : "Update password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
