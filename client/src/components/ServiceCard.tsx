import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({ image, title, description, href }: ServiceCardProps) {
  return (
    <Card className="hover-elevate transition-shadow h-full flex flex-col overflow-hidden" data-testid={`card-service-${title.toLowerCase().replace(/[®\s]/g, '-')}`}>
      <div className="relative h-40 overflow-hidden rounded-t-xl -mx-6 -mt-6 mb-4">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardHeader className="flex-grow">
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
