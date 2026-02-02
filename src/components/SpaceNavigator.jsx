import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { useRef } from 'react';

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,  // Lower stiffness for "Lightweight" graceful deceleration
        damping: 30,
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
                background: 'transparent',
                perspective: '1200px',
                pointerEvents: 'none'
            }}
        >
            {children.map((child, index) => {
                const total = children.length - 1;
                const range = [
                    (index - 1) / total,
                    index / total,
                    (index + 1) / total
                ];

                // LIGHTWEIGHT INSPIRED TRANSITIONS: Stacked Depth
                const opacity = useTransform(smoothProgress, range, [0, 1, 0]);
                const scale = useTransform(smoothProgress, range, [0.95, 1, 1.05]);
                const translateY = useTransform(smoothProgress, range, ['15vh', '0vh', '-15vh']);
                const rotateX = useTransform(smoothProgress, range, [10, 0, -10]);
                const blur = useTransform(smoothProgress, range, [10, 0, 5]);
                const brightness = useTransform(smoothProgress, range, [0.3, 1, 0.3]);

                // Track Z-Index: Active section should be on top
                const zIndex = useTransform(opacity, [0.1, 1], [0, 10]);

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
                            y: translateY,
                            zIndex,
                            visibility: useTransform(opacity, (o) => o <= 0.01 ? 'hidden' : 'visible'),
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
