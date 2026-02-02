import { motion } from 'framer-motion';

const CornerBrackets = () => {
    const bracketStyle = {
        position: 'absolute',
        width: '40px',
        height: '40px',
        border: '2px solid var(--color-brand-red)',
        pointerEvents: 'none'
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none' }}>
            {/* Top Left */}
            <motion.div
                style={{
                    ...bracketStyle,
                    top: '20px',
                    left: '20px',
                    borderRight: 'none',
                    borderBottom: 'none'
                }}
                animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            {/* Top Right */}
            <motion.div
                style={{
                    ...bracketStyle,
                    top: '20px',
                    right: '20px',
                    borderLeft: 'none',
                    borderBottom: 'none'
                }}
                animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5
                }}
            />

            {/* Bottom Left */}
            <motion.div
                style={{
                    ...bracketStyle,
                    bottom: '20px',
                    left: '20px',
                    borderRight: 'none',
                    borderTop: 'none'
                }}
                animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                }}
            />

            {/* Bottom Right */}
            <motion.div
                style={{
                    ...bracketStyle,
                    bottom: '20px',
                    right: '20px',
                    borderLeft: 'none',
                    borderTop: 'none'
                }}
                animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5
                }}
            />
        </div>
    );
};

export default CornerBrackets;
