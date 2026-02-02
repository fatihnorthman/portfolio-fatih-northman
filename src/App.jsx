import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef, Suspense } from 'react'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';
import SpaceNavigator from './components/SpaceNavigator';
import ColorPicker from './components/ColorPicker/ColorPicker';
import HUDIcons from './components/Layout/HUDIcons';
import CustomCursor from './components/Layout/CustomCursor';
import SideProgress from './components/Layout/SideProgress';

function ScrollStars({ scrollProgress }) {
    const starsRef = useRef()

    useFrame(({ clock }) => {
        if (starsRef.current) {
            starsRef.current.position.z = ((clock.getElapsedTime() * 5) % 100) - 50
            const scrollValue = scrollProgress.get()
            starsRef.current.rotation.x = scrollValue * Math.PI * 0.5
            starsRef.current.rotation.y = scrollValue * Math.PI * 0.3
        }
    })

    return (
        <group ref={starsRef}>
            <Stars radius={150} depth={150} count={10000} factor={8} saturation={0} fade speed={2} />
        </group>
    )
}

function App() {
    const { scrollYProgress } = useScroll()

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 45,
        damping: 25,
        restDelta: 0.001
    })

    return (
        <div style={{ background: '#050505', minHeight: '100vh', width: '100%', cursor: 'none' }}>
            {/* Tactical Grid Overlay */}
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(255, 60, 60, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 60, 60, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
                zIndex: 2,
                opacity: 0.5
            }} />

            {/* Scanline Effect */}
            <div className="scanline-overlay" style={{
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.1) 50%)',
                backgroundSize: '100% 4px',
                pointerEvents: 'none',
                zIndex: 3,
                opacity: 0.2
            }} />

            {/* Scroll Area */}
            <div style={{
                height: '400vh',
                width: '100%',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
                <div style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
                <div style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
                <div style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
            </div>

            <Navbar />

            {/* Fixed Space Background */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <Canvas
                    gl={{ antialias: false, alpha: true }}
                    camera={{ position: [0, 0, 5], fov: 80 }}
                >
                    <ScrollStars scrollProgress={smoothProgress} />
                    <ambientLight intensity={0.5} />
                </Canvas>
            </div>

            {/* Content Layers */}
            <SpaceNavigator>
                {[
                    <Hero key="hero" />,
                    <About key="about" />,
                    <Projects key="projects" />,
                    <Contact key="contact" />
                ]}
            </SpaceNavigator>

            <HUDIcons />
            <SideProgress />
            <ColorPicker />
            <CustomCursor />
        </div>
    )
}

export default App
