import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function EstimateForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const services = [
    "COVID-19 Cleaning",
    "Janitorial",
    "Day Porters",
    "Concrete Polishing",
    "Carpet Extraction",
    "Floor Care",
    "Disinfection",
    "Power Washing",
    "Window Washing",
    "Air Duct & HVAC",
    "LevelUp Clean®",
    "Commercial Cleaning",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // todo: remove mock functionality
    console.log("Form submitted:", formData);
    toast({
      title: "Estimate Request Received",
      description: "We'll contact you within 24 hours to discuss your needs.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name *
          </label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            data-testid="input-name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            data-testid="input-email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone
          </label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            data-testid="input-phone"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            data-testid="input-company"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-2">
          Service Needed *
        </label>
        <Select
          required
          value={formData.service}
          onValueChange={(value) => setFormData({ ...formData, service: value })}
        >
          <SelectTrigger data-testid="select-service">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <Textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your facility and cleaning needs..."
          data-testid="input-message"
        />
      </div>

      <Button type="submit" size="lg" className="w-full" data-testid="button-submit">
        Request Estimate
      </Button>
    </form>
  );
}
