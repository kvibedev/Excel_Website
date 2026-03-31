import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, Trash2, MessageSquare, Download } from "lucide-react";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Contact, ContactNote } from "@shared/schema";
import AdminLayout, { useAdminAuth } from "./AdminLayout";

const statusColors: Record<string, string> = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  "in-progress": "bg-orange-500",
  "follow-up": "bg-purple-500",
  closed: "bg-gray-500",
};

export default function AdminContacts() {
  const { toast } = useToast();
  const { authData, authLoading } = useAdminAuth();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState("");

  const { data: contacts, isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts"],
    enabled: !!authData?.authenticated,
  });

  const { data: notes } = useQuery<ContactNote[]>({
    queryKey: ["/api/admin/contacts", selectedContact?.id, "notes"],
    enabled: !!selectedContact,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest("PATCH", `/api/admin/contacts/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "Status updated" });
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setSelectedContact(null);
      toast({ title: "Contact deleted" });
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: async ({ contactId, note, authorName }: { contactId: number; note: string; authorName: string }) => {
      return apiRequest("POST", `/api/admin/contacts/${contactId}/notes`, { note, authorName });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts", selectedContact?.id, "notes"] });
      setNewNote("");
      toast({ title: "Note added" });
    },
  });

  if (authLoading || contactsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const filteredContacts = contacts?.filter((contact) => {
    const matchesStatus = filterStatus === "all" || contact.status === filterStatus;
    const matchesSearch =
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.company?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <AdminLayout title="Excel CRM - Contacts" activeNav="contacts">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Contact Submissions ({filteredContacts?.length || 0})
            </CardTitle>
            <a href="/api/admin/contacts/export/csv" download>
              <Button size="sm" variant="outline" data-testid="button-export-contacts">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </a>
          </div>
          <div className="flex gap-4 mt-4 flex-wrap">
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
              data-testid="input-search-contacts"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-44" data-testid="select-filter-status">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="follow-up">Follow Up</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContacts?.map((contact) => (
              <div
                key={contact.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover-elevate cursor-pointer"
                onClick={() => setSelectedContact(contact)}
                data-testid={`contact-row-${contact.id}`}
              >
                <div className="flex-1">
                  <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                  <p className="text-sm text-muted-foreground">{contact.email}</p>
                  {contact.company && <p className="text-sm text-muted-foreground">{contact.company}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                  <Badge className={statusColors[contact.status] || "bg-gray-400"}>{contact.status}</Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete this contact?")) {
                        deleteContactMutation.mutate(contact.id);
                      }
                    }}
                    data-testid={`button-delete-contact-row-${contact.id}`}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
            {(!filteredContacts || filteredContacts.length === 0) && (
              <p className="text-muted-foreground text-center py-8">No contacts found</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Contact Details
              <Button
                variant="destructive"
                size="sm"
                onClick={() => selectedContact && deleteContactMutation.mutate(selectedContact.id)}
                data-testid="button-delete-contact"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </DialogTitle>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{selectedContact.firstName} {selectedContact.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p>{selectedContact.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p>{selectedContact.phone || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p>{selectedContact.company || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Inquiry Type</label>
                  <p>{selectedContact.inquiryType || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Service Interest</label>
                  <p>{selectedContact.serviceInterest || "N/A"}</p>
                </div>
              </div>

              {selectedContact.message && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <p className="bg-gray-50 p-3 rounded-lg mt-1">{selectedContact.message}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Select
                  value={selectedContact.status}
                  onValueChange={(status) => {
                    updateStatusMutation.mutate({ id: selectedContact.id, status });
                    setSelectedContact({ ...selectedContact, status });
                  }}
                >
                  <SelectTrigger className="w-44 mt-1" data-testid="select-update-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
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
                      contactId: selectedContact.id,
                      note: newNote,
                      authorName: authData?.username || "Admin"
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
    </AdminLayout>
  );
}
