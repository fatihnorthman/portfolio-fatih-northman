import { motion, useTransform, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const sectionIds = ['hero', 'about', 'projects', 'contact'];

const SpaceNavigator = ({ children }) => {
    const { scrollYProgress } = useScroll();
    const [activeSection, setActiveSection] = useState(0);

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 45,
        damping: 25,
        restDelta: 0.0001
    });

    // Sync URL and State with scroll progress
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        const index = Math.round(latest * (children.length - 1));
        if (index !== activeSection) {
            setActiveSection(index);
            const hash = index === 0 ? '#hero' : `#${sectionIds[index]}`;
            window.history.replaceState(null, '', hash);
            // Force hashchange event so Navbar updates instantly
            window.dispatchEvent(new HashChangeEvent('hashchange'));
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

                // Premium Stacking Transforms
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
                    [index, index + 100, index] // Increased zIndex boost for clarity
                );

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
                        }}
                    >
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {child}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default SpaceNavigator;
