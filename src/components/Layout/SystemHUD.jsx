import { motion } from 'framer-motion';
import { useState, useEffect, memo, useRef } from 'react';

const SystemHUD = memo(() => {
    const [fps, setFps] = useState(60);
    const [time, setTime] = useState('');
    const [scrollPercent, setScrollPercent] = useState(0);

    // FPS Loop
    useEffect(() => {
        let frameId;
        let lastTime = performance.now();
        let frames = 0;

        const measureFPS = () => {
            frames++;
            const currentTime = performance.now();
            if (currentTime >= lastTime + 1000) {
                setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
                frames = 0;
                lastTime = currentTime;
            }
            frameId = requestAnimationFrame(measureFPS);
        };
        measureFPS();

        return () => cancelAnimationFrame(frameId);
    }, []);

    // Time Loop
    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        };
        updateTime(); // Initial
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Scroll Loop - Throttled with RAF
    useEffect(() => {
        let ticking = false;

        const updateScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollPercent(Math.round(scrolled));
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            style={{
                position: 'fixed',
                top: '80px',
                right: '30px',
                zIndex: 101,
                fontFamily: 'var(--font-accent)',
                fontSize: '0.7rem',
                color: 'var(--color-brand-red)',
                letterSpacing: '1px',
                textAlign: 'right',
                pointerEvents: 'none',
                userSelect: 'none'
            }}
        >
            <div style={{
                background: 'rgba(10, 10, 10, 0.8)',
                padding: '12px 16px',
                border: '1px solid var(--color-brand-red)',
                borderRadius: '4px',
                boxShadow: '0 0 20px rgba(255, 60, 60, 0.3)'
            }}>
                <div style={{ marginBottom: '8px', opacity: 0.6 }}>[ SYSTEM STATUS ]</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '4px' }}>
                    <span style={{ opacity: 0.7 }}>FPS:</span>
                    <motion.span
                        animate={{ color: fps < 30 ? '#ff0000' : 'var(--color-brand-red)' }}
                    >
                        {fps}
                    </motion.span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '4px' }}>
                    <span style={{ opacity: 0.7 }}>SCROLL:</span>
                    <span>{scrollPercent}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                    <span style={{ opacity: 0.7 }}>TIME:</span>
                    <span>{time}</span>
                </div>
                <motion.div
                    style={{
                        marginTop: '8px',
                        paddingTop: '8px',
                        borderTop: '1px solid rgba(255, 60, 60, 0.3)',
                        textAlign: 'center'
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    ● ONLINE
                </motion.div>
            </div>
        </motion.div>
    );
});

SystemHUD.displayName = 'SystemHUD';

export default SystemHUD;
