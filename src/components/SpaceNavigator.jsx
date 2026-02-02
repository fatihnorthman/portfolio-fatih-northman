import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef } from 'react';

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Define positions for each section transition
    const sectionPositions = [
        { x: 0, y: 0, rotation: 0, scale: 1 },           // Hero
        { x: -35, y: 20, rotation: -4, scale: 1 },       // About
        { x: 40, y: -15, rotation: 3, scale: 1 },        // Projects
        { x: -25, y: 30, rotation: -3, scale: 1 }        // Contact
    ];

    // Calculate container transform for diagonal movement
    const rawX = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [
            sectionPositions[0].x,
            sectionPositions[1].x,
            sectionPositions[2].x,
            sectionPositions[3].x,
            sectionPositions[3].x
        ]
    );

    const rawY = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [
            sectionPositions[0].y,
            sectionPositions[1].y,
            sectionPositions[2].y,
            sectionPositions[3].y,
            sectionPositions[3].y
        ]
    );

    const rawRotation = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [
            sectionPositions[0].rotation,
            sectionPositions[1].rotation,
            sectionPositions[2].rotation,
            sectionPositions[3].rotation,
            sectionPositions[3].rotation
        ]
    );

    // Spring physics for smooth movement
    const x = useSpring(rawX, { stiffness: 80, damping: 25 });
    const y = useSpring(rawY, { stiffness: 80, damping: 25 });
    const rotation = useSpring(rawRotation, { stiffness: 80, damping: 25 });

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
                perspective: '2000px',
                zIndex: 10
            }}
        >
            <motion.div
                style={{
                    x: useTransform(x, (value) => `${value}vw`),
                    y: useTransform(y, (value) => `${value}vh`),
                    rotate: rotation,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    width: '100vw',
                    height: '100vh',
                    position: 'relative'
                }}
            >
                {/* Render each section with opacity based on scroll */}
                {children.map((child, index) => {
                    const opacity = useTransform(
                        scrollYProgress,
                        [
                            (index - 0.1) / 4,
                            index / 4,
                            (index + 0.9) / 4,
                            (index + 1.1) / 4
                        ],
                        [0, 1, 1, 0]
                    );

                    const scale = useTransform(
                        scrollYProgress,
                        [
                            (index - 0.1) / 4,
                            index / 4,
                            (index + 1) / 4
                        ],
                        [0.8, 1, 0.8]
                    );

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
                                pointerEvents: useTransform(opacity, (o) => o > 0.5 ? 'auto' : 'none'),
                                scrollSnapAlign: 'start'
                            }}
                        >
                            {child}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default SpaceNavigator;
