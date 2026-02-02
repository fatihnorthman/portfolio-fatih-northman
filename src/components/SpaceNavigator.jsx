import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

const SpaceNavigator = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

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
                zIndex: 10
            }}
        >
            {/* Render each section centered and fixed - only opacity changes */}
            {children.map((child, index) => {
                // Calculate opacity based on scroll position
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
                            pointerEvents: useTransform(opacity, (o) => o > 0.5 ? 'auto' : 'none'),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {child}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default SpaceNavigator;
