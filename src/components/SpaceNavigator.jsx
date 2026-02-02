import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { useRef } from 'react';

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 30, // More weighted
        damping: 18,
        restDelta: 0.00001,
        precision: 0.00001,
        restSpeed: 0.00001
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
                background: 'transparent', // Allow background stars to show
                perspective: '1500px' // Unified perspective
            }}
        >
            {/* Render each section centered and fixed with cinematic 3D transitions */}
            {children.map((child, index) => {
                const range = [
                    (index - 0.7) / (children.length - 1),
                    index / (children.length - 1),
                    (index + 0.7) / (children.length - 1)
                ];

                // Advanced 3D Transformations with smooth spring progress
                const opacity = useTransform(smoothProgress, range, [0, 1, 0]);
                const scale = useTransform(smoothProgress, range, [0.85, 1, 1.15]);
                const rotateX = useTransform(smoothProgress, range, [20, 0, -20]);
                const translateZ = useTransform(smoothProgress, range, [-400, 0, 300]);
                const blur = useTransform(smoothProgress, range, [4, 0, 2]);
                const brightness = useTransform(smoothProgress, range, [0.5, 1, 0.6]);

                const isHero = index === 0;

                // Enhanced stability: Force zero transforms when at the target section
                const stableScale = useTransform(smoothProgress, [range[0], range[1], range[2]], [0.85, 1, 1.15]);
                const stableRotateX = useTransform(smoothProgress, [range[0], range[1], range[2]], [20, 0, -20]);
                const stableZ = useTransform(smoothProgress, [range[0], range[1], range[2]], [-400, 0, 300]);

                return (
                    <motion.div
                        key={index}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity,
                            scale: stableScale,
                            rotateX: stableRotateX,
                            z: stableZ,
                            filter: useTransform([blur, brightness], ([b, br]) => `blur(${b}px) brightness(${br})`),
                            pointerEvents: useTransform(opacity, (o) => o > 0.85 ? 'auto' : 'none'),
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
                                maxWidth: isHero ? 'none' : '1400px',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transformStyle: 'preserve-3d',
                                padding: isHero ? '0' : '5vh 1rem',
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
