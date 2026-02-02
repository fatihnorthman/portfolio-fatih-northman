import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

// Animated Stars moving towards viewer
function ScrollStars() {
    const starsRef = useRef()

    useFrame(({ clock }) => {
        if (starsRef.current) {
            starsRef.current.position.z = ((clock.getElapsedTime() * 10) % 100) - 50
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
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Smooth spring physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Each section at different Z depths
    const heroZ = useTransform(smoothProgress, [0, 0.25], [0, 1500])
    const aboutZ = useTransform(smoothProgress, [0.25, 0.5], [-1500, 1500])
    const projectsZ = useTransform(smoothProgress, [0.5, 0.75], [-1500, 1500])
    const contactZ = useTransform(smoothProgress, [0.75, 1], [-1500, 1500])

    // Scale for depth perception
    const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 2.5])
    const aboutScale = useTransform(smoothProgress, [0.2, 0.25, 0.5], [0.5, 1, 2.5])
    const projectsScale = useTransform(smoothProgress, [0.45, 0.5, 0.75], [0.5, 1, 2.5])
    const contactScale = useTransform(smoothProgress, [0.7, 0.75, 1], [0.5, 1, 2])

    // Opacity for fade in/out
    const heroOpacity = useTransform(smoothProgress, [0, 0.2, 0.25], [1, 1, 0])
    const aboutOpacity = useTransform(smoothProgress, [0.2, 0.25, 0.45, 0.5], [0, 1, 1, 0])
    const projectsOpacity = useTransform(smoothProgress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0])
    const contactOpacity = useTransform(smoothProgress, [0.7, 0.75, 1], [0, 1, 1])

    return (
        <>
            {/* Scrollable container - this creates the scroll area */}
            <div
                ref={containerRef}
                style={{
                    height: '500vh', // This allows scrolling
                    position: 'relative'
                }}
            >
                {/* Spacer to enable scroll */}
                <div style={{ height: '100%', pointerEvents: 'none' }} />
            </div>

            {/* Fixed viewport for 3D content */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                perspective: '1000px',
                perspectiveOrigin: '50% 50%',
                transformStyle: 'preserve-3d',
                pointerEvents: 'none',
                zIndex: 1
            }}>
                <Navbar />

                {/* Deep Space Background */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0
                    }}
                >
                    <Canvas
                        gl={{ antialias: true, alpha: true }}
                        camera={{ position: [0, 0, 5], fov: 90 }}
                    >
                        <color attach="background" args={['#000000']} />
                        <ScrollStars />
                        <ambientLight intensity={0.2} />
                    </Canvas>
                </div>

                {/* Radial speed lines */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        pointerEvents: 'none',
                        opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 0.5, 0.5, 0])
                    }}
                >
                    {[...Array(50)].map((_, i) => {
                        const angle = (i / 50) * Math.PI * 2
                        return (
                            <motion.div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: '3px',
                                    height: '200vh',
                                    background: 'linear-gradient(to bottom, transparent, rgba(230, 0, 0, 0.6), transparent)',
                                    transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                                    transformOrigin: 'center',
                                    filter: 'blur(2px)',
                                    scale: useTransform(smoothProgress, [0, 1], [1, 3])
                                }}
                            />
                        )
                    })}
                </motion.div>

                {/* Tunnel vignette */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.95) 100%)',
                    boxShadow: 'inset 0 0 400px rgba(0,0,0,0.9)'
                }} />

                {/* Content layers at different Z depths */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    transformStyle: 'preserve-3d',
                    pointerEvents: 'auto'
                }}>
                    {/* Hero Section */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            translateZ: heroZ,
                            scale: heroScale,
                            opacity: heroOpacity,
                            willChange: 'transform, opacity'
                        }}
                    >
                        <Hero />
                    </motion.div>

                    {/* About Section */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            translateZ: aboutZ,
                            scale: aboutScale,
                            opacity: aboutOpacity,
                            willChange: 'transform, opacity'
                        }}
                    >
                        <About />
                    </motion.div>

                    {/* Projects Section */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            translateZ: projectsZ,
                            scale: projectsScale,
                            opacity: projectsOpacity,
                            willChange: 'transform, opacity'
                        }}
                    >
                        <Projects />
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            translateZ: contactZ,
                            scale: contactScale,
                            opacity: contactOpacity,
                            willChange: 'transform, opacity'
                        }}
                    >
                        <Contact />
                    </motion.div>
                </div>

                {/* Particles flying towards viewer */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 20,
                        pointerEvents: 'none'
                    }}
                >
                    {[...Array(60)].map((_, i) => {
                        const startX = (Math.random() - 0.5) * 100
                        const startY = (Math.random() - 0.5) * 100
                        const speed = Math.random() * 2 + 1

                        return (
                            <motion.div
                                key={i}
                                animate={{
                                    x: ['50%', `${50 + startX * 3}%`],
                                    y: ['50%', `${50 + startY * 3}%`],
                                    scale: [0, Math.random() * 4 + 2],
                                    opacity: [0, 0.8, 0]
                                }}
                                transition={{
                                    duration: speed,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: 'easeOut'
                                }}
                                style={{
                                    position: 'absolute',
                                    width: Math.random() * 6 + 3 + 'px',
                                    height: Math.random() * 6 + 3 + 'px',
                                    background: Math.random() > 0.5 ? '#E60000' : '#fff',
                                    borderRadius: '50%',
                                    boxShadow: `0 0 ${Math.random() * 20 + 15}px ${Math.random() > 0.5 ? '#E60000' : '#fff'}`,
                                    filter: 'blur(1px)'
                                }}
                            />
                        )
                    })}
                </motion.div>
            </div>
        </>
    )
}

export default App
