import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { useRef } from 'react';

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 250, // Extremely stiff for immediate reaction
        damping: 50,   // High damping to eliminate any oscillation
        restDelta: 0.000001,
        precision: 0.000001
    });

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                zIndex: 10,
                background: 'transparent',
                perspective: '1500px',
                pointerEvents: 'none' // Critical: Allow scroll events to pass through to the ghost area
            }}
        >
            {/* Render each section centered and fixed with cinematic 3D transitions */}
            {children.map((child, index) => {
                // Very narrow range for an aggressive 'hard snap'
                const range = [
                    (index - 0.3) / (children.length - 1),
                    index / (children.length - 1),
                    (index + 0.3) / (children.length - 1)
                ];

                // Advanced 3D Transformations with strict clamping to prevent bleed-through
                const opacity = useTransform(smoothProgress, range, [0, 1, 0], { clamp: true });
                const scale = useTransform(smoothProgress, range, [0.8, 1, 1.2], { clamp: true });
                const rotateX = useTransform(smoothProgress, range, [15, 0, -15], { clamp: true });
                const translateZ = useTransform(smoothProgress, range, [-300, 0, 300], { clamp: true });
                const blur = useTransform(smoothProgress, range, [8, 0, 4], { clamp: true });
                const brightness = useTransform(smoothProgress, range, [0.2, 1, 0.4], { clamp: true });

                // Track Z-Index: Active section should be on top
                const zIndex = useTransform(opacity, [0.5, 1], [0, 10]);

                const isHero = index === 0;

                return (
                    <motion.div
                        key={index}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity,
                            scale,
                            rotateX,
                            z: translateZ,
                            zIndex: zIndex,
                            visibility: useTransform(opacity, (o) => o <= 0 ? 'hidden' : 'visible'),
                            filter: useTransform([blur, brightness], ([b, br]) => `blur(${b}px) brightness(${br})`),
                            pointerEvents: useTransform(opacity, (o) => o > 0.8 ? 'auto' : 'none'),
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transformStyle: 'preserve-3d',
                            transformOrigin: 'center center',
                            backfaceVisibility: 'hidden'
                        }}
                    >
                        <motion.div
                            style={{
                                width: '100%',
                                maxWidth: isHero ? 'none' : '1200px',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transformStyle: 'preserve-3d',
                                padding: isHero ? '0' : '4rem 1rem',
                                boxSizing: 'border-box'
                            }}
                        >
                            {child}
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default SpaceNavigator;
