import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  return (
    <Card className="hover-elevate transition-shadow h-full flex flex-col" data-testid={`card-service-${title.toLowerCase().replace(/[®\s]/g, '-')}`}>
      <CardHeader className="flex-grow">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button variant="ghost" className="w-full justify-start p-0 h-auto" data-testid={`button-learn-more-${title.toLowerCase().replace(/[®\s]/g, '-')}`}>
            Learn More →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
