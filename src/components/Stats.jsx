import { useRef } from "react"

const stats = [
  {
    target: 92,
    description: "Customer satisfaction",
  },
  {
    target: 78,
    description: "Faster engagement",
  },
  {
    target: 64,
    description: "Higher retention",
  },
]

const Stats = () => {
  const statsRef = useRef(null)

  return (
    <div
      ref={statsRef}
      id="stats"
      className="grid grid-cols-1 gap-8 text-center md:grid-cols-3"
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="stat-item opacity-0"
        >
          <div
            className="stat-number text-5xl font-light md:text-6xl"
            data-target={stat.target}
          >
            0%
          </div>

          <p className="mt-3 text-sm tracking-wider text-white/50">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Stats