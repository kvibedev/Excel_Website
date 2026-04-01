import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";

interface AdminAuthData {
  authenticated: boolean;
  username?: string;
  role?: string;
}

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      let message = "Something went wrong. Please try again.";
      try {
        const errMsg = err?.message || "";
        const jsonStart = errMsg.indexOf("{");
        if (jsonStart !== -1) {
          const parsed = JSON.parse(errMsg.slice(jsonStart));
          if (parsed.error) message = parsed.error;
        }
      } catch {}
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                data-testid="input-username"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
