import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef } from 'react';

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Define MORE DRAMATIC positions for each section
    // Increased offsets for more visible diagonal movement
    const sectionPositions = [
        { x: 0, y: 0, rotation: 0 },           // Hero - center start
        { x: -40, y: 25, rotation: -5 },       // About - diagonal left-down
        { x: 45, y: -20, rotation: 4 },        // Projects - right-up  
        { x: -30, y: 35, rotation: -3 }        // Contact - left-down
    ];

    // Map scroll progress to section positions with smoother transitions
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

    // Apply spring physics for smooth, weighty movement
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
                    height: '100vh'
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default SpaceNavigator;
