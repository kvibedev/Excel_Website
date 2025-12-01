import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function EstimateForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    inquiryType: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    areaOfInquiry: "",
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
  ];

  const areasOfInquiry = [
    "Accounting",
    "Billing",
    "Hr",
    "Recruiting",
    "Procurement",
    "Others"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Message Received",
      description: "We will gladly reach out to assist you with any further questions.",
    });
    setFormData({
      inquiryType: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      areaOfInquiry: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
          Choose type *
        </label>
        <Select
          required
          value={formData.inquiryType}
          onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
        >
          <SelectTrigger data-testid="select-inquiry-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Sales Inquires</SelectItem>
            <SelectItem value="general">General Inquires</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
          Choose service
        </label>
        <Select
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
        <label htmlFor="areaOfInquiry" className="block text-sm font-medium mb-2">
          Area of Inquiry
        </label>
        <Select
          value={formData.areaOfInquiry}
          onValueChange={(value) => setFormData({ ...formData, areaOfInquiry: value })}
        >
          <SelectTrigger data-testid="select-area-of-inquiry">
            <SelectValue placeholder="Select area" />
          </SelectTrigger>
          <SelectContent>
            {areasOfInquiry.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
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
        SUBMIT
      </Button>
    </form>
  );
}
