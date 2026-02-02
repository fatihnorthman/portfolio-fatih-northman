import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { useRef } from 'react';

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
        mass: 0.5,
        restDelta: 0.0001,
        precision: 0.0001
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
                const total = children.length - 1;
                // Wider range for cinematic 'Approaching & Departing' transitions
                const range = [
                    (index - 1) / total,
                    index / total,
                    (index + 1) / total
                ];

                // DEEP 3D TRANSFORMATIONS
                const opacity = useTransform(smoothProgress, range, [0, 1, 0]);
                const scale = useTransform(smoothProgress, range, [0.5, 1, 2]); // Massive scale shift
                const rotateX = useTransform(smoothProgress, range, [60, 0, -60]); // Aggressive tilt
                const translateZ = useTransform(smoothProgress, range, [-1200, 0, 800]); // Infinite depth
                const blur = useTransform(smoothProgress, range, [20, 0, 15]);
                const brightness = useTransform(smoothProgress, range, [0, 1, 0]);
                const yOffset = useTransform(smoothProgress, range, ['50%', '0%', '-50%']); // Fly through effect

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
                            y: yOffset,
                            zIndex: zIndex,
                            visibility: useTransform(opacity, (o) => o <= 0.01 ? 'hidden' : 'visible'),
                            filter: useTransform([blur, brightness], ([b, br]) => `blur(${b}px) brightness(${br})`),
                            pointerEvents: useTransform(opacity, (o) => o > 0.9 ? 'auto' : 'none'),
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
