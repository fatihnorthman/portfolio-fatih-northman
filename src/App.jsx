import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, useGLTF, Float, Environment, ContactShadows } from '@react-three/drei'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef, Suspense, useEffect, useState } from 'react'
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';
import SpaceNavigator from './components/SpaceNavigator';
import ColorPicker from './components/ColorPicker/ColorPicker';
import HUDIcons from './components/Layout/HUDIcons';

// Simple model loader that prevents crash if model fails
function FloatingModel({ scrollProgress }) {
    // Try to load but wrap in try/catch-like behavior via Suspense
    const { scene } = useGLTF('/gameboy.glb', true)
    const meshRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        const scrollValue = scrollProgress.get()

        if (meshRef.current) {
            meshRef.current.position.y = Math.sin(t * 0.4) * 0.15
            meshRef.current.rotation.x = scrollValue * Math.PI * 1.5
            meshRef.current.rotation.y = t * 0.15 + scrollValue * Math.PI
            const s = 1.1 + Math.sin(scrollValue * Math.PI) * 0.2
            meshRef.current.scale.set(s, s, s)
            meshRef.current.position.x = Math.cos(scrollValue * Math.PI) * 1.5
        }
    })

    return (
        <primitive
            object={scene}
            ref={meshRef}
            position={[1.5, 0, -3]}
            scale={1}
            castShadow
        />
    )
}

function App() {
    const { scrollYProgress } = useScroll()
    const [color, setColor] = useState('#E60000')

    useEffect(() => {
        const updateColor = () => {
            const val = getComputedStyle(document.documentElement).getPropertyValue('--color-brand-red').trim();
            if (val) setColor(val);
        };
        updateColor();
        const observer = new MutationObserver(updateColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
        return () => observer.disconnect();
    }, []);

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <div style={{ background: '#050505', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
            {/* Scroll Area */}
            <div style={{ height: '400vh', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
                <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
                <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
                <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
            </div>

            <Navbar />

            {/* Background 3D Layer */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 10], fov: 45 }}
                    gl={{ antialias: false, powerPreference: "high-performance" }}
                >
                    <Suspense fallback={null}>
                        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                        <FloatingModel scrollProgress={smoothProgress} />
                        <ambientLight intensity={0.8} />
                        <Environment preset="city" />
                        <pointLight position={[5, 5, 5]} intensity={2} color={color} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Foreground Content */}
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
