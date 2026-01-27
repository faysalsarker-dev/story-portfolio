import HeroText from "../modules/Hero/HeroText"

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
      <div className="relative  flex h-[80vh] -mt-24 items-center">
        <HeroText />
      </div>
    </section>
  )
}
