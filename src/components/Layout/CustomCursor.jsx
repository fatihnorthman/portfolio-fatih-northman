import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useCallback, memo } from 'react';

const CustomCursor = memo(() => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 15, stiffness: 1000, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isPointer, setIsPointer] = useState(false);

    const moveCursor = useCallback((e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        // Check if hovering over interactive element
        const target = e.target;
        // Optimization: Accessing getComputedStyle can be expensive. 
        // We might want to throttle this check or check for specific tags/classes instead.
        // For now, let's keep it but ensure it doesn't block main thread too much.
        // Also a simple tag check is faster.
        const isClickable = window.getComputedStyle(target).cursor === 'pointer' || target.tagName === 'A' || target.tagName === 'BUTTON';
        setIsPointer(isClickable);
    }, [cursorX, cursorY]);

    useEffect(() => {
        window.addEventListener('mousemove', moveCursor, { passive: true });
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [moveCursor]);

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            zIndex: 9999,
            willChange: 'transform' // Hint browser for composition
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
                    rotate: isPointer ? 45 : 0,
                    willChange: 'transform'
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
                    scale: isPointer ? 0.5 : 1,
                    willChange: 'transform'
                }}
            />
        </div>
    );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
