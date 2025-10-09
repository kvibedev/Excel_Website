import { Card } from "@/components/ui/card";
import { Link } from "wouter";

interface IndustryCardProps {
  title: string;
  imageSrc: string;
  href: string;
}

export default function IndustryCard({ title, imageSrc, href }: IndustryCardProps) {
  return (
    <Link href={href}>
      <Card className="group relative overflow-hidden h-64 hover-elevate transition-all cursor-pointer" data-testid={`card-industry-${title.toLowerCase().replace(/\s/g, '-')}`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-colors" />
        </div>
        <div className="relative h-full flex items-end p-6">
          <h3 className="text-2xl font-bold text-white" data-testid={`text-industry-${title.toLowerCase().replace(/\s/g, '-')}`}>
            {title}
          </h3>
        </div>
      </Card>
    </Link>
  );
}
