import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

function App() {
    return (
        <div style={{ background: '#050505', minHeight: '100vh', position: 'relative' }}>
            <Navbar />

            {/* Global 3D Background */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
                <Canvas gl={{ antialias: true }}>
                    <color attach="background" args={['#050505']} />
                    <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
                    <ambientLight intensity={0.5} />
                </Canvas>
            </div>

            {/* CSS-based Cinema Effects (Stable Replacement for PostProcessing) */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)', // Vignette
                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)' // Deep vignette
            }}></div>

            {/* CSS Noise Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0.03,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                filter: 'contrast(150%) brightness(100%)'
            }}></div>

            <div style={{ position: 'relative', zIndex: 5 }}>
                <Hero />
                <About />
                <Projects />
                <Contact />
            </div>
        </div>
    )
}

export default App
