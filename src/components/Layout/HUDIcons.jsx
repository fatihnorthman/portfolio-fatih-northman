import { motion } from 'framer-motion';

const HUDIcons = () => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '40px',
            left: '40px',
            zIndex: 6,
            display: 'flex',
            gap: '2rem',
            pointerEvents: 'none',
            opacity: 0.6
        }}>
            {/* Technical Diagram Icon */}
            <svg width="60" height="40" viewBox="0 0 60 40">
                <motion.path
                    d="M 5 5 L 25 5 L 25 35 L 5 35"
                    fill="none"
                    stroke="var(--color-brand-red)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.path
                    d="M 35 5 L 55 5 L 55 35 L 35 35"
                    fill="none"
                    stroke="var(--color-brand-red)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                />
                <motion.rect
                    x="28" y="18" width="4" height="4"
                    fill="var(--color-brand-red)"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </svg>

            {/* Matrix / Grid Status */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 4px)', gap: '4px' }}>
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            width: '4px',
                            height: '4px',
                            background: 'var(--color-brand-red)',
                            borderRadius: '1px'
                        }}
                        animate={{
                            opacity: [0.1, 0.8, 0.1],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1
                        }}
                    />
                ))}
            </div>

            {/* Coordinate / Compass Element */}
            <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        width: '100%',
                        height: '1px',
                        background: 'var(--color-brand-red)',
                        opacity: 0.3
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        width: '1px',
                        height: '100%',
                        background: 'var(--color-brand-red)',
                        opacity: 0.3
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '30px',
                    height: '30px',
                    border: '1px solid var(--color-brand-red)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.2
                }} />
            </div>

            {/* Barcode / Data Stream */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '20px' }}>
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            width: '2px',
                            background: 'var(--color-brand-red)',
                            height: '100%'
                        }}
                        animate={{
                            height: ['20%', '100%', '40%']
                        }}
                        transition={{
                            duration: 0.5 + Math.random(),
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HUDIcons;
