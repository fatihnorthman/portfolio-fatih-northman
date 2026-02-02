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

    // Parallax for background layers
    const layer1Y = useTransform(smoothProgress, [0, 1], [0, -200])
    const layer2Y = useTransform(smoothProgress, [0, 1], [0, -400])
    const layer3Y = useTransform(smoothProgress, [0, 1], [0, -600])

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

            {/* Parallax Layer 1 - Distant particles */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 1,
                    y: layer1Y,
                    pointerEvents: 'none'
                }}
            >
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`layer1-${i}`}
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '3px',
                            height: '3px',
                            background: '#fff',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px #fff'
                        }}
                    />
                ))}
            </motion.div>

            {/* Parallax Layer 2 - Mid-distance stars */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 2,
                    y: layer2Y,
                    pointerEvents: 'none'
                }}
            >
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`layer2-${i}`}
                        animate={{
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{
                            duration: Math.random() * 4 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '5px',
                            height: '5px',
                            background: Math.random() > 0.7 ? '#E60000' : '#fff',
                            borderRadius: '50%',
                            boxShadow: `0 0 15px ${Math.random() > 0.7 ? '#E60000' : '#fff'}`
                        }}
                    />
                ))}
            </motion.div>

            {/* Parallax Layer 3 - Close particles */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 3,
                    y: layer3Y,
                    pointerEvents: 'none'
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`layer3-${i}`}
                        animate={{
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 2, 1]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '8px',
                            height: '8px',
                            background: '#E60000',
                            borderRadius: '50%',
                            boxShadow: '0 0 25px #E60000',
                            filter: 'blur(2px)'
                        }}
                    />
                ))}
            </motion.div>

            {/* Atmospheric depth fog */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 4,
                    pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)',
                    opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.5, 1, 0.5])
                }}
            />

            {/* Space Navigator - Sections transition diagonally */}
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
