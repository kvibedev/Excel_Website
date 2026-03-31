import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, BookOpen } from "lucide-react";
import type { Contact, VendorRegistration } from "@shared/schema";
import AdminLayout, { useAdminAuth } from "./AdminLayout";

interface DashboardStats {
  totalContacts: number;
  totalVendors: number;
  newContacts: number;
  newVendors: number;
  publishedPosts: number;
  totalPosts: number;
  recentContacts: Contact[];
  recentVendors: VendorRegistration[];
}

export default function AdminDashboard() {
  const { authData, authLoading } = useAdminAuth();

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/admin/stats"],
    enabled: !!authData?.authenticated,
  });

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
    "in-progress": "bg-orange-500",
    "follow-up": "bg-purple-500",
    qualified: "bg-green-500",
    approved: "bg-[#97CC06]",
    rejected: "bg-red-500",
    closed: "bg-gray-500",
  };

  return (
    <AdminLayout title="Excel CRM Dashboard" activeNav="dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-contacts">{stats?.totalContacts || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.newContacts || 0} new</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-vendors">{stats?.totalVendors || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.newVendors || 0} new</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-posts">{stats?.totalPosts || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.publishedPosts || 0} published</p>
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
                  <Badge className={statusColors[contact.status] || "bg-gray-400"}>{contact.status}</Badge>
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
                  <Badge className={statusColors[vendor.status] || "bg-gray-400"}>{vendor.status}</Badge>
                </div>
              ))}
              {(!stats?.recentVendors || stats.recentVendors.length === 0) && (
                <p className="text-muted-foreground text-center py-4">No vendors yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
