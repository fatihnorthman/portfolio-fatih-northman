import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 15, stiffness: 1000, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Check if hovering over interactive element
            const target = e.target;
            const isClickable = window.getComputedStyle(target).cursor === 'pointer';
            setIsPointer(isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            zIndex: 9999,
        }}>
            {/* Main Crosshair */}
            <motion.div
                style={{
                    width: 32,
                    height: 32,
                    border: '1px solid var(--color-brand-red)',
                    borderRadius: isPointer ? '50%' : '2px',
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isPointer ? 1.5 : 1,
                    rotate: isPointer ? 45 : 0
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '4px',
                    height: '4px',
                    background: 'var(--color-brand-red)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)'
                }} />
            </motion.div>

            {/* Trailing Ring */}
            <motion.div
                style={{
                    width: 12,
                    height: 12,
                    background: 'var(--color-brand-red)',
                    borderRadius: '50%',
                    opacity: 0.3,
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isPointer ? 0.5 : 1
                }}
            />
        </div>
    );
};

export default CustomCursor;
