import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef } from 'react';

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Define positions for each section (Hero, About, Projects, Contact)
    // Each position is a percentage of viewport width/height
    const sectionPositions = [
        { x: 0, y: 0, rotation: 0 },           // Hero - center start
        { x: -25, y: 15, rotation: -3 },       // About - diagonal left-down
        { x: 30, y: -10, rotation: 2 },        // Projects - right-up
        { x: -15, y: 25, rotation: -2 }        // Contact - left-down
    ];

    // Map scroll progress to section index
    // 0-0.25: Hero, 0.25-0.5: About, 0.5-0.75: Projects, 0.75-1: Contact
    const sectionIndex = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [0, 1, 2, 3, 3]
    );

    // Calculate X position based on scroll
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

    // Calculate Y position based on scroll
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

    // Calculate rotation based on scroll
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

    // Apply spring physics for smooth movement
    const x = useSpring(rawX, { stiffness: 100, damping: 30 });
    const y = useSpring(rawY, { stiffness: 100, damping: 30 });
    const rotation = useSpring(rawRotation, { stiffness: 100, damping: 30 });

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
                perspective: '1000px'
            }}
        >
            <motion.div
                style={{
                    x: useTransform(x, (value) => `${value}vw`),
                    y: useTransform(y, (value) => `${value}vh`),
                    rotate: rotation,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform'
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default SpaceNavigator;
