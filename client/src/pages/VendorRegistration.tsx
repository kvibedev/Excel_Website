import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Briefcase, Plus, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import heroImage from "@assets/Edit_this_professional_vendor_registration_hero_im-17750050224_1775007935947.png";

interface ReferenceContact {
  id: string;
  name: string;
  companyName: string;
  phoneNumber: string;
}

interface Reference {
  id: string;
  contacts: ReferenceContact[];
}

export default function VendorRegistration() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    businessPhone: "",
    companyEmail: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    referred: "no",
    referredBy: "",
    yearsInBusiness: "",
    primaryService: "",
    otherServices: "",
    serviceEquipment: "",
    serviceMileRadius: "",
    usesSubcontractors: "no",
    provides24HourService: "no",
    emergencyResponseTime: "",
    quoteWithin24Hours: "no",
    relatedToExcelEmployee: "",
    willingBackgroundCheck: "yes",
  });

  const [references, setReferences] = useState<Reference[]>([
    { id: "ref1", contacts: [{ id: "ref1-contact1", name: "", companyName: "", phoneNumber: "" }] },
    { id: "ref2", contacts: [{ id: "ref2-contact1", name: "", companyName: "", phoneNumber: "" }] },
    { id: "ref3", contacts: [{ id: "ref3-contact1", name: "", companyName: "", phoneNumber: "" }] },
  ]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const referencesText = references.map((ref, idx) => 
        ref.contacts.map(c => `Reference ${idx + 1}: ${c.name} at ${c.companyName} - ${c.phoneNumber}`).join("; ")
      ).filter(Boolean).join("\n");
      
      const additionalInfo = [
        formData.usesSubcontractors === "yes" ? "Uses subcontractors" : null,
        formData.provides24HourService === "yes" ? "Provides 24-hour service" : null,
        formData.emergencyResponseTime ? `Emergency response: ${formData.emergencyResponseTime}` : null,
        formData.quoteWithin24Hours === "yes" ? "Can quote within 24 hours" : null,
        formData.relatedToExcelEmployee ? `Related to Excel employee: ${formData.relatedToExcelEmployee}` : null,
        formData.willingBackgroundCheck === "yes" ? "Willing to do background check" : null,
      ].filter(Boolean).join("; ");

      await apiRequest("POST", "/api/vendors", {
        companyName: formData.companyName,
        contactName: `${formData.firstName} ${formData.lastName}`,
        email: formData.companyEmail,
        phone: formData.businessPhone,
        address: formData.streetAddress + (formData.streetAddress2 ? ` ${formData.streetAddress2}` : ""),
        city: formData.city || null,
        state: formData.state || null,
        zipCode: formData.postalCode || null,
        servicesOffered: [formData.primaryService, formData.otherServices].filter(Boolean).join(", ") || null,
        yearsInBusiness: formData.yearsInBusiness || null,
        insuranceInfo: formData.serviceEquipment || null,
        certifications: null,
        references: referencesText || null,
        additionalInfo: additionalInfo || null,
      });
      
      toast({
        title: "Form Submitted",
        description: "Thank you for your interest. We'll contact you within 48 hours.",
      });

      setFormData({
        companyName: "",
        firstName: "",
        lastName: "",
        businessPhone: "",
        companyEmail: "",
        streetAddress: "",
        streetAddress2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "United States",
        referred: "no",
        referredBy: "",
        yearsInBusiness: "",
        primaryService: "",
        otherServices: "",
        serviceEquipment: "",
        serviceMileRadius: "",
        usesSubcontractors: "no",
        provides24HourService: "no",
        emergencyResponseTime: "",
        quoteWithin24Hours: "no",
        relatedToExcelEmployee: "",
        willingBackgroundCheck: "yes",
      });

      setReferences([
        { id: "ref1", contacts: [{ id: "ref1-contact1", name: "", companyName: "", phoneNumber: "" }] },
        { id: "ref2", contacts: [{ id: "ref2-contact1", name: "", companyName: "", phoneNumber: "" }] },
        { id: "ref3", contacts: [{ id: "ref3-contact1", name: "", companyName: "", phoneNumber: "" }] },
      ]);

      setCurrentStep(1);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addReferenceContact = (referenceId: string) => {
    setReferences(prev => prev.map(ref => {
      if (ref.id === referenceId) {
        const newContactId = `${referenceId}-contact${ref.contacts.length + 1}`;
        return {
          ...ref,
          contacts: [...ref.contacts, { id: newContactId, name: "", companyName: "", phoneNumber: "" }]
        };
      }
      return ref;
    }));
  };

  const updateReferenceContact = (referenceId: string, contactId: string, field: string, value: string) => {
    setReferences(prev => prev.map(ref => {
      if (ref.id === referenceId) {
        return {
          ...ref,
          contacts: ref.contacts.map(contact => 
            contact.id === contactId ? { ...contact, [field]: value } : contact
          )
        };
      }
      return ref;
    }));
  };

  return (
    <div>
      <SEO
        title="Vendor Registration"
        description="Register as a vendor or contractor with Excel Facility Services Group. Complete our registration form to partner with us."
        path="/vendor-registration"
      />
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 70%' }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#063970]/95 via-[#063970]/90 to-[#063970]/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-vendor-hero-title">
              Vendor Registration
            </h1>
            <p className="text-xl text-white/90" data-testid="text-vendor-hero-subtitle">
              Excel Facility Services Group appreciates your interest in doing business with us
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <p className="text-lg text-muted-foreground text-center" data-testid="text-vendor-message">
              Please complete the form below and a company representative will contact you in the next 48 hours.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === 1 ? 'bg-[#0A5EB9] text-white' : 'bg-gray-200 text-gray-600'} font-bold`} data-testid="step-indicator-1">
              1
            </div>
            <div className="w-20 h-1 bg-gray-200"></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === 2 ? 'bg-[#0A5EB9] text-white' : 'bg-gray-200 text-gray-600'} font-bold`} data-testid="step-indicator-2">
              2
            </div>
          </div>

          <Card className="p-8 border-t-4 border-t-[#97CC06]">
            {currentStep === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-8">
                {/* General Information Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#97CC06]/10">
                      <Briefcase className="h-5 w-5 text-[#97CC06]" />
                    </div>
                    <h2 className="text-2xl font-bold" data-testid="text-section-general">General Information</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        required
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        data-testid="input-company-name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          data-testid="input-first-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="businessPhone">Business Phone Number *</Label>
                        <Input
                          id="businessPhone"
                          type="tel"
                          required
                          value={formData.businessPhone}
                          onChange={(e) => handleChange("businessPhone", e.target.value)}
                          data-testid="input-business-phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="companyEmail">Company Email Address *</Label>
                        <Input
                          id="companyEmail"
                          type="email"
                          required
                          value={formData.companyEmail}
                          onChange={(e) => handleChange("companyEmail", e.target.value)}
                          data-testid="input-company-email"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="streetAddress">Street Address *</Label>
                      <Input
                        id="streetAddress"
                        required
                        value={formData.streetAddress}
                        onChange={(e) => handleChange("streetAddress", e.target.value)}
                        data-testid="input-street-address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="streetAddress2">Street Address Line 2</Label>
                      <Input
                        id="streetAddress2"
                        value={formData.streetAddress2}
                        onChange={(e) => handleChange("streetAddress2", e.target.value)}
                        data-testid="input-street-address-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          required
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          data-testid="input-city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province *</Label>
                        <Input
                          id="state"
                          required
                          value={formData.state}
                          onChange={(e) => handleChange("state", e.target.value)}
                          data-testid="input-state"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal/Zip Code *</Label>
                        <Input
                          id="postalCode"
                          required
                          value={formData.postalCode}
                          onChange={(e) => handleChange("postalCode", e.target.value)}
                          data-testid="input-postal-code"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        required
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        data-testid="input-country"
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Were you referred by someone inside the company?</Label>
                      <RadioGroup
                        value={formData.referred}
                        onValueChange={(value) => handleChange("referred", value)}
                        data-testid="radio-referred"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="referred-yes" data-testid="radio-referred-yes" />
                          <Label htmlFor="referred-yes" className="font-normal cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="referred-no" data-testid="radio-referred-no" />
                          <Label htmlFor="referred-no" className="font-normal cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.referred === "yes" && (
                      <div>
                        <Label htmlFor="referredBy">Please provide the name of the person within our company who referred you to us</Label>
                        <Input
                          id="referredBy"
                          value={formData.referredBy}
                          onChange={(e) => handleChange("referredBy", e.target.value)}
                          data-testid="input-referred-by"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Business History Section */}
                <div className="pt-8 border-t">
                  <h2 className="text-2xl font-bold mb-6" data-testid="text-section-business">Business History</h2>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="yearsInBusiness">How many years have you been in business? *</Label>
                      <Input
                        id="yearsInBusiness"
                        required
                        value={formData.yearsInBusiness}
                        onChange={(e) => handleChange("yearsInBusiness", e.target.value)}
                        data-testid="input-years-in-business"
                      />
                    </div>

                    <div>
                      <Label htmlFor="primaryService">What is the primary service your company provides? *</Label>
                      <Input
                        id="primaryService"
                        required
                        value={formData.primaryService}
                        onChange={(e) => handleChange("primaryService", e.target.value)}
                        data-testid="input-primary-service"
                      />
                    </div>

                    <div>
                      <Label htmlFor="otherServices">What other services does your company provide?</Label>
                      <Textarea
                        id="otherServices"
                        value={formData.otherServices}
                        onChange={(e) => handleChange("otherServices", e.target.value)}
                        data-testid="input-other-services"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="serviceEquipment">Other Service Equipment:</Label>
                      <Textarea
                        id="serviceEquipment"
                        value={formData.serviceEquipment}
                        onChange={(e) => handleChange("serviceEquipment", e.target.value)}
                        data-testid="input-service-equipment"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="serviceMileRadius">What is your service mile radius? *</Label>
                      <Input
                        id="serviceMileRadius"
                        required
                        value={formData.serviceMileRadius}
                        onChange={(e) => handleChange("serviceMileRadius", e.target.value)}
                        data-testid="input-service-mile-radius"
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Does your company use subcontractors?</Label>
                      <RadioGroup
                        value={formData.usesSubcontractors}
                        onValueChange={(value) => handleChange("usesSubcontractors", value)}
                        data-testid="radio-subcontractors"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="subcontractors-yes" data-testid="radio-subcontractors-yes" />
                          <Label htmlFor="subcontractors-yes" className="font-normal cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="subcontractors-no" data-testid="radio-subcontractors-no" />
                          <Label htmlFor="subcontractors-no" className="font-normal cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="mb-3 block">Does your company provide 24-hour service?</Label>
                      <RadioGroup
                        value={formData.provides24HourService}
                        onValueChange={(value) => handleChange("provides24HourService", value)}
                        data-testid="radio-24hour-service"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="24hour-yes" data-testid="radio-24hour-yes" />
                          <Label htmlFor="24hour-yes" className="font-normal cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="24hour-no" data-testid="radio-24hour-no" />
                          <Label htmlFor="24hour-no" className="font-normal cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="emergencyResponseTime">What is your response time for emergency service? *</Label>
                      <Input
                        id="emergencyResponseTime"
                        type="number"
                        required
                        placeholder="in minutes"
                        value={formData.emergencyResponseTime}
                        onChange={(e) => handleChange("emergencyResponseTime", e.target.value)}
                        data-testid="input-emergency-response-time"
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Can your company provide a quote within 24 hours?</Label>
                      <RadioGroup
                        value={formData.quoteWithin24Hours}
                        onValueChange={(value) => handleChange("quoteWithin24Hours", value)}
                        data-testid="radio-quote-24hours"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="quote-yes" data-testid="radio-quote-yes" />
                          <Label htmlFor="quote-yes" className="font-normal cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="quote-no" data-testid="radio-quote-no" />
                          <Label htmlFor="quote-no" className="font-normal cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="relatedToExcelEmployee">Are you related to someone working at Excel? If Yes, please provide complete name and State.</Label>
                      <Input
                        id="relatedToExcelEmployee"
                        value={formData.relatedToExcelEmployee}
                        onChange={(e) => handleChange("relatedToExcelEmployee", e.target.value)}
                        data-testid="input-related-to-excel"
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Are you willing to complete a Background check / Drug Screening?</Label>
                      <RadioGroup
                        value={formData.willingBackgroundCheck}
                        onValueChange={(value) => handleChange("willingBackgroundCheck", value)}
                        data-testid="radio-background-check"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="background-yes" data-testid="radio-background-yes" />
                          <Label htmlFor="background-yes" className="font-normal cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="background-no" data-testid="radio-background-no" />
                          <Label htmlFor="background-no" className="font-normal cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto"
                    data-testid="button-next-step"
                  >
                    Next
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* References Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4" data-testid="text-section-references">References</h2>
                  <p className="text-muted-foreground mb-8">Please provide 3 company references with phone numbers</p>

                  <div className="space-y-12">
                    {references.map((reference, refIndex) => (
                      <div key={reference.id} className="space-y-6">
                        <h3 className="text-xl font-semibold" data-testid={`text-reference-${refIndex + 1}`}>
                          Reference {refIndex + 1}
                        </h3>

                        {reference.contacts.map((contact, contactIndex) => (
                          <div key={contact.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`${contact.id}-name`}>Name *</Label>
                              <Input
                                id={`${contact.id}-name`}
                                required
                                placeholder="Type your answer here..."
                                value={contact.name}
                                onChange={(e) => updateReferenceContact(reference.id, contact.id, "name", e.target.value)}
                                data-testid={`input-ref${refIndex + 1}-contact${contactIndex + 1}-name`}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`${contact.id}-company`}>Company Name *</Label>
                              <Input
                                id={`${contact.id}-company`}
                                required
                                placeholder="Type your answer here..."
                                value={contact.companyName}
                                onChange={(e) => updateReferenceContact(reference.id, contact.id, "companyName", e.target.value)}
                                data-testid={`input-ref${refIndex + 1}-contact${contactIndex + 1}-company`}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`${contact.id}-phone`}>Phone Number *</Label>
                              <Input
                                id={`${contact.id}-phone`}
                                type="tel"
                                required
                                placeholder="(000) 000-0000"
                                value={contact.phoneNumber}
                                onChange={(e) => updateReferenceContact(reference.id, contact.id, "phoneNumber", e.target.value)}
                                data-testid={`input-ref${refIndex + 1}-contact${contactIndex + 1}-phone`}
                              />
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="ghost"
                          className="text-[#97CC06] hover:text-[#97CC06] hover:bg-[#97CC06]/10"
                          onClick={() => addReferenceContact(reference.id)}
                          data-testid={`button-add-row-ref${refIndex + 1}`}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add row
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setCurrentStep(1);
                      window.scrollTo(0, 0);
                    }}
                    data-testid="button-back"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    data-testid="button-submit-vendor"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}
