import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { useRef } from 'react';

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60, // Faster settling
        damping: 25,
        restDelta: 0.00001,
        precision: 0.00001
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

                // Ensure perfect centering for Hero (index 0) at scroll 0
                const isHero = index === 0;

                return (
                    <motion.div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity,
                            scale: isHero ? useTransform(smoothProgress, [0, 0.1], [1, 1.05]) : scale,
                            rotateX: isHero ? useTransform(smoothProgress, [0, 0.1], [0, -5]) : rotateX,
                            z: isHero ? useTransform(smoothProgress, [0, 0.1], [0, 50]) : translateZ,
                            filter: useTransform([blur, brightness], ([b, br]) => `blur(${b}px) brightness(${br})`),
                            pointerEvents: useTransform(opacity, (o) => o > 0.8 ? 'auto' : 'none'),
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <motion.div
                            style={{
                                width: '100%',
                                maxWidth: '1400px',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transformStyle: 'preserve-3d',
                                padding: isHero ? 0 : '6rem 1rem'
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
