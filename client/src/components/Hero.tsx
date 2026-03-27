import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useState } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  images?: string[];
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  height?: "full" | "medium" | "small";
}

export default function Hero({
  title,
  subtitle,
  imageSrc,
  images,
  primaryCta,
  secondaryCta,
  height = "full",
}: HeroProps) {
  const heightClasses = {
    full: "h-[80vh] min-h-[500px]",
    medium: "h-[50vh] min-h-[400px]",
    small: "h-[40vh] min-h-[300px]",
  };

  const slides = images && images.length > 1 ? images : [imageSrc];
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={`relative ${heightClasses[height]} w-full flex items-center justify-center overflow-hidden`}>
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === current ? (fading ? 0 : 1) : 0,
            transition: "opacity 800ms ease-in-out",
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" style={{ zIndex: 2 }} />

      <div className="relative container mx-auto px-4 text-center text-white" style={{ zIndex: 3 }}>
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

        {slides.length > 1 && (
          <div className="flex gap-2 justify-center mt-8" data-testid="hero-slide-indicators">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFading(false); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-3 bg-white/50"}`}
                data-testid={`button-hero-slide-${i}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
