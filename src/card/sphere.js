import { TextureLoader } from 'three'
import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import earth_texture from '../../public/earth_texture.jpg'
import earth_bump from '../../public/earth_bump.jpg'

function Sphere(props) {
  const ref = useRef()
  // const [hovered, hover] = useState(false)
  // const [clicked, click] = useState(false)

  useFrame((state, delta) => (ref.current.rotation.y += delta))

  const earthTexture = useMemo(() => new TextureLoader().load(earth_texture), [])
  const bumpMap = useMemo(() => new TextureLoader().load(earth_bump), [])

  return (
    <mesh
      {...props}
      ref={ref}
      // scale={hovered ? 1.1 : 1}
      // onClick={(event) => click(!clicked)}
      // onPointerOver={(event) => hover(true)}
      // onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[2.7, 64, 64]} />
      <meshStandardMaterial metalness={0.1} roughness={0.1} bumpMap={bumpMap} bumpScale={100} map={earthTexture} />
    </mesh>
  )
}
export default Sphere
