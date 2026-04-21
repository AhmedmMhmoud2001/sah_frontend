import { memo, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])
  return reduced
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])
  return isMobile
}

function Dots() {
  const count = 28
  const points = useMemo(() => {
    const out = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 7
      const y = (Math.random() - 0.5) * 3
      const z = (Math.random() - 0.5) * 2
      const s = 0.06 + Math.random() * 0.12
      out.push({ x, y, z, s })
    }
    return out
  }, [])

  const color = useMemo(() => '#D6A042', [])

  return (
    <>
      {points.map((p, i) => (
        <Float
          key={i}
          speed={0.6 + (i % 5) * 0.08}
          rotationIntensity={0.15}
          floatIntensity={0.25}
        >
          <mesh position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[p.s, 14, 14]} />
            <meshStandardMaterial color={color} transparent opacity={0.35} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} intensity={0.65} />
      <Dots />
    </>
  )
}

function HeroBackground3DImpl() {
  const reduced = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  if (reduced || isMobile) return null

  return (
    <div className="hero3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <HeroScene />
      </Canvas>
    </div>
  )
}

export default memo(HeroBackground3DImpl)

