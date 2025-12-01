import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import headerLogo from "@assets/Excel logo menu_1764259763822.webp";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Header() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileHomepageOpen, setMobileHomepageOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const serviceLinks = [
    { href: "/services/janitorial", label: "Janitorial" },
    { href: "/services/day-porters", label: "Day Porters" },
    { href: "/services/levelup-clean", label: "LevelUp Clean®" },
    { href: "/services/disinfection", label: "Disinfection" },
    { href: "/services/covid-19-cleaning", label: "COVID-19 Cleaning" },
    { href: "/services/floor-care", label: "Floor Care" },
    { href: "/services/window-washing", label: "Window Washing" },
    { href: "/services/air-duct-hvac", label: "Air Duct & HVAC" },
    { href: "/services/carpet-extraction", label: "Carpet Extraction" },
    { href: "/services/concrete-polishing", label: "Concrete Polishing" },
    { href: "/services/power-washing", label: "Power Washing" },
  ];

  const industryLinks = [
    { href: "/industries/office-building", label: "Office Building" },
    { href: "/industries/retailer", label: "Retailer" },
    { href: "/industries/distribution-centers", label: "Distribution Centers" },
    { href: "/industries/auto-dealerships", label: "Auto Dealerships" },
    { href: "/industries/restaurants", label: "Restaurants" },
    { href: "/industries/banks", label: "Banks" },
    { href: "/industries/medical-groups", label: "Medical Groups" },
    { href: "/industries/schools", label: "Schools" },
  ];

  const aboutLinks = [
    { href: "/about/our-team", label: "Our Team" },
    { href: "/about/coverage-areas", label: "Coverage Areas" },
    { href: "/about/recognitions-certifications", label: "Recognitions & Certifications" },
    { href: "/about/green-seal", label: "Green Seal" },
  ];

  const homepageTemplates = [
    { href: "/", label: "Home" },
    { href: "/home-original", label: "Home (Original)" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center hover-elevate active-elevate-2 rounded-md px-2 py-1" data-testid="link-header-logo">
            <img src={headerLogo} alt="Excel Facility Services Group" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      (location === "/" || location === "/home-original") ? "bg-secondary text-secondary-foreground" : ""
                    )}
                    data-testid="dropdown-homepage"
                  >
                    Home
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-1 p-2">
                      {homepageTemplates.map((template) => (
                        <li key={template.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={template.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate active-elevate-2",
                                location === template.href ? "bg-accent text-accent-foreground" : ""
                              )}
                              data-testid={`link-homepage-${template.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                            >
                              <div className="text-sm font-medium leading-none">{template.label}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.startsWith("/services") ? "bg-secondary text-secondary-foreground" : ""
                    )}
                    data-testid="dropdown-services"
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-1 p-2 grid-cols-3">
                      {serviceLinks.map((service) => (
                        <li key={service.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={service.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate active-elevate-2",
                                location === service.href ? "bg-accent text-accent-foreground" : ""
                              )}
                              data-testid={`link-service-${service.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                            >
                              <div className="text-sm font-medium leading-none">{service.label}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.startsWith("/industries") ? "bg-secondary text-secondary-foreground" : ""
                    )}
                    data-testid="dropdown-industries"
                  >
                    Industries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-1 p-2 grid-cols-3">
                      {industryLinks.map((industry) => (
                        <li key={industry.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={industry.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate active-elevate-2",
                                location === industry.href ? "bg-accent text-accent-foreground" : ""
                              )}
                              data-testid={`link-industry-${industry.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                            >
                              <div className="text-sm font-medium leading-none">{industry.label}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.startsWith("/about") ? "bg-secondary text-secondary-foreground" : ""
                    )}
                    onClick={(e) => {
                      if (!e.defaultPrevented) {
                        setLocation('/about');
                      }
                    }}
                    data-testid="dropdown-about"
                  >
                    About Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-1 p-2 grid-cols-2">
                      {aboutLinks.map((about) => (
                        <li key={about.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={about.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate active-elevate-2",
                                location === about.href ? "bg-accent text-accent-foreground" : ""
                              )}
                              data-testid={`link-about-${about.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                            >
                              <div className="text-sm font-medium leading-none">{about.label}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/contact">
              <Button
                variant={location === "/contact" ? "secondary" : "ghost"}
                data-testid="link-contact"
              >
                Contact
              </Button>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/contact">
              <Button variant="default" data-testid="button-get-estimate">
                Get Estimate
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              <div>
                <Button
                  variant={(location === "/" || location === "/home-original") ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setMobileHomepageOpen(!mobileHomepageOpen)}
                  data-testid="button-mobile-homepage"
                >
                  Home
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileHomepageOpen && "rotate-180")} />
                </Button>
                {mobileHomepageOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-1">
                    {homepageTemplates.map((template) => (
                      <Link key={template.href} href={template.href}>
                        <Button
                          variant={location === template.href ? "secondary" : "ghost"}
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setMobileHomepageOpen(false);
                            setMobileMenuOpen(false);
                          }}
                          data-testid={`link-mobile-homepage-${template.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        >
                          {template.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Button
                  variant={location.startsWith("/services") ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  data-testid="button-mobile-services"
                >
                  Services
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileServicesOpen && "rotate-180")} />
                </Button>
                {mobileServicesOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-1">
                    {serviceLinks.map((service) => (
                      <Link key={service.href} href={service.href}>
                        <Button
                          variant={location === service.href ? "secondary" : "ghost"}
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setMobileServicesOpen(false);
                            setMobileMenuOpen(false);
                          }}
                          data-testid={`link-mobile-service-${service.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        >
                          {service.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Button
                  variant={location.startsWith("/industries") ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                  data-testid="button-mobile-industries"
                >
                  Industries
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileIndustriesOpen && "rotate-180")} />
                </Button>
                {mobileIndustriesOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-1">
                    {industryLinks.map((industry) => (
                      <Link key={industry.href} href={industry.href}>
                        <Button
                          variant={location === industry.href ? "secondary" : "ghost"}
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setMobileIndustriesOpen(false);
                            setMobileMenuOpen(false);
                          }}
                          data-testid={`link-mobile-industry-${industry.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        >
                          {industry.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Button
                  variant={location.startsWith("/about") ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  data-testid="button-mobile-about"
                >
                  About Us
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileAboutOpen && "rotate-180")} />
                </Button>
                {mobileAboutOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-1">
                    {aboutLinks.map((about) => (
                      <Link key={about.href} href={about.href}>
                        <Button
                          variant={location === about.href ? "secondary" : "ghost"}
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setMobileAboutOpen(false);
                            setMobileMenuOpen(false);
                          }}
                          data-testid={`link-mobile-about-${about.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        >
                          {about.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/contact">
                <Button
                  variant={location === "/contact" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-mobile-contact"
                >
                  Contact
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="button-mobile-get-estimate"
                >
                  Get Estimate
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
