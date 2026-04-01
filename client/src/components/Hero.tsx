import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  images?: string[];
  imagePositions?: string[];
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  height?: "full" | "medium" | "small";
}

export default function Hero({
  title,
  subtitle,
  imageSrc,
  images,
  imagePositions,
  primaryCta,
  secondaryCta,
  height = "full",
}: HeroProps) {
  const heightClasses = {
    full: "h-[80vh] min-h-[500px]",
    medium: "h-[50vh] min-h-[400px]",
    small: "h-[40vh] min-h-[300px]",
  };

  const slides = images && images.length > 0 ? images : [imageSrc];

  const [current, setCurrent] = useState(0);
  const [entering, setEntering] = useState<number | null>(null);
  const [enteringVisible, setEnteringVisible] = useState(false);
  const currentRef = useRef(0);
  const busyRef = useRef(false);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      if (busyRef.current) return;
      busyRef.current = true;

      const next = (currentRef.current + 1) % slides.length;

      setEntering(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnteringVisible(true);
          setTimeout(() => {
            currentRef.current = next;
            setCurrent(next);
            setEntering(null);
            setEnteringVisible(false);
            busyRef.current = false;
          }, 1000);
        });
      });
    }, 5500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goTo = (i: number) => {
    if (busyRef.current || i === currentRef.current) return;
    busyRef.current = true;
    setEntering(i);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setEnteringVisible(true);
        setTimeout(() => {
          currentRef.current = i;
          setCurrent(i);
          setEntering(null);
          setEnteringVisible(false);
          busyRef.current = false;
        }, 1000);
      });
    });
  };

  return (
    <div className={`relative ${heightClasses[height]} w-full flex items-center justify-center overflow-hidden`}>
      {slides.map((src, i) => {
        const isCurrent = i === current;
        const isEntering = i === entering;
        let opacity = 0;
        let zIndex = 0;
        if (isEntering) {
          opacity = enteringVisible ? 1 : 0;
          zIndex = 2;
        } else if (isCurrent) {
          opacity = 1;
          zIndex = 1;
        }
        return (
          <div
            key={src}
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: imagePositions?.[i] ?? "center center",
              opacity,
              transition: "opacity 1000ms ease-in-out",
              zIndex,
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" style={{ zIndex: 3 }} />
      <div className="relative container mx-auto px-4 text-center text-white" style={{ zIndex: 4 }}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl mx-auto text-[#97cd07]" data-testid="text-hero-title">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-white/90" data-testid="text-hero-subtitle">
            {subtitle.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCta && (
              <Link href={primaryCta.href}>
                <Button size="lg" variant="default" className="bg-[#98ce05] text-[#073970]" data-testid="button-hero-primary">
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
                onClick={() => goTo(i)}
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
