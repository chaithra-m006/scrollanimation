import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, useGLTF } from "@react-three/drei"
import React, { Suspense, useEffect, useRef } from "react"
import * as THREE from "three"

function SceneController({ progress }) {
  const { scene } = useThree()
  
  useEffect(() => {
    const color = new THREE.Color().lerpColors(
      new THREE.Color("#0a0a0a"),
      new THREE.Color("#1e293b"),
      progress / 100
    )
    scene.background = color
  }, [progress, scene])

  return null
}

function Car({ onPositionChange, setProgressState }) {
  const { scene } = useGLTF("/models/car.glb")
  const carRef = useRef()
  
  const targetX = useRef(-7.5)
  const currentX = useRef(-7.5)

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      targetX.current += e.deltaY * 0.0035

      if (targetX.current < -7.5) targetX.current = -7.5
      if (targetX.current > 7.5) targetX.current = 7.5

      const progress = ((targetX.current + 7.5) / 15) * 100
      if (onPositionChange) onPositionChange(progress)
      if (setProgressState) setProgressState(progress)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [onPositionChange, setProgressState])

  // Smooth lerp animation loop using useFrame for buttery-smooth car gliding
  useFrame(() => {
    if (carRef.current) {
      currentX.current = THREE.MathUtils.lerp(currentX.current, targetX.current, 0.1)
      carRef.current.position.x = currentX.current
    }
  })

  return (
    <primitive
      ref={carRef}
      object={scene}
      scale={1.6}
      rotation={[0, Math.PI / 2, 0]}
      position={[-7.5, 0, 0]}
    />
  )
}

export default function CarScene({ onPositionChange }) {
  const [progress, setProgressState] = React.useState(0)

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{
          position: [0, 5.5, 0],
          rotation: [-Math.PI / 2, 0, 0],
          fov: 45,
        }}
      >
        <SceneController progress={progress} />
        <ambientLight intensity={3} />
        <directionalLight position={[0, 10, 5]} intensity={4} />

        <Suspense fallback={null}>
          <Car onPositionChange={onPositionChange} setProgressState={setProgressState} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Built-in Road Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-neutral-800 z-30 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-lime-400 to-sky-400 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

useGLTF.preload("/models/car.glb")