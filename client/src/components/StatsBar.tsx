interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-2" data-testid={`text-stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
        <span className="text-[#97CC06]">{value}</span>
      </div>
      <div className="text-sm md:text-base text-muted-foreground">{label}</div>
    </div>
  );
}

export default function StatsBar() {
  const stats = [
    { value: "20+", label: "Years of Experience" },
    { value: "20+", label: "States" },
    { value: "30M+", label: "Sq Ft Serviced Daily" },
  ];

  return (
    <div className="bg-muted py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
