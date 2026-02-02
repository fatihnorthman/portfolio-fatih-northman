import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

// Animated Stars with enhanced 3D depth
function ScrollStars({ scrollProgress }) {
    const starsRef = useRef()

    useFrame(({ clock }) => {
        if (starsRef.current) {
            // Forward motion
            starsRef.current.position.z = ((clock.getElapsedTime() * 10) % 100) - 50

            // Scroll-based 3D rotation for depth
            const scrollValue = scrollProgress.get()
            starsRef.current.rotation.x = scrollValue * Math.PI * 0.8
            starsRef.current.rotation.y = scrollValue * Math.PI * 0.5
            starsRef.current.rotation.z = clock.getElapsedTime() * 0.03 + scrollValue * Math.PI * 0.2
        }
    })

    return (
        <group ref={starsRef}>
            <Stars radius={150} depth={150} count={20000} factor={10} saturation={0} fade speed={4} />
        </group>
    )
}

function App() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll()

    // Smooth spring physics for buttery smooth animations
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    })

    // Enhanced parallax layers
    const starsY = useTransform(smoothProgress, [0, 1], [0, -500])
    const starsScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1])

    // Content animations
    const contentScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.08, 1])
    const contentRotateX = useTransform(smoothProgress, [0, 0.5, 1], [0, 2, 0])

    return (
        <div ref={containerRef} style={{ background: '#000', minHeight: '100vh', position: 'relative' }}>
            <Navbar />

            {/* Deep Space Background - Covers entire page */}
            <motion.div
                style={{
                    position: 'absolute', // Changed from fixed to absolute
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%', // Covers full content height
                    zIndex: 0,
                    y: starsY,
                    scale: starsScale
                }}
            >
                <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
                    <Canvas
                        gl={{ antialias: true, alpha: true }}
                        camera={{ position: [0, 0, 5], fov: 80 }}
                    >
                        <color attach="background" args={['#000000']} />
                        <ScrollStars scrollProgress={smoothProgress} />
                        <ambientLight intensity={0.3} />
                        <pointLight position={[10, 10, 10]} intensity={0.5} color="#E60000" />
                    </Canvas>
                </div>
            </motion.div>

            {/* Enhanced radial speed lines */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            >
                {[...Array(60)].map((_, i) => {
                    const angle = (i / 60) * Math.PI * 2
                    return (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '3px',
                                height: '200vh',
                                background: `linear-gradient(to bottom, transparent, rgba(${Math.random() > 0.7 ? '230, 0, 0' : '255, 255, 255'}, ${Math.random() * 0.3 + 0.2}), transparent)`,
                                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                                transformOrigin: 'center',
                                filter: 'blur(1.5px)',
                                opacity: useTransform(smoothProgress, [0, 0.1, 0.5, 0.9, 1], [0, 0.5, 0.7, 0.5, 0]),
                                scale: useTransform(smoothProgress, [0, 1], [1, 2])
                            }}
                        />
                    )
                })}
            </div>

            {/* Floating nebula clouds */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 1,
                    pointerEvents: 'none',
                    opacity: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.3, 0.5, 0.5, 0.3])
                }}
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: '40%',
                        height: '40%',
                        background: 'radial-gradient(circle, rgba(230, 0, 0, 0.15) 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }}
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '10%',
                        width: '50%',
                        height: '50%',
                        background: 'radial-gradient(circle, rgba(230, 0, 0, 0.1) 0%, transparent 70%)',
                        filter: 'blur(80px)'
                    }}
                />
            </motion.div>

            {/* Enhanced tunnel vignette */}
            <motion.div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 2,
                pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, transparent 0%, transparent 25%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.95) 100%)',
                boxShadow: 'inset 0 0 400px rgba(0,0,0,0.9)',
                opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8])
            }} />

            {/* Content with enhanced 3D transforms */}
            <motion.div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    scale: contentScale,
                    rotateX: contentRotateX,
                    transformStyle: 'preserve-3d',
                    perspective: '1500px'
                }}
            >
                <Hero />
                <About />
                <Projects />
                <Contact />
            </motion.div>

            {/* Enhanced foreground particles */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 15,
                    pointerEvents: 'none'
                }}
            >
                {[...Array(50)].map((_, i) => {
                    const startX = (Math.random() - 0.5) * 120
                    const startY = (Math.random() - 0.5) * 120
                    const speed = Math.random() * 2.5 + 1.5
                    const size = Math.random() * 5 + 2
                    const isRed = Math.random() > 0.65

                    return (
                        <motion.div
                            key={i}
                            animate={{
                                x: ['50%', `${50 + startX * 2.5}%`],
                                y: ['50%', `${50 + startY * 2.5}%`],
                                scale: [0, Math.random() * 4 + 2],
                                opacity: [0, 0.8, 0]
                            }}
                            transition={{
                                duration: speed,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                                ease: 'easeOut'
                            }}
                            style={{
                                position: 'absolute',
                                width: size + 'px',
                                height: size + 'px',
                                background: isRed ? '#E60000' : '#fff',
                                borderRadius: '50%',
                                boxShadow: `0 0 ${Math.random() * 20 + 15}px ${isRed ? '#E60000' : '#fff'}`,
                                filter: 'blur(1px)'
                            }}
                        />
                    )
                })}
            </motion.div>
        </div>
    )
}

export default App
