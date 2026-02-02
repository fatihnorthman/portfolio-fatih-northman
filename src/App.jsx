import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

// Animated Stars that respond to scroll
function ScrollStars() {
    const starsRef = useRef()

    useFrame(({ clock }) => {
        if (starsRef.current) {
            starsRef.current.rotation.y = clock.getElapsedTime() * 0.02
            starsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1
        }
    })

    return (
        <group ref={starsRef}>
            <Stars radius={100} depth={80} count={10000} factor={6} saturation={0} fade speed={2} />
        </group>
    )
}

function App() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Parallax transforms for different layers
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -500])
    const midgroundY = useTransform(scrollYProgress, [0, 1], [0, -300])
    const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

    // Rotation for 3D depth
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

    return (
        <div ref={containerRef} style={{ background: '#000', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <Navbar />

            {/* Deep Space Background - Slowest parallax */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 0,
                    y: backgroundY
                }}
            >
                <Canvas gl={{ antialias: true, alpha: true }}>
                    <color attach="background" args={['#000000']} />
                    <ScrollStars />
                    <ambientLight intensity={0.3} />
                </Canvas>
            </motion.div>

            {/* Mid-layer: Floating particles */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 1,
                    pointerEvents: 'none',
                    y: midgroundY,
                    opacity: 0.4
                }}
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 20% 30%, rgba(230, 0, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(230, 0, 0, 0.08) 0%, transparent 50%)',
                }} />
            </motion.div>

            {/* Vignette & Atmospheric effects */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
                boxShadow: 'inset 0 0 200px rgba(0,0,0,0.9)'
            }} />

            {/* Scanlines for retro-futuristic feel */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0.03,
                background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
            }} />

            {/* Content with depth and parallax */}
            <motion.div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    y: foregroundY,
                    rotateX,
                    scale,
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                }}
            >
                <Hero />

                {/* Depth separator */}
                <motion.div
                    style={{
                        height: '200px',
                        background: 'linear-gradient(to bottom, transparent, rgba(230, 0, 0, 0.05), transparent)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <motion.div
                        animate={{
                            x: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            width: '200%',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, #E60000, transparent)',
                            boxShadow: '0 0 20px #E60000'
                        }}
                    />
                </motion.div>

                <About />

                {/* Another depth separator */}
                <motion.div
                    style={{
                        height: '200px',
                        background: 'linear-gradient(to bottom, transparent, rgba(230, 0, 0, 0.05), transparent)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <motion.div
                        animate={{
                            x: ['100%', '-100%'],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            width: '200%',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, #E60000, transparent)',
                            boxShadow: '0 0 20px #E60000'
                        }}
                    />
                </motion.div>

                <Projects />
                <Contact />
            </motion.div>

            {/* Foreground particles */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 15,
                    pointerEvents: 'none',
                    y: useTransform(scrollYProgress, [0, 1], [0, 200])
                }}
            >
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [Math.random() * window.innerHeight, -100],
                            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: 'linear'
                        }}
                        style={{
                            position: 'absolute',
                            width: Math.random() * 3 + 1 + 'px',
                            height: Math.random() * 3 + 1 + 'px',
                            background: Math.random() > 0.7 ? '#E60000' : '#fff',
                            borderRadius: '50%',
                            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() > 0.7 ? '#E60000' : '#fff'}`
                        }}
                    />
                ))}
            </motion.div>
        </div>
    )
}

export default App
