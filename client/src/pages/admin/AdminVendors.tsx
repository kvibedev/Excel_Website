import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, LogOut, Trash2, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { VendorRegistration, VendorNote } from "@shared/schema";

export default function AdminVendors() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedVendor, setSelectedVendor] = useState<VendorRegistration | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState("");

  const { data: authData, isLoading: authLoading } = useQuery({
    queryKey: ["/api/admin/me"],
  });

  const { data: vendors, isLoading: vendorsLoading } = useQuery<VendorRegistration[]>({
    queryKey: ["/api/admin/vendors"],
    enabled: !!(authData as any)?.authenticated,
  });

  const { data: notes } = useQuery<VendorNote[]>({
    queryKey: ["/api/admin/vendors", selectedVendor?.id, "notes"],
    enabled: !!selectedVendor,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest("PATCH", `/api/admin/vendors/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/vendors"] });
      toast({ title: "Status updated" });
    },
  });

  const deleteVendorMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/vendors/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/vendors"] });
      setSelectedVendor(null);
      toast({ title: "Vendor deleted" });
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: async ({ vendorId, note, authorName }: { vendorId: number; note: string; authorName: string }) => {
      return apiRequest("POST", `/api/admin/vendors/${vendorId}/notes`, { note, authorName });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/vendors", selectedVendor?.id, "notes"] });
      setNewNote("");
      toast({ title: "Note added" });
    },
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

  if (authLoading || vendorsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const filteredVendors = vendors?.filter((vendor) => {
    const matchesStatus = filterStatus === "all" || vendor.status === filterStatus;
    const matchesSearch = 
      vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusColors: Record<string, string> = {
    new: "bg-blue-500",
    contacted: "bg-yellow-500",
    qualified: "bg-green-500",
    approved: "bg-[#97CC06]",
    rejected: "bg-red-500",
    closed: "bg-gray-500",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#063970] text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Excel CRM - Vendors</h1>
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
            <Button variant="ghost" data-testid="link-dashboard">Dashboard</Button>
          </Link>
          <Link href="/admin/contacts">
            <Button variant="ghost" data-testid="link-contacts">Contacts</Button>
          </Link>
          <Link href="/admin/vendors">
            <Button variant="ghost" className="text-[#063970]" data-testid="link-vendors">Vendors</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Vendor Registrations ({filteredVendors?.length || 0})
            </CardTitle>
            <div className="flex gap-4 mt-4">
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
                data-testid="input-search-vendors"
              />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40" data-testid="select-filter-status">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredVendors?.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover-elevate cursor-pointer"
                  onClick={() => setSelectedVendor(vendor)}
                  data-testid={`vendor-row-${vendor.id}`}
                >
                  <div className="flex-1">
                    <p className="font-medium">{vendor.companyName}</p>
                    <p className="text-sm text-muted-foreground">{vendor.contactName} - {vendor.email}</p>
                    {vendor.servicesOffered && (
                      <p className="text-sm text-muted-foreground">Services: {vendor.servicesOffered}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                      {new Date(vendor.createdAt).toLocaleDateString()}
                    </p>
                    <Badge className={statusColors[vendor.status]}>{vendor.status}</Badge>
                  </div>
                </div>
              ))}
              {(!filteredVendors || filteredVendors.length === 0) && (
                <p className="text-muted-foreground text-center py-8">No vendors found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Vendor Details
              <Button
                variant="destructive"
                size="sm"
                onClick={() => selectedVendor && deleteVendorMutation.mutate(selectedVendor.id)}
                data-testid="button-delete-vendor"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedVendor && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                  <p className="font-medium">{selectedVendor.companyName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Contact Name</label>
                  <p>{selectedVendor.contactName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p>{selectedVendor.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p>{selectedVendor.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p>{selectedVendor.address || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">City, State, Zip</label>
                  <p>{[selectedVendor.city, selectedVendor.state, selectedVendor.zipCode].filter(Boolean).join(", ") || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Years in Business</label>
                  <p>{selectedVendor.yearsInBusiness || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Insurance Info</label>
                  <p>{selectedVendor.insuranceInfo || "N/A"}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Services Offered</label>
                <p className="bg-gray-50 p-3 rounded-lg mt-1">{selectedVendor.servicesOffered || "N/A"}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Certifications</label>
                <p className="bg-gray-50 p-3 rounded-lg mt-1">{selectedVendor.certifications || "N/A"}</p>
              </div>

              {selectedVendor.references && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">References</label>
                  <p className="bg-gray-50 p-3 rounded-lg mt-1">{selectedVendor.references}</p>
                </div>
              )}

              {selectedVendor.additionalInfo && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Additional Info</label>
                  <p className="bg-gray-50 p-3 rounded-lg mt-1">{selectedVendor.additionalInfo}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Select
                  value={selectedVendor.status}
                  onValueChange={(status) => updateStatusMutation.mutate({ id: selectedVendor.id, status })}
                >
                  <SelectTrigger className="w-40 mt-1" data-testid="select-update-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4 h-4" />
                  Notes
                </h4>
                <div className="space-y-3 mb-4">
                  {notes?.map((note) => (
                    <div key={note.id} className="bg-gray-50 p-3 rounded-lg">
                      <p>{note.note}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {note.authorName} - {new Date(note.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  {(!notes || notes.length === 0) && (
                    <p className="text-muted-foreground text-sm">No notes yet</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1"
                    data-testid="input-add-note"
                  />
                  <Button
                    onClick={() => addNoteMutation.mutate({
                      vendorId: selectedVendor.id,
                      note: newNote,
                      authorName: (authData as any)?.username || "Admin"
                    })}
                    disabled={!newNote.trim()}
                    data-testid="button-add-note"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
