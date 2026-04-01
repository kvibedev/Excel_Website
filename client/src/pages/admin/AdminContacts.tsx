import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Users, Trash2, MessageSquare, Download, ChevronLeft, ChevronRight, UserCheck, Calendar } from "lucide-react";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Contact, ContactNote } from "@shared/schema";
import AdminLayout, { useAdminAuth } from "./AdminLayout";

const ITEMS_PER_PAGE = 10;

const statusColors: Record<string, string> = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  "in-progress": "bg-orange-500",
  "follow-up": "bg-purple-500",
  closed: "bg-gray-500",
};

interface AdminUser {
  id: number;
  username: string;
  email: string;
}

export default function AdminContacts() {
  const { toast } = useToast();
  const { authData, authLoading } = useAdminAuth();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [confirmDeleteNoteId, setConfirmDeleteNoteId] = useState<number | null>(null);
  const [assignedTo, setAssignedTo] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const { data: contacts, isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts"],
    enabled: !!authData?.authenticated,
  });

  const { data: notes } = useQuery<ContactNote[]>({
    queryKey: ["/api/admin/contacts", selectedContact?.id, "notes"],
    enabled: !!selectedContact,
  });

  const { data: adminUsers } = useQuery<AdminUser[]>({
    queryKey: ["/api/admin/users"],
    enabled: !!authData?.authenticated,
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

  const updateAssignmentMutation = useMutation({
    mutationFn: async ({ id, assignedTo, followUpDate }: { id: number; assignedTo: string; followUpDate: string }) => {
      return apiRequest("PATCH", `/api/admin/contacts/${id}/assignment`, {
        assignedTo: assignedTo || null,
        followUpDate: followUpDate || null,
      });
    },
    onSuccess: async (res) => {
      const updated = await res.json();
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setSelectedContact(updated);
      toast({ title: "Assignment saved" });
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

  const deleteNoteMutation = useMutation({
    mutationFn: async ({ contactId, noteId }: { contactId: number; noteId: number }) => {
      return apiRequest("DELETE", `/api/admin/contacts/${contactId}/notes/${noteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts", selectedContact?.id, "notes"] });
      toast({ title: "Note deleted" });
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
  }) ?? [];

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedContacts = filteredContacts.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const openDialog = (contact: Contact) => {
    setSelectedContact(contact);
    setAssignedTo(contact.assignedTo ?? "");
    setFollowUpDate(
      contact.followUpDate ? new Date(contact.followUpDate).toISOString().split("T")[0] : ""
    );
  };

  return (
    <AdminLayout title="Excel CRM - Contacts" activeNav="contacts">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Contact Submissions ({filteredContacts.length})
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
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="max-w-sm"
              data-testid="input-search-contacts"
            />
            <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setCurrentPage(1); }}>
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
            {paginatedContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover-elevate cursor-pointer"
                onClick={() => openDialog(contact)}
                data-testid={`contact-row-${contact.id}`}
              >
                <div className="flex-1">
                  <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                  <p className="text-sm text-muted-foreground">{contact.email}</p>
                  {contact.company && <p className="text-sm text-muted-foreground">{contact.company}</p>}
                  {contact.assignedTo && (
                    <p className="text-xs text-[#063970] font-medium mt-1">Assigned: {contact.assignedTo}</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {contact.followUpDate && (
                    <span className="text-xs text-purple-600 font-medium hidden sm:block">
                      Follow-up: {new Date(contact.followUpDate).toLocaleDateString()}
                    </span>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                  <Badge className={statusColors[contact.status] || "bg-gray-400"}>{contact.status}</Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDeleteId(contact.id);
                    }}
                    data-testid={`button-delete-contact-row-${contact.id}`}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
            {filteredContacts.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No contacts found</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Page {safePage} of {totalPages} ({filteredContacts.length} total)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Detail Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Contact Details
              <Button
                variant="destructive"
                size="sm"
                onClick={() => selectedContact && setConfirmDeleteId(selectedContact.id)}
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

              {/* Assignment & Follow-up */}
              <div className="border rounded-lg p-4 space-y-4 bg-blue-50/40">
                <h4 className="font-medium flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#063970]" />
                  Assignment &amp; Follow-up
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground block mb-1">Assign To</label>
                    <Select value={assignedTo} onValueChange={setAssignedTo}>
                      <SelectTrigger data-testid="select-assigned-to">
                        <SelectValue placeholder="Select admin…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">— Unassigned —</SelectItem>
                        {adminUsers?.map((u) => (
                          <SelectItem key={u.id} value={u.username}>{u.username}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground block mb-1">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Follow-up Date
                    </label>
                    <Input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      data-testid="input-follow-up-date"
                    />
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() =>
                    updateAssignmentMutation.mutate({
                      id: selectedContact.id,
                      assignedTo,
                      followUpDate,
                    })
                  }
                  disabled={updateAssignmentMutation.isPending}
                  data-testid="button-save-assignment"
                >
                  Save Assignment
                </Button>
              </div>

              {/* Notes */}
              <div className="border-t pt-4">
                <h4 className="font-medium flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4 h-4" />
                  Notes
                </h4>
                <div className="space-y-3 mb-4">
                  {notes?.map((note) => (
                    <div key={note.id} className="bg-gray-50 p-3 rounded-lg flex justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p>{note.note}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {note.authorName} — {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="flex-shrink-0 h-7 w-7"
                        onClick={() => setConfirmDeleteNoteId(note.id)}
                        data-testid={`button-delete-note-${note.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-destructive" />
                      </Button>
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
                    onClick={() =>
                      addNoteMutation.mutate({
                        contactId: selectedContact.id,
                        note: newNote,
                        authorName: authData?.username || "Admin",
                      })
                    }
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

      {/* Delete Contact Confirmation */}
      <AlertDialog open={confirmDeleteId !== null} onOpenChange={() => setConfirmDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the contact and all associated notes. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (confirmDeleteId !== null) {
                  deleteContactMutation.mutate(confirmDeleteId);
                  setConfirmDeleteId(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Note Confirmation */}
      <AlertDialog open={confirmDeleteNoteId !== null} onOpenChange={() => setConfirmDeleteNoteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this note? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (confirmDeleteNoteId !== null && selectedContact) {
                  deleteNoteMutation.mutate({ contactId: selectedContact.id, noteId: confirmDeleteNoteId });
                  setConfirmDeleteNoteId(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
