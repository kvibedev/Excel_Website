import { Building2, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/industries", label: "Industries" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1">
            <Building2 className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none text-foreground">EFSG</span>
              <span className="text-xs text-muted-foreground">Facility Services</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
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
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
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
