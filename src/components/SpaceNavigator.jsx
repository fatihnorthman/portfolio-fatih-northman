import { motion, useTransform, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const sectionIds = ['hero', 'about', 'projects', 'contact'];

const SpaceNavigator = ({ children }) => {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 45,
        damping: 25,
        restDelta: 0.0001
    });

    const [activeSection, setActiveSection] = useState(0);

    // Sync URL with scroll progress
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        const index = Math.round(latest * (children.length - 1));
        if (index !== activeSection) {
            setActiveSection(index);
            const hash = index === 0 ? '' : `#${sectionIds[index]}`;
            window.history.pushState(null, '', `${window.location.pathname}${hash}`);
        }
    });

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            background: 'transparent',
            pointerEvents: 'none',
            perspective: '2000px'
        }}>
            {children.map((child, index) => {
                const total = children.length - 1;
                const range = [
                    (index - 1) / total,
                    (index - 0.4) / total,
                    index / total,
                    (index + 0.4) / total,
                    (index + 1) / total
                ];

                // TRANSFORMATIONS
                const opacity = useTransform(smoothProgress, range, [0, 1, 1, 1, 0]);
                const translateY = useTransform(smoothProgress,
                    [(index - 1) / total, index / total, (index + 1) / total],
                    ['100vh', '0vh', '-15vh']
                );
                const scale = useTransform(smoothProgress, range, [1, 1, 1, 1, 0.92]);
                const rotateX = useTransform(smoothProgress, range, [15, 0, 0, 0, -5]);
                const blur = useTransform(smoothProgress, range, [15, 0, 0, 0, 10]);
                const brightness = useTransform(smoothProgress, range, [0, 1, 1, 1, 0.1]);
                const translateZ = useTransform(smoothProgress, range, [0, 0, 0, 0, -200]);

                const zIndex = useTransform(smoothProgress,
                    [range[0], range[2], range[4]],
                    [index, index + 20, index]
                );

                const isHero = index === 0;

                return (
                    <motion.div
                        key={index}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity,
                            y: translateY,
                            z: translateZ,
                            scale,
                            rotateX,
                            zIndex,
                            visibility: useTransform(opacity, (o) => o <= 0.01 ? 'hidden' : 'visible'),
                            filter: useTransform([blur, brightness], ([b, br]) => `blur(${b}px) brightness(${br})`),
                            pointerEvents: useTransform(opacity, (o) => o > 0.8 ? 'auto' : 'none'),
                            transformStyle: 'preserve-3d',
                            transformOrigin: 'center center'
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
