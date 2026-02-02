import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import { Suspense, useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';

const HeroScene = () => {
    const [themeColor, setThemeColor] = useState('#E60000');
    const meshRef = useRef();
    const glitchRef = useRef(0);

    useEffect(() => {
        const updateColor = () => {
            const color = getComputedStyle(document.documentElement).getPropertyValue('--color-brand-red').trim();
            if (color) setThemeColor(color);
        };
        updateColor();
        const observer = new MutationObserver(updateColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
        return () => observer.disconnect();
    }, []);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const t = clock.getElapsedTime();

        // Jitter effect using ref to avoid re-renders
        if (Math.sin(t * 15) > 0.98) {
            glitchRef.current = Math.random() * 0.15;
        } else {
            glitchRef.current *= 0.92;
        }

        const g = glitchRef.current;
        if (g > 0.01) {
            meshRef.current.position.set(
                (Math.random() - 0.5) * g,
                (Math.random() - 0.5) * g,
                (Math.random() - 0.5) * g
            );
            meshRef.current.scale.setScalar(8.5 + g);
        } else {
            meshRef.current.position.set(0, 0, 0);
            meshRef.current.scale.setScalar(8.5);
        }

        meshRef.current.rotation.y += 0.002;
    });

    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color={themeColor} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0000ff" />

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
                <mesh ref={meshRef} position={[0, 0, 0]} scale={8.5}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial
                        color={themeColor}
                        wireframe
                        emissive={themeColor}
                        emissiveIntensity={0.6}
                        transparent
                        opacity={0.4}
                    />
                </mesh>
            </Float>

            {/* <EffectComposer>
                <Bloom luminanceThreshold={0.4} intensity={1.5} mipmapBlur />
                <ChromaticAberration offset={[0.002, 0.002]} />
            </EffectComposer> */}
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
                backgroundColor: 'var(--color-brand-red)',
                opacity: showCursor ? 1 : 0
            }}></span>
        </span>
    );
};

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden' }}>
            {/* 3D Object - Full container to prevent clipping */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none'
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', pointerEvents: 'auto', maxWidth: '900px' }}
                >
                    <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-brand-red)',
                        fontFamily: 'var(--font-accent)',
                        letterSpacing: '4px',
                        marginBottom: '1rem',
                        opacity: 0.8
                    }}>
                        [ INITIALIZING SESSION... ]
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        marginBottom: '1rem',
                        color: '#fff',
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '0.05em',
                        lineHeight: '1.1'
                    }}>
                        <TypewriterText text="FATIH NORTHMAN" delay={120} />
                    </h1>

                    <div style={{
                        height: '2px',
                        width: '60px',
                        background: 'var(--color-brand-red)',
                        margin: '1.5rem auto'
                    }} />

                    <h2 style={{
                        fontSize: '1.1rem',
                        color: '#eee',
                        fontWeight: 400,
                        letterSpacing: '2px',
                        marginBottom: '2rem',
                        fontFamily: 'var(--font-accent)'
                    }}>
                        UNITY DEVELOPER & TECHNICAL ARCHITECT
                    </h2>

                    <motion.a
                        href="#projects"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: '0 0 40px var(--color-brand-red)',
                            rotateX: 10,
                            z: 30
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'inline-block',
                            padding: '1rem 2.5rem',
                            background: 'linear-gradient(135deg, var(--color-brand-red), var(--color-brand-red-glow))',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            fontFamily: 'var(--font-display)',
                            border: '2px solid var(--color-brand-red)',
                            boxShadow: '0 0 20px var(--color-brand-red-glow)',
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
