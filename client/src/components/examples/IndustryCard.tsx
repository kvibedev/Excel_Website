import IndustryCard from '../IndustryCard'
import medicalImage from '@assets/generated_images/Medical_groups_industry_image_a154fa6b.png'

export default function IndustryCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <IndustryCard
        title="Medical Groups"
        imageSrc={medicalImage}
        href="/industries/medical-groups"
      />
    </div>
  )
}
