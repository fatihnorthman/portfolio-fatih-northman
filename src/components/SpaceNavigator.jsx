import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const sectionIds = ['hero', 'about', 'projects', 'contact'];

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 25,  // Very slow and premium easing tail
        damping: 15,
        mass: 0.8,
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
                const range = [
                    (index - 1) / total,
                    index / total,
                    (index + 1) / total
                ];

                // LIGHTWEIGHT: STACKING TRANSITION
                // New sections slide in OVER the old ones
                const opacity = useTransform(smoothProgress, range, [0, 1, 1]); // Stays visible when passed?
                const translateY = useTransform(smoothProgress, range, ['100vh', '0vh', '-20vh']); // Slides up and slightly away
                const scale = useTransform(smoothProgress, range, [1, 1, 0.9]); // Subtle shrink as it goes back
                const blur = useTransform(smoothProgress, range, [10, 0, 5]);
                const brightness = useTransform(smoothProgress, range, [0.5, 1, 0.4]);
                const rotateX = useTransform(smoothProgress, range, [10, 0, 0]);

                // Dynamic Z-Index for stacking: higher progress sections stay above lower ones when entering
                const zIndex = useTransform(smoothProgress,
                    [range[0], range[1], range[2]],
                    [index, index + 10, index]
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
                            zIndex,
                            visibility: useTransform(opacity, (o) => o <= 0.01 ? 'hidden' : 'visible'),
                            filter: useTransform([blur, brightness], ([b, br]) => `blur(${b}px) brightness(${br})`),
                            pointerEvents: useTransform(opacity, (o) => o > 0.7 ? 'auto' : 'none'),
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
