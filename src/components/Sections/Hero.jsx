import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Suspense, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const HeroScene = () => {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#E60000" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0000ff" />

            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
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
                bottom: '0.1em',
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

    // Sphere zoom effect: shrinks and fades when scrolling down
    const sphereScale = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const sphereOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const sphereZ = useTransform(scrollYProgress, [0, 0.2], [0, -500]);

    return (
        <section style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
            {/* 3D Object */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    scale: sphereScale,
                    opacity: sphereOpacity,
                    z: sphereZ
                }}
            >
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <Suspense fallback={null}>
                        <HeroScene />
                    </Suspense>
                </Canvas>
            </motion.div>

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

                    {/* Founder Byline */}
                    <p style={{
                        color: '#888',
                        fontSize: '1rem',
                        marginBottom: '3rem',
                        fontFamily: 'var(--font-body)',
                        letterSpacing: '2px'
                    }}>
                        {t('hero.founder')} <span style={{ color: 'white', fontWeight: 600 }}>Fatih Northman</span>
                    </p>

                    <button style={{
                        padding: '1rem 3rem',
                        fontSize: '1.1rem',
                        background: 'transparent',
                        border: '1px solid #E60000',
                        color: 'white',
                        fontFamily: 'var(--font-display)',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#E60000';
                            e.target.style.boxShadow = '0 0 20px #E60000';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        {t('hero.cta')}
                    </button>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
