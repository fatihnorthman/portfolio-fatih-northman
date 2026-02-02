import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '1.5rem 3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 100,
                background: 'rgba(5, 5, 5, 0.5)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}
        >
            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'white' }}>
                FN<span style={{ color: 'var(--color-brand-red)' }}>.</span>
            </div>

            <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none' }}>
                {['Projects', 'Skills', 'About', 'Contact'].map((item) => (
                    <li key={item}>
                        <a href={`#${item.toLowerCase()}`} style={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: 'var(--color-text-muted)',
                            transition: 'color 0.3s',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--color-brand-red)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </motion.nav>
    );
};

export default Navbar;
