import Stats from "./Stats"
import CarScene from "./CarScene"

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-12">

        <div className="pt-16 text-center">
          <h1
            id="hero-title"
            className="text-3xl font-light tracking-[0.5em] md:text-6xl"
          >
            W E L C O M E I T Z F I Z Z
          </h1>

          <p className="mt-6 text-sm tracking-[0.3em] text-white/50">
            SCROLL TO EXPLORE
          </p>
        </div>

        <div className="mx-auto w-full max-w-5xl">
          <CarScene />
        </div>

        <div className="pb-10">
          <Stats />
        </div>

      </div>

    </section>
  )
}

export default Hero