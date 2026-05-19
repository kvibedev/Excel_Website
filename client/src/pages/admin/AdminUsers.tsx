import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Pencil, Trash2, Shield, X, Mail } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ADMIN_ROLES, ROLE_LABELS, ROLE_HIERARCHY, type AdminRole } from "@shared/schema";
import AdminLayout from "./AdminLayout";
import { useAdminAuth, canAccess } from "./adminAuth";

interface AdminUserData {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const ROLE_BADGE_COLORS: Record<string, string> = {
  super_admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  admin: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  editor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  viewer: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

function parseApiError(err: Error, fallback: string): { message: string; field?: string } {
  try {
    const jsonStart = (err.message || "").indexOf("{");
    if (jsonStart !== -1) {
      const parsed = JSON.parse(err.message.slice(jsonStart));
      if (parsed.error) return { message: parsed.error, field: parsed.field };
    }
  } catch {}
  return { message: fallback };
}

export default function AdminUsers() {
  const { authData, authLoading } = useAdminAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserData | null>(null);
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "viewer" });
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; email?: string; password?: string; role?: string }>({});

  const myRole = (authData?.role || "viewer") as AdminRole;
  const myLevel = ROLE_HIERARCHY[myRole];

  useEffect(() => {
    if (!authLoading && authData?.authenticated && !canAccess(myRole, "admin")) {
      setLocation("/admin");
    }
  }, [authLoading, authData, myRole, setLocation]);

  const assignableRoles = ADMIN_ROLES.filter((r) => ROLE_HIERARCHY[r] <= myLevel);

  const { data: users = [], isLoading } = useQuery<AdminUserData[]>({
    queryKey: ["/api/admin/users"],
    enabled: !!authData?.authenticated && canAccess(myRole, "admin"),
  });

  const createMutation = useMutation({
    mutationFn: async (data: { username: string; email: string; role: string }) => {
      const res = await apiRequest("POST", "/api/admin/users", data);
      return res.json();
    },
    onSuccess: (data: { username: string; email: string; inviteSent?: boolean }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      if (data?.inviteSent === false) {
        toast({
          title: "User created, but invite email failed",
          description: `Couldn't send the invite to ${data.email}. Use Resend invite to try again.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Invite sent",
          description: `${data.email} will receive an email to set their password.`,
        });
      }
      resetForm();
    },
    onError: (err: Error) => {
      const { message, field } = parseApiError(err, "Failed to create user");
      if (field) setFieldErrors((p) => ({ ...p, [field]: message }));
      toast({ title: message, variant: "destructive" });
    },
  });

  const resendInviteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("POST", `/api/admin/users/${id}/resend-invite`);
    },
    onSuccess: () => {
      toast({ title: "Invite resent", description: "A new setup link has been emailed." });
    },
    onError: (err: Error) => {
      toast({ title: parseApiError(err, "Failed to resend invite").message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Record<string, string> }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/me"] });
      toast({ title: "User updated successfully" });
      resetForm();
    },
    onError: (err: Error) => {
      const { message, field } = parseApiError(err, "Failed to update user");
      if (field) setFieldErrors((p) => ({ ...p, [field]: message }));
      toast({ title: message, variant: "destructive" });
    },
  });

  const deactivateMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User deactivated" });
    },
    onError: (err: Error) => {
      toast({ title: parseApiError(err, "Failed to deactivate user").message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setForm({ username: "", email: "", password: "", role: "viewer" });
    setFieldErrors({});
    setShowForm(false);
    setEditingUser(null);
  };

  const startEdit = (user: AdminUserData) => {
    setEditingUser(user);
    setForm({ username: user.username, email: user.email, password: "", role: user.role });
    setFieldErrors({});
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    const trimmedUsername = form.username.trim();
    const trimmedEmail = form.email.trim();
    const localErrors: typeof fieldErrors = {};
    if (!trimmedUsername) localErrors.username = "Username is required";
    if (!editingUser && !trimmedEmail) localErrors.email = "Email is required";
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) localErrors.email = "Enter a valid email address";
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      return;
    }
    if (editingUser) {
      const data: Record<string, string> = {};
      if (trimmedUsername !== editingUser.username) data.username = trimmedUsername;
      if (trimmedEmail !== editingUser.email) data.email = trimmedEmail;
      if (form.role !== editingUser.role) data.role = form.role;
      if (form.password) data.password = form.password;
      updateMutation.mutate({ id: editingUser.id, data });
    } else {
      createMutation.mutate({ username: trimmedUsername, email: trimmedEmail, role: form.role });
    }
  };

  const canEditUser = (user: AdminUserData) => {
    const targetLevel = ROLE_HIERARCHY[(user.role || "viewer") as AdminRole];
    return targetLevel <= myLevel;
  };

  const canDeactivateUser = (user: AdminUserData) => {
    if (user.id === authData?.id) return false;
    const targetLevel = ROLE_HIERARCHY[(user.role || "viewer") as AdminRole];
    return targetLevel <= myLevel && user.isActive;
  };

  return (
    <AdminLayout title="User Management" activeNav="users">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#063970]" />
            <h2 className="text-2xl font-bold text-[#063970]" data-testid="text-page-title">Admin Users</h2>
            <Badge variant="secondary" data-testid="badge-user-count">{users.length}</Badge>
          </div>
          {!showForm && (
            <Button onClick={() => { resetForm(); setShowForm(true); }} data-testid="button-add-user">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle data-testid="text-form-title">{editingUser ? "Edit User" : "Add New User"}</CardTitle>
                <Button variant="ghost" size="icon" onClick={resetForm} data-testid="button-cancel-form">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      value={form.username}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, username: e.target.value }));
                        if (fieldErrors.username) setFieldErrors((p) => ({ ...p, username: undefined }));
                      }}
                      placeholder="username"
                      aria-invalid={!!fieldErrors.username}
                      className={fieldErrors.username ? "border-red-500 focus-visible:ring-red-500" : ""}
                      data-testid="input-user-username"
                    />
                    {fieldErrors.username && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400" data-testid="error-username">
                        {fieldErrors.username}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, email: e.target.value }));
                        if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
                      }}
                      placeholder="user@example.com"
                      aria-invalid={!!fieldErrors.email}
                      className={fieldErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                      data-testid="input-user-email"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400" data-testid="error-email">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                  {editingUser ? (
                    <div>
                      <Label htmlFor="password">New Password (leave blank to keep)</Label>
                      <Input
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                        placeholder="Leave blank to keep current"
                        data-testid="input-user-password"
                      />
                    </div>
                  ) : (
                    <div className="md:col-span-2">
                      <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
                        The new user will receive an email with a secure link to set their own password (link expires in 7 days). No temporary password needed.
                      </div>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select value={form.role} onValueChange={(val) => setForm((p) => ({ ...p, role: val }))}>
                      <SelectTrigger data-testid="select-user-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {assignableRoles.map((r) => (
                          <SelectItem key={r} value={r} data-testid={`option-role-${r}`}>
                            {ROLE_LABELS[r]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit-user"
                  >
                    {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : editingUser ? "Update User" : "Send Invite"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-6">
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No users found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 pr-4 font-medium">Username</th>
                      <th className="pb-3 pr-4 font-medium">Email</th>
                      <th className="pb-3 pr-4 font-medium">Role</th>
                      <th className="pb-3 pr-4 font-medium">Created</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b last:border-0" data-testid={`row-user-${user.id}`}>
                        <td className="py-3 pr-4 font-medium" data-testid={`text-username-${user.id}`}>
                          {user.username}
                          {!user.isActive && <Badge className="ml-2 bg-gray-400 text-white" data-testid={`badge-inactive-${user.id}`}>Inactive</Badge>}
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground" data-testid={`text-email-${user.id}`}>{user.email}</td>
                        <td className="py-3 pr-4">
                          <Badge className={ROLE_BADGE_COLORS[user.role] || ""} data-testid={`badge-role-${user.id}`}>
                            {ROLE_LABELS[user.role as AdminRole] || user.role}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {canEditUser(user) && user.isActive && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  if (confirm(`Send a new password setup link to ${user.email}?`)) {
                                    resendInviteMutation.mutate(user.id);
                                  }
                                }}
                                disabled={resendInviteMutation.isPending}
                                title="Resend invite"
                                data-testid={`button-resend-invite-${user.id}`}
                              >
                                <Mail className="w-4 h-4" />
                              </Button>
                            )}
                            {canEditUser(user) && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => startEdit(user)}
                                data-testid={`button-edit-${user.id}`}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            )}
                            {canDeactivateUser(user) && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to deactivate ${user.username}? They will no longer be able to log in.`)) {
                                    deactivateMutation.mutate(user.id);
                                  }
                                }}
                                data-testid={`button-deactivate-${user.id}`}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Role Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={ROLE_BADGE_COLORS.super_admin}>Super Admin</Badge>
                </div>
                <p className="text-muted-foreground">Full system access. Manage all users and assign any role.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={ROLE_BADGE_COLORS.admin}>Admin</Badge>
                </div>
                <p className="text-muted-foreground">Full CRM access. Manage users up to Admin level.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={ROLE_BADGE_COLORS.editor}>Editor</Badge>
                </div>
                <p className="text-muted-foreground">Create and edit blog posts. Read-only access to contacts and vendors.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={ROLE_BADGE_COLORS.viewer}>Viewer</Badge>
                </div>
                <p className="text-muted-foreground">Read-only access to dashboard, contacts, vendors, and blog.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
