import { TextureLoader } from 'three'
import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import earth_texture from '../../public/earth_texture.jpg'
import { atmosphereShader } from './atmosphereShader'

function Earth(props) {
  const earthRef = useRef()
  const atmosphereRef = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const earthRadius = 2.5
  const atmosphereRadius = 2.6
  const atmosphereColor = '#b5d5ff'
  const atmosphereOpacity = 0.3
  const atmosphereGlowPower = 0.5

  // Load Earth texture
  const earthTexture = useMemo(() => new TextureLoader().load(earth_texture), [])

  // Create atmosphere mesh
  useEffect(() => {
    const atmosphereGeometry = new THREE.SphereBufferGeometry(atmosphereRadius, 64, 64)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(atmosphereColor) },
        viewDistance: { value: 0.5 },
        glowPower: { value: atmosphereGlowPower }
      },
      vertexShader: atmosphereShader.vertexShader,
      fragmentShader: atmosphereShader.fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    })
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    atmosphereMesh.scale.multiplyScalar(1.1)
    atmosphereMaterial.opacity = atmosphereOpacity
    atmosphereRef.current = atmosphereMesh
    earthRef.current.add(atmosphereMesh)
  }, [atmosphereRadius, atmosphereColor, atmosphereGlowPower, atmosphereOpacity])

  useFrame((state, delta) => {
    earthRef.current.rotation.y += delta
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.copy(earthRef.current.rotation)
    }
  })

  return (
    <>
      <mesh
        {...props}
        ref={earthRef}
        scale={clicked ? 1.1 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[earthRadius, 64, 64]} />
        <meshStandardMaterial metalness={0.5} roughness={0.5} map={earthTexture} />
      </mesh>
    </>
  )
}

export default Earth
