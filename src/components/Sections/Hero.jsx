import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Suspense } from 'react'
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

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </group>
    )
}

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
            {/* 3D Object - Background stars are now in App.jsx */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 5] }}>
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
                        background: 'linear-gradient(to right, #fff, #aaa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 30px rgba(230, 0, 0, 0.3)'
                    }}>
                        {t('hero.title')}
                    </h1>
                    <h2 style={{
                        fontSize: '1.5rem',
                        color: '#E60000',
                        fontWeight: 400,
                        letterSpacing: '4px',
                        marginBottom: '1rem' // Reduced margin to fit byline
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
