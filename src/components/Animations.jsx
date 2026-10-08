import { useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Animations = () => {
  useLayoutEffect(() => {

    const ctx = gsap.context(() => {

      // =========================
      // INITIAL HEADLINE ANIMATION
      // =========================

      gsap.from("#hero-title", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })


      // =========================
      // STATISTICS ENTRANCE
      // =========================

      gsap.to(".stat-item", {
        y: -20,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out",
      })


      // =========================
      // DYNAMIC STATISTICS
      // =========================

      const statNumbers = document.querySelectorAll(".stat-number")

      statNumbers.forEach((number) => {

        const target = Number(number.dataset.target)

        const counter = {
          value: 0,
        }

        gsap.to(counter, {
          value: target,
          duration: 2,
          delay: 0.7,
          ease: "power2.out",

          onUpdate: () => {
            number.textContent =
              `${Math.round(counter.value)}%`
          },
        })

      })


      // =========================
      // SCROLL-DRIVEN OBJECT
      // =========================

      gsap.to("#hero-object", {

        y: 350,
        scale: 0.45,
        rotation: 180,

        ease: "none",

        scrollTrigger: {
          trigger: "#hero-object",
          start: "top center",
          end: "bottom top",

          scrub: 1,

          // Makes the animation reversible
          // when scrolling upward
          invalidateOnRefresh: true,
        },

      })

    })

    return () => ctx.revert()

  }, [])

  return null
}

export default Animations