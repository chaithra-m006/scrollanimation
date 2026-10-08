import React, { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import CarScene from "./components/CarScene"

export default function App() {
  const [carProgress, setCarProgress] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)

  const headerRef = useRef(null)
  const cardTopLeftRef = useRef(null)
  const cardTopRightRef = useRef(null)
  const cardBottomLeftRef = useRef(null)
  const cardBottomRightRef = useRef(null)
  const hintRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      hintRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6 },
      "-=0.5"
    )
    .fromTo(
      [cardTopLeftRef.current, cardTopRightRef.current],
      { opacity: 0, scale: 0.8, y: -20 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.2, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(
      [cardBottomLeftRef.current, cardBottomRightRef.current],
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.2, duration: 0.8 },
      "-=0.6"
    )
  }, [])

  const handlePositionChange = (progress) => {
    setCarProgress(progress)
    if (!hasScrolled) {
      setHasScrolled(true)
      // Fade out scroll hint once user starts driving
      gsap.to(hintRef.current, { opacity: 0, y: -10, duration: 0.4, pointerEvents: "none" })
    }
  }

  const stat1 = hasScrolled ? Math.round(20 + carProgress * 0.6) : "--"
  const stat2 = hasScrolled ? Math.round(15 + (100 - carProgress) * 0.4) : "--"
  const stat3 = hasScrolled ? Math.round(10 + carProgress * 0.4) : "--"
  const stat4 = hasScrolled ? Math.round(35 - carProgress * 0.25) : "--"

  const getHeaderColor = () => {
    if (!hasScrolled) return "text-slate-900"
    if (carProgress < 33) return "text-slate-900"
    if (carProgress < 66) return "text-lime-600"
    return "text-indigo-600"
  }

  return (
    <div className="bg-[#eef2f6] text-slate-900 h-screen w-screen relative overflow-hidden flex flex-col justify-center items-center font-sans select-none">
      
      {/* Header */}
      <div ref={headerRef} className="absolute top-8 text-center z-35 transition-colors duration-500 opacity-0">
        <h1 className={`text-4xl md:text-6xl font-black tracking-widest uppercase ${getHeaderColor()}`}>
          WELCOME ITZFIZZ
        </h1>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mt-1 font-bold">
          {hasScrolled ? `Explore Progress: ${Math.round(carProgress)}%` : "Scroll to drive & explore metrics"}
        </p>
      </div>

      {/* Floating Scroll Interaction Badge */}
      <div ref={hintRef} className="absolute top-28 bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest shadow-lg z-40 opacity-0 animate-bounce">
        📜 SCROLL MOUSE WHEEL TO DRIVE CAR
      </div>

      {/* Top Cards with Hover Scale Effect */}
      <div ref={cardTopRightRef} className="absolute top-32 right-[18%] backdrop-blur-xl bg-white/80 border-2 border-lime-400/50 text-slate-900 p-6 rounded-3xl shadow-2xl w-80 z-30 opacity-0 hover:scale-105 transition-transform duration-300">
        <h3 className="text-4xl font-black text-lime-600">{stat1}{hasScrolled && "%"}</h3>
        <p className="text-xs mt-2 font-bold text-slate-700 uppercase tracking-wider">Increase in pick up point use</p>
      </div>

      <div ref={cardTopLeftRef} className="absolute top-40 left-[12%] backdrop-blur-xl bg-white/80 border-2 border-blue-400/50 text-slate-900 p-6 rounded-3xl shadow-2xl w-72 z-30 opacity-0 hover:scale-105 transition-transform duration-300">
        <h3 className="text-3xl font-black text-blue-600">{stat2}{hasScrolled && "%"}</h3>
        <p className="text-xs mt-2 font-bold text-slate-700 uppercase tracking-wider">Faster route optimization</p>
      </div>

      {/* Road Banner */}
      <div className="w-full h-72 bg-black relative flex items-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-20 pointer-events-none">
          <CarScene onPositionChange={handlePositionChange} />
        </div>
      </div>

      {/* Bottom Cards with Hover Scale Effect */}
      <div ref={cardBottomLeftRef} className="absolute bottom-12 left-[15%] backdrop-blur-xl bg-white/80 border-2 border-sky-400/50 text-slate-900 p-6 rounded-3xl shadow-2xl w-80 z-30 opacity-0 hover:scale-105 transition-transform duration-300">
        <h3 className="text-4xl font-black text-sky-500">{stat3}{hasScrolled && "%"}</h3>
        <p className="text-xs mt-2 font-bold text-slate-700 uppercase tracking-wider">Decreased customer calls</p>
      </div>

      <div ref={cardBottomRightRef} className="absolute bottom-16 right-[16%] backdrop-blur-xl bg-white/80 border-2 border-amber-400/50 text-slate-900 p-6 rounded-3xl shadow-2xl w-72 z-30 opacity-0 hover:scale-105 transition-transform duration-300">
        <h3 className="text-3xl font-black text-amber-600">{stat4}{hasScrolled && "%"}</h3>
        <p className="text-xs mt-2 font-bold text-slate-700 uppercase tracking-wider">Reduced idle travel time</p>
      </div>

    </div>
  )
}