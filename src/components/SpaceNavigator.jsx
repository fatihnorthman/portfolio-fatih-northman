import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Apply spring physics for more "realistic" and weighted movement
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.0001
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
                background: '#000',
                perspective: '1200px' // Cinematic perspective
            }}
        >
            {/* Render each section centered and fixed with cinematic 3D transitions */}
            {children.map((child, index) => {
                const range = [
                    (index - 0.8) / (children.length - 1),
                    index / (children.length - 1),
                    (index + 0.8) / (children.length - 1)
                ];

                // Advanced 3D Transformations with smooth spring progress
                const opacity = useTransform(smoothProgress, range, [0, 1, 0]);
                const scale = useTransform(smoothProgress, range, [0.7, 1, 1.3]);
                const rotateX = useTransform(smoothProgress, range, [30, 0, -30]);
                const translateZ = useTransform(smoothProgress, range, [-800, 0, 400]);
                const blur = useTransform(smoothProgress, range, [10, 0, 5]);

                // Realistic Shading/Fog: Dims content as it goes into distance or moves away
                const brightness = useTransform(smoothProgress, range, [0.2, 1, 0.4]);

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
                            scale,
                            rotateX,
                            z: translateZ,
                            filter: useTransform(blur, (b) => `blur(${b}px) brightness(${brightness.get()})`),
                            pointerEvents: useTransform(opacity, (o) => o > 0.6 ? 'auto' : 'none'),
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            padding: '6rem 0',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <motion.div
                            style={{
                                width: '100%',
                                maxWidth: '1200px',
                                transformStyle: 'preserve-3d',
                                // Subtle tilt based on movement could be added here
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
