import Hero from '../Hero'
import heroImage from '@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png'

export default function HeroExample() {
  return (
    <Hero
      title="Professional Commercial Cleaning Services"
      subtitle="Creating healthier workplaces with 20+ years of experience"
      imageSrc={heroImage}
      primaryCta={{ text: "Get Estimate", href: "/contact" }}
      secondaryCta={{ text: "View Services", href: "/services" }}
      height="full"
    />
  )
}
