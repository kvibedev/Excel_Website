import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Trash2, Plus, Mail, ToggleLeft, ToggleRight } from "lucide-react";
import { FORM_TYPE_LABELS, type FormEmailSetting } from "@shared/schema";

export default function AdminEmailSettings() {
  const { toast } = useToast();
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newFormType, setNewFormType] = useState("contact");
  const [newCcType, setNewCcType] = useState("to");

  const { data: settings = [], isLoading } = useQuery<FormEmailSetting[]>({
    queryKey: ["/api/admin/form-email-settings"],
  });

  const addMutation = useMutation({
    mutationFn: async (data: { formType: string; recipientEmail: string; recipientName: string | null; ccType: string }) => {
      return apiRequest("POST", "/api/admin/form-email-settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/form-email-settings"] });
      setNewEmail("");
      setNewName("");
      toast({ title: "Recipient added", description: "Email recipient has been added." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add recipient.", variant: "destructive" });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      return apiRequest("PATCH", `/api/admin/form-email-settings/${id}`, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/form-email-settings"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/form-email-settings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/form-email-settings"] });
      toast({ title: "Recipient removed", description: "Email recipient has been removed." });
    },
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    addMutation.mutate({
      formType: newFormType,
      recipientEmail: newEmail.trim(),
      recipientName: newName.trim() || null,
      ccType: newCcType,
    });
  };

  const contactSettings = settings.filter(s => s.formType === "contact");
  const vendorSettings = settings.filter(s => s.formType === "vendor");

  return (
    <AdminLayout title="Email Settings" activeNav="settings">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="text-settings-title">Form Email Notifications</h2>
          <p className="text-gray-600">Manage who receives email notifications when forms are submitted on the website.</p>
        </div>

        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Add Recipient</h3>
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <Select value={newFormType} onValueChange={setNewFormType}>
              <SelectTrigger className="w-full sm:w-44" data-testid="select-form-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contact">Contact Form</SelectItem>
                <SelectItem value="vendor">Vendor Registration</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="email"
              placeholder="Email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="flex-1 min-w-[200px]"
              data-testid="input-recipient-email"
            />

            <Input
              type="text"
              placeholder="Name (optional)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full sm:w-44"
              data-testid="input-recipient-name"
            />

            <Select value={newCcType} onValueChange={setNewCcType}>
              <SelectTrigger className="w-full sm:w-32" data-testid="select-cc-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to">To (Primary)</SelectItem>
                <SelectItem value="cc">CC</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" disabled={addMutation.isPending} data-testid="button-add-recipient">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </form>
        </Card>

        {isLoading ? (
          <p className="text-gray-500">Loading settings...</p>
        ) : (
          <>
            <RecipientSection
              title={FORM_TYPE_LABELS.contact}
              settings={contactSettings}
              onToggle={(id, active) => toggleMutation.mutate({ id, isActive: active })}
              onDelete={(id) => deleteMutation.mutate(id)}
            />

            <RecipientSection
              title={FORM_TYPE_LABELS.vendor}
              settings={vendorSettings}
              onToggle={(id, active) => toggleMutation.mutate({ id, isActive: active })}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
}

function RecipientSection({
  title,
  settings,
  onToggle,
  onDelete,
}: {
  title: string;
  settings: FormEmailSetting[];
  onToggle: (id: number, active: boolean) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-5 h-5 text-[#063970]" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Badge variant="secondary">{settings.length} recipient{settings.length !== 1 ? "s" : ""}</Badge>
      </div>

      {settings.length === 0 ? (
        <Card className="p-6">
          <p className="text-gray-500 text-center">No recipients configured. Emails will not be sent for this form.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {settings.map((setting) => (
            <Card key={setting.id} className={`p-4 flex items-center gap-4 flex-wrap ${!setting.isActive ? "opacity-50" : ""}`} data-testid={`card-recipient-${setting.id}`}>
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-900" data-testid={`text-email-${setting.id}`}>{setting.recipientEmail}</span>
                  <Badge variant={setting.ccType === "to" ? "default" : "outline"} className={setting.ccType === "to" ? "bg-[#063970]" : ""}>
                    {setting.ccType === "to" ? "Primary" : "CC"}
                  </Badge>
                  {!setting.isActive && <Badge variant="secondary">Disabled</Badge>}
                </div>
                {setting.recipientName && (
                  <p className="text-sm text-gray-500 mt-1">{setting.recipientName}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggle(setting.id, !setting.isActive)}
                  title={setting.isActive ? "Disable" : "Enable"}
                  data-testid={`button-toggle-${setting.id}`}
                >
                  {setting.isActive ? (
                    <ToggleRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-gray-400" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(setting.id)}
                  data-testid={`button-delete-${setting.id}`}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
