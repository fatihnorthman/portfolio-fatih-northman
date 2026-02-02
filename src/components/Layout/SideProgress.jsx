import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SideProgress = () => {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const sections = [
        { id: '00', name: 'HERO' },
        { id: '01', name: 'ABOUT' },
        { id: '02', name: 'PROJECTS' },
        { id: '03', name: 'CONTACT' }
    ];

    return (
        <div style={{
            position: 'fixed',
            left: '30px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            zIndex: 100,
            pointerEvents: 'none'
        }}>
            {/* Top Static Line */}
            <div style={{
                width: '1px',
                height: '60px',
                background: 'linear-gradient(to top, var(--color-brand-red), transparent)',
                opacity: 0.5
            }} />

            {/* Section Indicators */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                position: 'relative'
            }}>
                {sections.map((section, index) => {
                    const total = sections.length - 1;
                    const sectionProgress = index / total;

                    const opacity = useTransform(smoothProgress,
                        [sectionProgress - 0.1, sectionProgress, sectionProgress + 0.1],
                        [0.25, 1, 0.25]
                    );

                    const scale = useTransform(smoothProgress,
                        [sectionProgress - 0.1, sectionProgress, sectionProgress + 0.1],
                        [0.8, 1.3, 0.8]
                    );

                    return (
                        <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative' }}>
                            <motion.div
                                style={{
                                    width: '20px',
                                    height: '3px',
                                    background: 'var(--color-brand-red)',
                                    opacity,
                                    scaleX: scale,
                                    boxShadow: '0 0 20px var(--color-brand-red)'
                                }}
                            />
                            <motion.span
                                style={{
                                    position: 'absolute',
                                    left: '28px',
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: '800',
                                    fontSize: '1rem',
                                    color: 'var(--color-brand-red)',
                                    letterSpacing: '3px',
                                    opacity,
                                    whiteSpace: 'nowrap',
                                    textShadow: '0 0 15px var(--color-brand-red)'
                                }}
                            >
                                {section.id}
                            </motion.span>
                        </div>
                    );
                })}

                {/* Vertical Moving Progress Line (The Connector) */}
                <div style={{
                    position: 'absolute',
                    left: '9px',
                    top: 0,
                    width: '2px',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    zIndex: -1
                }} />

                <motion.div
                    style={{
                        position: 'absolute',
                        left: '9px',
                        top: 0,
                        width: '2px',
                        height: '100%',
                        background: 'var(--color-brand-red)',
                        scaleY: smoothProgress,
                        transformOrigin: 'top',
                        boxShadow: '0 0 30px var(--color-brand-red)'
                    }}
                />
            </div>

            {/* Bottom Static Line */}
            <div style={{
                width: '1px',
                height: '60px',
                background: 'linear-gradient(to bottom, var(--color-brand-red), transparent)',
                opacity: 0.5
            }} />
        </div>
    );
};

export default SideProgress;
