import ServiceCard from '../ServiceCard'
import { Sparkles } from 'lucide-react'

export default function ServiceCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ServiceCard
        icon={Sparkles}
        title="Janitorial Services"
        description="Professional janitorial services that keep your workplace clean, safe, and presentable for employees and customers."
        href="/services/janitorial"
      />
    </div>
  )
}
