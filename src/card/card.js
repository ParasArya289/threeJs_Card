import './card.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Sphere from './sphere'
const Card = () => {
  return (
    <div className="card-body">
      <div className="card-container">
        {/* <img
          src="https://i.redd.it/466b7dxocnq51.jpg"
          alt="hero"
          className="hero-img"
        /> */}
        <Canvas className="canvas" onWheel={(e) => e.preventDefault()}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Sphere />
          <OrbitControls enableZoom={false} />
        </Canvas>
        <div className="info-container">
          <h2 className="hero-name">
            Earth<span className="hero-sub">Solar System</span>
          </h2>
          <p className="hero-info">
            Earth—our home planet—is the only place we know of so far that’s inhabited by living things. It's also the only planet in our
            solar system with liquid water on the surface.
          </p>
        </div>
        <footer>
          <button className="btn">Read</button>
          <button className="btn">Bookmark</button>
        </footer>
      </div>
    </div>
  )
}
export default Card
