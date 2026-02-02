import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Suspense, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const HeroScene = () => {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#E60000" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0000ff" />

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
                <mesh position={[0, 0, 0]} scale={2.5}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        color="#E60000"
                        wireframe
                        emissive="#E60000"
                        emissiveIntensity={0.2}
                    />
                </mesh>
            </Float>

            <OrbitControls enableZoom={false} enablePan={false} enabled={false} />
        </group>
    )
}

// Typewriter effect with horizontal underline cursor (Linux terminal style)
const TypewriterText = ({ text, delay = 150 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <span style={{ position: 'relative', display: 'inline-block' }}>
            {displayText}
            <span style={{
                position: 'absolute',
                bottom: '-0.1em',
                right: '-0.7em',
                width: '0.6em',
                height: '0.15em',
                backgroundColor: '#E60000',
                opacity: showCursor ? 1 : 0
            }}></span>
        </span>
    );
};

const Hero = () => {
    const { t } = useTranslation();
    const { scrollYProgress } = useScroll();

    // Sphere zoom effect with smooth spring physics
    const sphereScale = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [1, 0]),
        { stiffness: 100, damping: 30 }
    );
    const sphereOpacity = useSpring(
        useTransform(scrollYProgress, [0, 0.15], [1, 0]),
        { stiffness: 100, damping: 30 }
    );
    const sphereZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0, -500]),
        { stiffness: 100, damping: 30 }
    );

    return (
        <section style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
            {/* 3D Object - Centered with fixed dimensions */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 0
            }}>
                <motion.div
                    style={{
                        width: '600px',
                        height: '600px',
                        scale: sphereScale,
                        opacity: sphereOpacity,
                        z: sphereZ,
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <Canvas
                        camera={{ position: [0, 0, 5], fov: 50 }}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <Suspense fallback={null}>
                            <HeroScene />
                        </Suspense>
                    </Canvas>
                </motion.div>
            </div>

            {/* Content Overlay */}
            <div style={{
                position: 'absolute',
                zIndex: 1,
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 2rem',
                pointerEvents: 'none'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', pointerEvents: 'auto' }}
                >
                    <h1 style={{
                        fontSize: '5rem',
                        marginBottom: '1rem',
                        color: '#fff',
                        fontFamily: 'var(--font-body)',
                        textShadow: '0 0 30px rgba(230, 0, 0, 0.5)',
                        letterSpacing: '0.1em',
                        lineHeight: '1.2'
                    }}>
                        <TypewriterText text="NORTH PROTOCOL" delay={150} />
                    </h1>
                    <h2 style={{
                        fontSize: '1.5rem',
                        color: '#E60000',
                        fontWeight: 400,
                        letterSpacing: '4px',
                        marginBottom: '1rem'
                    }}>
                        {t('hero.subtitle')}
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#ccc',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
                        lineHeight: '1.6'
                    }}>
                        {t('hero.description')}
                    </p>
                    <motion.a
                        href="#projects"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: '0 0 40px rgba(230, 0, 0, 0.8)',
                            rotateX: 10,
                            z: 30
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'inline-block',
                            padding: '1rem 2.5rem',
                            background: 'linear-gradient(135deg, #E60000, #ff4444)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            border: '2px solid #E60000',
                            boxShadow: '0 0 20px rgba(230, 0, 0, 0.5)',
                            cursor: 'pointer',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {t('hero.cta')}
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
