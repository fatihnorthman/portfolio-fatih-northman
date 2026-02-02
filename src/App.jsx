import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

function App() {
    return (
        <div style={{ background: '#050505', minHeight: '100vh', position: 'relative' }}>
            <Navbar />

            {/* Global 3D Background */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
                <Canvas gl={{ antialias: false }}>
                    <color attach="background" args={['#050505']} />
                    <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />

                    <ambientLight intensity={0.5} />

                    {/* Post Processing - Temporarily Disabled for Debugging */}
                    {/* <EffectComposer>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer> */}
                </Canvas>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <Hero />
                <Projects />
                <Contact />
            </div>
        </div>
    )
}

export default App
