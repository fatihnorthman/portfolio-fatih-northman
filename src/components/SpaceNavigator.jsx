import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const sectionIds = ['hero', 'about', 'projects', 'contact'];

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 45,  // Increased for stability
        damping: 25,
        restDelta: 0.0001
    });

    const [activeSection, setActiveSection] = useState(0);

    // Explicitly update URL hash on scroll
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        const index = Math.round(latest * (children.length - 1));
        if (index !== activeSection) {
            setActiveSection(index);
            const hash = sectionIds[index] === 'hero' ? '' : `#${sectionIds[index]}`;
            // Use pushState to ensure the URL bar reflects the change immediately
            window.history.pushState(null, '', `${window.location.pathname}${hash}`);
        }
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
                perspective: '2000px', // Deeper perspective context
                pointerEvents: 'none'
            }}
        >
            {children.map((child, index) => {
                const total = children.length - 1;

                // LIGHTWEIGHT: Slide-Over & Plateau System
                // We create a 'dead zone' in the middle of each section where it stays 100% stable
                const range = [
                    (index - 1) / total,
                    (index - 0.4) / total,
                    index / total,
                    (index + 0.4) / total,
                    (index + 1) / total
                ];

                // TRANSFORMATIONS
                // Opacity: Quick fade in, stay solid, quick fade out
                const opacity = useTransform(smoothProgress, range, [0, 1, 1, 1, 0]);

                // Y-Position: Slide up from 100vh to 0, then move very slowly (stacking effect)
                const translateY = useTransform(smoothProgress,
                    [(index - 1) / total, index / total, (index + 1) / total],
                    ['100vh', '0vh', '-10vh']
                );

                // Scale: Shrink as it goes 'under' the next section
                const scale = useTransform(smoothProgress, range, [1, 1, 1, 1, 0.9]);

                // Perspective Tilt
                const rotateX = useTransform(smoothProgress, range, [15, 0, 0, 0, -5]);

                // Background Dimming: Drastically dim and blur sections that are sliding out
                const blur = useTransform(smoothProgress, range, [15, 0, 0, 0, 20]);
                const brightness = useTransform(smoothProgress, range, [0, 1, 1, 1, 0.1]);
                const translateZ = useTransform(smoothProgress, range, [0, 0, 0, 0, -300]);

                // Layering: New sections (higher index) always slide OVER previous ones
                const zIndex = useTransform(smoothProgress,
                    [(index - 0.5) / total, (index + 0.5) / total],
                    [index + 10, index]
                );

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
                            z: translateZ,
                            zIndex,
                            visibility: useTransform(opacity, (o) => o <= 0.01 ? 'hidden' : 'visible'),
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
