import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { ROLE_HIERARCHY, type AdminRole } from "@shared/schema";

export interface AdminAuthData {
  authenticated: boolean;
  id?: number;
  username?: string;
  role?: AdminRole;
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

export function canAccess(role: AdminRole | undefined, minRole: AdminRole): boolean {
  return (ROLE_HIERARCHY[role || "viewer"] || 0) >= (ROLE_HIERARCHY[minRole] || 0);
}
