import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Suspense, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const HeroScene = () => {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#E60000" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0000ff" />

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
                <mesh position={[0, 0, 0]} scale={2.0}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        color="#E60000"
                        wireframe
                        emissive="#E60000"
                        emissiveIntensity={0.2}
                    />
                </mesh>
            </Float>
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

    return (
        <section style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
            {/* 3D Object - Fixed centered, no scroll effects */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '450px',
                height: '450px',
                zIndex: 0
            }}>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Suspense fallback={null}>
                        <HeroScene />
                    </Suspense>
                </Canvas>
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
                        fontFamily: 'var(--font-display)',
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
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-accent)'
                    }}>
                        SAĞINIZLI OYUN GELİŞTİRME STÜDYOSU
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#ccc',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
                        lineHeight: '1.6',
                        fontFamily: 'var(--font-body)'
                    }}>
                        Unity ile profesyonel oyun geliştirme çözümleri sunuyoruz
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
                            fontFamily: 'var(--font-display)',
                            border: '2px solid #E60000',
                            boxShadow: '0 0 20px rgba(230, 0, 0, 0.5)',
                            cursor: 'pointer',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        STÜDYO İŞLERİNİ GÖR
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
