import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect, memo, useRef } from 'react';

// Helper component to display motion value as text to avoid parent re-renders
const NumberDisplay = memo(({ value }) => {
    const ref = useRef(null);

    useEffect(() => {
        const unsubscribe = value.on("change", (latest) => {
            if (ref.current) {
                ref.current.innerText = `${Math.round(latest * 100)}%`;
            }
        });
        return () => unsubscribe();
    }, [value]);

    return <span ref={ref}>0%</span>;
});

NumberDisplay.displayName = 'NumberDisplay';

const EnergyBars = memo(() => {
    const { scrollYProgress } = useScroll();
    const [systemPower, setSystemPower] = useState(100);

    // Smooth scroll-based energy
    const scrollEnergy = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30
    });

    // Pulsing system power
    useEffect(() => {
        const interval = setInterval(() => {
            setSystemPower(prev => {
                const newValue = prev + (Math.random() - 0.5) * 5;
                return Math.max(85, Math.min(100, newValue));
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 101,
                fontFamily: 'var(--font-accent)',
                fontSize: '0.65rem',
                color: 'var(--color-brand-red)',
                letterSpacing: '1px',
                pointerEvents: 'none',
                userSelect: 'none',
                willChange: 'opacity, transform'
            }}
        >
            <div style={{
                background: 'rgba(10, 10, 10, 0.85)',
                padding: '16px',
                border: '1px solid var(--color-brand-red)',
                borderRadius: '4px',
                boxShadow: '0 0 20px rgba(255, 60, 60, 0.3)',
                minWidth: '200px'
            }}>
                {/* Header */}
                <div style={{
                    marginBottom: '12px',
                    opacity: 0.6,
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(255, 60, 60, 0.2)',
                    paddingBottom: '8px'
                }}>
                    [ ENERGY CORE ]
                </div>

                {/* System Power Bar */}
                <div style={{ marginBottom: '12px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '4px',
                        opacity: 0.8
                    }}>
                        <span>SYSTEM PWR</span>
                        <span>{Math.round(systemPower)}%</span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255, 60, 60, 0.3)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <motion.div
                            animate={{ width: `${systemPower}%` }}
                            transition={{ duration: 0.5 }}
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--color-brand-red), #ff6b6b)',
                                boxShadow: '0 0 10px var(--color-brand-red)',
                                position: 'relative'
                            }}
                        >
                            {/* Animated shine effect */}
                            <motion.div
                                animate={{
                                    x: ['-100%', '200%']
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '50%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
                                }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Neural Link Bar (scroll-based) */}
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '4px',
                        opacity: 0.8
                    }}>
                        <span>NEURAL LINK</span>
                        <NumberDisplay value={scrollEnergy} />
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(60, 200, 255, 0.3)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <motion.div
                            style={{
                                height: '100%',
                                width: '100%', // Use transform scale for performance
                                scaleX: scrollEnergy,
                                transformOrigin: 'left',
                                background: 'linear-gradient(90deg, #00d4ff, #0099ff)',
                                boxShadow: '0 0 10px #00d4ff'
                            }}
                        >
                            {/* Animated shine effect */}
                            <motion.div
                                animate={{
                                    x: ['-100%', '200%']
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: 0.5
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '50%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
                                }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Status indicators */}
                <div style={{
                    marginTop: '12px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255, 60, 60, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-around',
                    fontSize: '0.6rem'
                }}>
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ color: '#00ff00' }}
                    >
                        ● STABLE
                    </motion.span>
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        style={{ color: '#ffaa00' }}
                    >
                        ⚡ ACTIVE
                    </motion.span>
                </div>
            </div>
        </motion.div>
    );
});

EnergyBars.displayName = 'EnergyBars';

export default EnergyBars;
