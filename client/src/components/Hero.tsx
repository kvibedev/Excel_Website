import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  height?: "full" | "medium" | "small";
}

export default function Hero({
  title,
  subtitle,
  imageSrc,
  primaryCta,
  secondaryCta,
  height = "full",
}: HeroProps) {
  const heightClasses = {
    full: "h-[80vh] min-h-[500px]",
    medium: "h-[50vh] min-h-[400px]",
    small: "h-[40vh] min-h-[300px]",
  };

  return (
    <div className={`relative ${heightClasses[height]} w-full flex items-center justify-center overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl mx-auto" data-testid="text-hero-title">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-white/90" data-testid="text-hero-subtitle">
            {subtitle}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCta && (
              <Link href={primaryCta.href}>
                <Button size="lg" variant="default" data-testid="button-hero-primary">
                  {primaryCta.text}
                </Button>
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-background/10 backdrop-blur-sm border-white/30 text-white hover:bg-background/20"
                  data-testid="button-hero-secondary"
                >
                  {secondaryCta.text}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
