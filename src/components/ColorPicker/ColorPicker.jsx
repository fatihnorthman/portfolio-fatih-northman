import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ColorPicker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(
        localStorage.getItem('themeColor') || '#E60000'
    );

    const colors = [
        { name: 'Kırmızı', value: '#E60000' },
        { name: 'Turuncu', value: '#FF6B00' },
        { name: 'Sarı', value: '#FFD700' },
        { name: 'Yeşil', value: '#00FF88' },
        { name: 'Mavi', value: '#0088FF' },
        { name: 'Mor', value: '#8800FF' },
        { name: 'Pembe', value: '#FF0088' },
        { name: 'Cyan', value: '#00FFFF' }
    ];

    useEffect(() => {
        // Apply color to CSS variables
        document.documentElement.style.setProperty('--color-brand-red', selectedColor);
        document.documentElement.style.setProperty('--color-brand-red-glow', `${selectedColor}80`);
        localStorage.setItem('themeColor', selectedColor);
    }, [selectedColor]);

    return (
        <div style={{
            position: 'fixed',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000
        }}>
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: selectedColor,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    boxShadow: `0 0 20px ${selectedColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'white',
                    fontFamily: 'var(--font-display)'
                }}
            >
                🎨
            </motion.button>

            {/* Color Options */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{
                            position: 'absolute',
                            right: '60px',
                            top: '0',
                            background: 'rgba(10, 10, 10, 0.95)',
                            borderRadius: '12px',
                            padding: '15px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                            minWidth: '180px'
                        }}
                    >
                        <p style={{
                            color: 'white',
                            fontSize: '0.9rem',
                            marginBottom: '10px',
                            fontFamily: 'var(--font-display)',
                            textAlign: 'center'
                        }}>
                            TEMA RENGİ
                        </p>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '10px'
                        }}>
                            {colors.map((color) => (
                                <motion.button
                                    key={color.value}
                                    onClick={() => {
                                        setSelectedColor(color.value);
                                        setIsOpen(false);
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        background: color.value,
                                        border: selectedColor === color.value
                                            ? '3px solid white'
                                            : '2px solid rgba(255, 255, 255, 0.2)',
                                        cursor: 'pointer',
                                        boxShadow: `0 0 15px ${color.value}`,
                                        transition: 'all 0.3s'
                                    }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ColorPicker;
