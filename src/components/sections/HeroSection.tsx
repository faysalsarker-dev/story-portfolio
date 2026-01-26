import HeroText from "../modules/Hero/HeroText"
import { Globe } from "../ui/globe"

export default function HeroSection() {
  return (
    <section
      className="
        relative 
        min-h-screen 
        overflow-hidden
        pt-20 
      "
    >
      {/* Hero Text */}
      <div className="relative  flex h-[80vh] items-center">
        <HeroText />
      </div>

      {/* Globe – bottom 20% */}
      <div className="absolute bottom-44 left-0 h-[20vh] w-full z-10">
        <Globe />
      </div>
    </section>
  )
}
