import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface AdminAuthData {
  authenticated: boolean;
  username?: string;
}

export function useAdminAuth() {
  const [, setLocation] = useLocation();

  const { data: authData, isLoading: authLoading } = useQuery<AdminAuthData>({
    queryKey: ["/api/admin/me"],
  });

  useEffect(() => {
    if (!authLoading && !authData?.authenticated) {
      setLocation("/admin/login");
    }
  }, [authData, authLoading, setLocation]);

  return { authData, authLoading };
}

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  activeNav?: "dashboard" | "contacts" | "vendors" | "blog";
}

export default function AdminLayout({ children, title, activeNav }: AdminLayoutProps) {
  const [, setLocation] = useLocation();
  const { authData, authLoading } = useAdminAuth();

  const handleLogout = async () => {
    await apiRequest("POST", "/api/admin/logout");
    queryClient.setQueryData(["/api/admin/me"], { authenticated: false });
    setLocation("/admin/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!authData?.authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#063970] text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-2">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {authData.username}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b px-6 py-3">
        <div className="container mx-auto flex gap-4 flex-wrap">
          <Link href="/admin">
            <Button
              variant="ghost"
              className={activeNav === "dashboard" ? "text-[#063970]" : ""}
              data-testid="link-dashboard"
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/contacts">
            <Button
              variant="ghost"
              className={activeNav === "contacts" ? "text-[#063970]" : ""}
              data-testid="link-contacts"
            >
              Contacts
            </Button>
          </Link>
          <Link href="/admin/vendors">
            <Button
              variant="ghost"
              className={activeNav === "vendors" ? "text-[#063970]" : ""}
              data-testid="link-vendors"
            >
              Vendors
            </Button>
          </Link>
          <Link href="/admin/blog">
            <Button
              variant="ghost"
              className={activeNav === "blog" ? "text-[#063970]" : ""}
              data-testid="link-blog"
            >
              Blog
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
