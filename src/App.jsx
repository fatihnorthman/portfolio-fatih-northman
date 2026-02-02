import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

// Animated Stars with 3D depth based on scroll
function ScrollStars({ scrollProgress }) {
    const starsRef = useRef()

    useFrame(({ clock }) => {
        if (starsRef.current) {
            // Forward motion
            starsRef.current.position.z = ((clock.getElapsedTime() * 8) % 80) - 40

            // Scroll-based rotation for 3D depth
            const scrollValue = scrollProgress.get()
            starsRef.current.rotation.x = scrollValue * Math.PI * 0.5
            starsRef.current.rotation.y = scrollValue * Math.PI * 0.3
            starsRef.current.rotation.z = clock.getElapsedTime() * 0.02
        }
    })

    return (
        <group ref={starsRef}>
            <Stars radius={120} depth={120} count={15000} factor={8} saturation={0} fade speed={3} />
        </group>
    )
}

function App() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll()

    // Parallax effects for depth
    const starsY = useTransform(scrollYProgress, [0, 1], [0, -300])
    const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

    return (
        <div ref={containerRef} style={{ background: '#000', minHeight: '100vh', position: 'relative' }}>
            <Navbar />

            {/* Deep Space Background with 3D depth */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 0,
                    y: starsY
                }}
            >
                <Canvas
                    gl={{ antialias: true, alpha: true }}
                    camera={{ position: [0, 0, 5], fov: 75 }}
                >
                    <color attach="background" args={['#000000']} />
                    <ScrollStars scrollProgress={scrollYProgress} />
                    <ambientLight intensity={0.3} />
                </Canvas>
            </motion.div>

            {/* Radial speed lines */}
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
                {[...Array(40)].map((_, i) => {
                    const angle = (i / 40) * Math.PI * 2
                    return (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '2px',
                                height: '150vh',
                                background: 'linear-gradient(to bottom, transparent, rgba(230, 0, 0, 0.4), transparent)',
                                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                                transformOrigin: 'center',
                                filter: 'blur(1px)',
                                opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.4, 0.4, 0])
                            }}
                        />
                    )
                })}
            </div>

            {/* Tunnel vignette */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 2,
                pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.9) 100%)',
                boxShadow: 'inset 0 0 300px rgba(0,0,0,0.8)'
            }} />

            {/* Content with scale effect */}
            <motion.div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    scale: contentScale
                }}
            >
                <Hero />
                <About />
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
                    pointerEvents: 'none'
                }}
            >
                {[...Array(30)].map((_, i) => {
                    const startX = (Math.random() - 0.5) * 100
                    const startY = (Math.random() - 0.5) * 100
                    const speed = Math.random() * 2 + 1.5

                    return (
                        <motion.div
                            key={i}
                            animate={{
                                x: ['50%', `${50 + startX * 2}%`],
                                y: ['50%', `${50 + startY * 2}%`],
                                scale: [0, Math.random() * 3 + 1.5],
                                opacity: [0, 0.7, 0]
                            }}
                            transition={{
                                duration: speed,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: 'easeOut'
                            }}
                            style={{
                                position: 'absolute',
                                width: Math.random() * 4 + 2 + 'px',
                                height: Math.random() * 4 + 2 + 'px',
                                background: Math.random() > 0.6 ? '#E60000' : '#fff',
                                borderRadius: '50%',
                                boxShadow: `0 0 ${Math.random() * 15 + 10}px ${Math.random() > 0.6 ? '#E60000' : '#fff'}`,
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
