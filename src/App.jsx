import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, useGLTF, Float, Environment, ContactShadows } from '@react-three/drei'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef, Suspense, useEffect } from 'react'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';
import SpaceNavigator from './components/SpaceNavigator';
import ColorPicker from './components/ColorPicker/ColorPicker';
import HUDIcons from './components/Layout/HUDIcons';

// Optimized Animated Stars
function ScrollStars({ scrollProgress }) {
    const starsRef = useRef()

    useFrame(({ clock }) => {
        if (starsRef.current) {
            starsRef.current.position.z = ((clock.getElapsedTime() * 2) % 100) - 50
            const scrollValue = scrollProgress.get()
            starsRef.current.rotation.x = scrollValue * Math.PI * 0.2
            starsRef.current.rotation.y = scrollValue * Math.PI * 0.1
        }
    })

    return (
        <group ref={starsRef}>
            <Stars radius={150} depth={150} count={5000} factor={6} saturation={0} fade speed={1} />
        </group>
    )
}

function FloatingModel({ scrollProgress }) {
    const { scene } = useGLTF('/gameboy.glb')
    const meshRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        const scrollValue = scrollProgress.get()

        if (meshRef.current) {
            // Constant subtle float
            meshRef.current.position.y = Math.sin(t * 0.5) * 0.2

            // Scroll-driven rotation
            meshRef.current.rotation.x = scrollValue * Math.PI * 2
            meshRef.current.rotation.y = t * 0.2 + scrollValue * Math.PI
            meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.1

            // Dynamic scaling based on scroll
            const s = 1.2 + Math.sin(scrollValue * Math.PI) * 0.3
            meshRef.current.scale.set(s, s, s)

            // Move it slightly left/right based on scroll
            meshRef.current.position.x = Math.cos(scrollValue * Math.PI) * 2
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <primitive
                object={scene}
                ref={meshRef}
                position={[2, 0, -2]}
                scale={1.5}
                castShadow
            />
        </Float>
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
        <div style={{ background: '#050505', minHeight: '100vh', width: '100%' }}>
            {/* Scroll Area - Physically allows scrolling */}
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
                    shadows
                    gl={{ antialias: true, alpha: true }}
                    camera={{ position: [0, 0, 8], fov: 50 }}
                >
                    <Suspense fallback={null}>
                        <ScrollStars scrollProgress={smoothProgress} />
                        <FloatingModel scrollProgress={smoothProgress} />

                        {/* Improved Lighting System */}
                        <ambientLight intensity={1} />
                        <Environment preset="city" />
                        <hemisphereLight intensity={1} groundColor="black" />
                        <pointLight position={[10, 10, 10]} intensity={5} color="var(--color-brand-red)" />
                        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow />

                        <ContactShadows
                            position={[0, -4, 0]}
                            opacity={0.4}
                            scale={20}
                            blur={2}
                            far={4.5}
                        />
                    </Suspense>
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
            <ColorPicker />
        </div>
    )
}

export default App
