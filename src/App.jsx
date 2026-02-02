import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';
import SpaceNavigator from './components/SpaceNavigator';
import ColorPicker from './components/ColorPicker/ColorPicker';

// Optimized Animated Stars
function ScrollStars({ scrollProgress }) {
    const starsRef = useRef()

    useFrame(({ clock }) => {
        if (starsRef.current) {
            starsRef.current.position.z = ((clock.getElapsedTime() * 10) % 100) - 50

            const scrollValue = scrollProgress.get()
            starsRef.current.rotation.x = scrollValue * Math.PI * 1.2
            starsRef.current.rotation.y = scrollValue * Math.PI * 0.8
            starsRef.current.rotation.z = clock.getElapsedTime() * 0.03 + scrollValue * Math.PI * 0.3
        }
    })

    return (
        <group ref={starsRef}>
            <Stars radius={150} depth={150} count={12000} factor={10} saturation={0} fade speed={4} />
        </group>
    )
}

function App() {
    const { scrollYProgress } = useScroll()

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    })

    return (
        <>
            {/* Scroll tracker with snap points for each section */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '400vh',
                pointerEvents: 'none'
            }}>
                {/* Hero snap point */}
                <div style={{
                    height: '100vh',
                    scrollSnapAlign: 'start',
                    scrollSnapStop: 'always'
                }} />
                {/* About snap point */}
                <div style={{
                    height: '100vh',
                    scrollSnapAlign: 'start',
                    scrollSnapStop: 'always'
                }} />
                {/* Projects snap point */}
                <div style={{
                    height: '100vh',
                    scrollSnapAlign: 'start',
                    scrollSnapStop: 'always'
                }} />
                {/* Contact snap point */}
                <div style={{
                    height: '100vh',
                    scrollSnapAlign: 'start',
                    scrollSnapStop: 'always'
                }} />
            </div>

            {/* Navbar - always visible */}
            <Navbar />

            {/* Fixed Space Background */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            >
                <Canvas
                    gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
                    camera={{ position: [0, 0, 5], fov: 80 }}
                    dpr={[1, 1.5]}
                >
                    <color attach="background" args={['#000000']} />
                    <ScrollStars scrollProgress={smoothProgress} />
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={0.5} color="#E60000" />
                </Canvas>
            </motion.div>

            {/* Space Navigator - Sections transition with opacity only */}
            <SpaceNavigator>
                {[
                    <Hero key="hero" />,
                    <About key="about" />,
                    <Projects key="projects" />,
                    <Contact key="contact" />
                ]}
            </SpaceNavigator>

            {/* Color Picker - Dynamic theme changer */}
            <ColorPicker />
        </>
    )
}

export default App
