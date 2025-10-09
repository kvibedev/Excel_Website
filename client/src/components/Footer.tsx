import { Building2, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const serviceLinks = [
    { href: "/services/janitorial", label: "Janitorial" },
    { href: "/services/day-porters", label: "Day Porters" },
    { href: "/services/levelup-clean", label: "LevelUp Clean®" },
    { href: "/services/disinfection", label: "Disinfection" },
  ];

  const industryLinks = [
    { href: "/industries/office-building", label: "Office Buildings" },
    { href: "/industries/medical-groups", label: "Medical Groups" },
    { href: "/industries/schools", label: "Schools" },
    { href: "/industries/restaurants", label: "Restaurants" },
  ];

  return (
    <footer className="bg-muted border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">EFSG</span>
                <span className="text-xs text-muted-foreground">Facility Services</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Professional commercial cleaning services with 20+ years of experience across 28 states nationwide.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 rounded-md p-2"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 rounded-md p-2"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 rounded-md p-2"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-footer-${link.label.toLowerCase().replace(/[®\s]/g, '-')}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Industries</h3>
            <ul className="space-y-2">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, '-')}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Excel Facility Services Group</li>
              <li>Nationwide Coverage</li>
              <li>20+ States</li>
              <li>
                <Link href="/contact" className="text-primary hover:underline" data-testid="link-footer-contact">
                  Request an Estimate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Excel Facility Services Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
