import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, FileText, LogOut, Download } from "lucide-react";
import { useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import type { Contact, VendorRegistration } from "@shared/schema";

interface DashboardStats {
  totalContacts: number;
  totalVendors: number;
  newContacts: number;
  newVendors: number;
  recentContacts: Contact[];
  recentVendors: VendorRegistration[];
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  const { data: authData, isLoading: authLoading } = useQuery({
    queryKey: ["/api/admin/me"],
  });

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/admin/stats"],
    enabled: !!(authData as any)?.authenticated,
  });

  useEffect(() => {
    if (!authLoading && !(authData as any)?.authenticated) {
      setLocation("/admin");
    }
  }, [authData, authLoading, setLocation]);

  const handleLogout = async () => {
    await apiRequest("POST", "/api/admin/logout");
    setLocation("/admin");
  };

  if (authLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    new: "bg-blue-500",
    contacted: "bg-yellow-500",
    qualified: "bg-green-500",
    closed: "bg-gray-500",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#063970] text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Excel CRM Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {(authData as any)?.username}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b px-6 py-3">
        <div className="container mx-auto flex gap-4">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="text-[#063970]" data-testid="link-dashboard">Dashboard</Button>
          </Link>
          <Link href="/admin/contacts">
            <Button variant="ghost" data-testid="link-contacts">Contacts</Button>
          </Link>
          <Link href="/admin/vendors">
            <Button variant="ghost" data-testid="link-vendors">Vendors</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-contacts">{stats?.totalContacts || 0}</div>
              <p className="text-xs text-muted-foreground">{stats?.newContacts || 0} new</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-vendors">{stats?.totalVendors || 0}</div>
              <p className="text-xs text-muted-foreground">{stats?.newVendors || 0} new</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Export Contacts</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <a href="/api/admin/contacts/export/csv" download>
                <Button size="sm" variant="outline" data-testid="button-export-contacts">
                  <FileText className="w-4 h-4 mr-2" />
                  CSV
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Export Vendors</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <a href="/api/admin/vendors/export/csv" download>
                <Button size="sm" variant="outline" data-testid="button-export-vendors">
                  <FileText className="w-4 h-4 mr-2" />
                  CSV
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Recent Contacts
                <Link href="/admin/contacts">
                  <Button variant="ghost" size="sm" data-testid="link-view-all-contacts">View All</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentContacts?.map((contact) => (
                  <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                    <Badge className={statusColors[contact.status]}>{contact.status}</Badge>
                  </div>
                ))}
                {(!stats?.recentContacts || stats.recentContacts.length === 0) && (
                  <p className="text-muted-foreground text-center py-4">No contacts yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Recent Vendors
                <Link href="/admin/vendors">
                  <Button variant="ghost" size="sm" data-testid="link-view-all-vendors">View All</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentVendors?.map((vendor) => (
                  <div key={vendor.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{vendor.companyName}</p>
                      <p className="text-sm text-muted-foreground">{vendor.contactName}</p>
                    </div>
                    <Badge className={statusColors[vendor.status]}>{vendor.status}</Badge>
                  </div>
                ))}
                {(!stats?.recentVendors || stats.recentVendors.length === 0) && (
                  <p className="text-muted-foreground text-center py-4">No vendors yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
