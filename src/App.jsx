import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

// Animated Stars that move forward (Z-axis)
function ScrollStars() {
    const starsRef = useRef()

    useFrame(({ clock }) => {
        if (starsRef.current) {
            // Forward motion effect
            starsRef.current.position.z = (clock.getElapsedTime() * 5) % 50 - 25
            starsRef.current.rotation.z = clock.getElapsedTime() * 0.01
        }
    })

    return (
        <group ref={starsRef}>
            <Stars radius={100} depth={100} count={15000} factor={8} saturation={0} fade speed={3} />
        </group>
    )
}

function App() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Z-axis transforms for "moving forward" effect
    const contentZ = useTransform(scrollYProgress, [0, 1], [0, -2000])
    const perspective = useTransform(scrollYProgress, [0, 1], [1000, 1500])

    // Scale for depth perception
    const contentScale = useTransform(scrollYProgress, [0, 1], [1, 1.5])

    // Rotation for immersion
    const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 10])

    return (
        <div
            ref={containerRef}
            style={{
                background: '#000',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                perspective: '1500px',
                transformStyle: 'preserve-3d'
            }}
        >
            <Navbar />

            {/* Deep Space Background - Moving forward */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 0,
                    transformStyle: 'preserve-3d'
                }}
            >
                <Canvas
                    gl={{ antialias: true, alpha: true }}
                    camera={{ position: [0, 0, 5], fov: 75 }}
                >
                    <color attach="background" args={['#000000']} />
                    <ScrollStars />
                    <ambientLight intensity={0.3} />
                </Canvas>
            </motion.div>

            {/* Tunnel effect overlay */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 1,
                    pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(230, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0.8) 100%)',
                    rotateZ,
                }}
            />

            {/* Vignette for depth */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%)',
                boxShadow: 'inset 0 0 300px rgba(0,0,0,0.9)'
            }} />

            {/* Speed lines for forward motion */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 3,
                    pointerEvents: 'none',
                    opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.3, 0.3, 0])
                }}
            >
                {[...Array(30)].map((_, i) => {
                    const angle = (i / 30) * Math.PI * 2
                    const distance = 40 + Math.random() * 10
                    return (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 2, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: 'linear'
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '2px',
                                height: `${Math.random() * 100 + 50}px`,
                                background: 'linear-gradient(to bottom, transparent, rgba(230, 0, 0, 0.8), transparent)',
                                transform: `translate(-50%, -50%) rotate(${angle}rad) translateY(-${distance}vh)`,
                                transformOrigin: 'center',
                                filter: 'blur(1px)'
                            }}
                        />
                    )
                })}
            </motion.div>

            {/* Content with Z-depth */}
            <motion.div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    transformStyle: 'preserve-3d',
                    perspective,
                    scale: contentScale,
                    z: contentZ,
                    willChange: 'transform'
                }}
            >
                <motion.div
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(0)'
                    }}
                >
                    <Hero />

                    {/* Depth marker */}
                    <motion.div
                        style={{
                            height: '300px',
                            background: 'linear-gradient(to bottom, transparent, rgba(230, 0, 0, 0.1), transparent)',
                            position: 'relative',
                            overflow: 'hidden',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.8, 0.3]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '80%',
                                height: '2px',
                                background: 'radial-gradient(ellipse, #E60000, transparent)',
                                boxShadow: '0 0 40px #E60000'
                            }}
                        />
                    </motion.div>

                    <About />

                    {/* Another depth marker */}
                    <motion.div
                        style={{
                            height: '300px',
                            background: 'linear-gradient(to bottom, transparent, rgba(230, 0, 0, 0.1), transparent)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <motion.div
                            animate={{
                                scale: [1.5, 1, 1.5],
                                opacity: [0.8, 0.3, 0.8]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '80%',
                                height: '2px',
                                background: 'radial-gradient(ellipse, #E60000, transparent)',
                                boxShadow: '0 0 40px #E60000'
                            }}
                        />
                    </motion.div>

                    <Projects />
                    <Contact />
                </motion.div>
            </motion.div>

            {/* Foreground particles moving towards viewer */}
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
                {[...Array(40)].map((_, i) => {
                    const startX = Math.random() * 100
                    const startY = Math.random() * 100
                    const centerX = 50
                    const centerY = 50
                    const dirX = startX - centerX
                    const dirY = startY - centerY

                    return (
                        <motion.div
                            key={i}
                            animate={{
                                x: [`${startX}vw`, `${startX + dirX * 2}vw`],
                                y: [`${startY}vh`, `${startY + dirY * 2}vh`],
                                scale: [0, Math.random() * 3 + 2],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 3,
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
