import { motion } from 'framer-motion';
import { useState, useEffect, memo } from 'react';

const DataStream = memo(() => {
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        const generateStream = () => {
            const chars = '01';
            // Optimization: Use a slightly more efficient string generation if length was huge, but for 20 it's fine.
            let result = '';
            for (let i = 0; i < 20; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };

        const interval = setInterval(() => {
            setStreams(prev => {
                // Optimization: Limit the array size strictly to avoid memory growth, 
                // though slice(-8) already handles it.
                // We'll increment a counter for ID to ensure uniqueness even if interval was faster.
                const nextId = Date.now() + Math.random();
                const newStreams = [...prev, {
                    id: nextId,
                    text: generateStream(),
                    delay: Math.random() * 2
                }];
                return newStreams.length > 8 ? newStreams.slice(newStreams.length - 8) : newStreams;
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            right: '30px',
            top: '200px',
            bottom: '100px',
            width: '30px',
            zIndex: 1,
            pointerEvents: 'none',
            overflow: 'hidden',
            opacity: 0.15
        }}>
            {streams.map((stream) => (
                <motion.div
                    key={stream.id}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 600, opacity: [0, 1, 0] }}
                    transition={{
                        duration: 8,
                        delay: stream.delay,
                        ease: 'linear'
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        fontFamily: 'monospace',
                        fontSize: '10px',
                        color: 'var(--color-brand-red)',
                        writingMode: 'vertical-rl',
                        letterSpacing: '2px',
                        textShadow: '0 0 5px var(--color-brand-red)',
                        willChange: 'transform, opacity'
                    }}
                >
                    {stream.text}
                </motion.div>
            ))}
        </div>
    );
});

DataStream.displayName = 'DataStream';

export default DataStream;
