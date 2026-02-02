import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

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
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll()

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    })

    // Enhanced parallax with more dramatic depth
    const starsY = useTransform(smoothProgress, [0, 1], [0, -800])
    const starsScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.3, 1])
    const starsRotateZ = useTransform(smoothProgress, [0, 1], [0, 15])

    // Multi-layer parallax for depth
    const layer1Y = useTransform(smoothProgress, [0, 1], [0, -200])
    const layer2Y = useTransform(smoothProgress, [0, 1], [0, -400])
    const layer3Y = useTransform(smoothProgress, [0, 1], [0, -600])

    // Content depth transforms
    const contentScale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [1, 1.12, 1.12, 1])
    const contentRotateX = useTransform(smoothProgress, [0, 0.5, 1], [0, 3, 0])
    const contentZ = useTransform(smoothProgress, [0, 0.5, 1], [0, 100, 0])

    return (
        <div ref={containerRef} style={{ background: '#000', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <Navbar />

            {/* Deep Space Background - Fixed for smooth scrolling */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    y: starsY,
                    scale: starsScale,
                    rotateZ: starsRotateZ
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
                {[...Array(15)].map((_, i) => (
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
                {[...Array(20)].map((_, i) => (
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
                {[...Array(10)].map((_, i) => (
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

            {/* Floating nebula clouds */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 5,
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
                        filter: 'blur(60px)',
                        willChange: 'transform, opacity'
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
                        filter: 'blur(80px)',
                        willChange: 'transform, opacity'
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
                zIndex: 6,
                pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, transparent 0%, transparent 25%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.95) 100%)',
                boxShadow: 'inset 0 0 400px rgba(0,0,0,0.9)',
                opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8])
            }} />

            {/* Content */}
            <motion.div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    scale: contentScale,
                    rotateX: contentRotateX,
                    z: contentZ,
                    transformStyle: 'preserve-3d',
                    perspective: '1500px'
                }}
            >
                <Hero />
                <About />
                <Projects />
                <Contact />
            </motion.div>

            {/* Optimized foreground particles */}
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
                {[...Array(30)].map((_, i) => {
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
                                filter: 'blur(1px)',
                                willChange: 'transform, opacity'
                            }}
                        />
                    )
                })}
            </motion.div>
        </div>
    )
}

export default App
