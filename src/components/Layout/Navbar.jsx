import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(newLang);
    };

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
                background: 'transparent',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}
        >
            <motion.div
                style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    color: 'white',
                    display: 'flex',
                    cursor: 'pointer'
                }}
                whileHover="hover"
            >
                {"NORTH PROTOCOL".split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 + 0.5 }}
                        variants={{
                            hover: {
                                color: 'var(--color-brand-red)',
                                y: [0, -2, 2, 0],
                                transition: { duration: 0.2, repeat: Infinity }
                            }
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{ color: 'var(--color-brand-red)' }}
                >
                    .
                </motion.span>
            </motion.div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none' }}>
                    {[
                        { id: 'hero', label: 'Ana Sayfa', section: 0 },
                        { id: 'about', label: 'Hakkımızda', section: 1 },
                        { id: 'projects', label: 'Projeler', section: 2 },
                        { id: 'contact', label: 'İletişim', section: 3 }
                    ].map((item) => (
                        <li key={item.id}>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    const vh = window.innerHeight;
                                    window.scrollTo({ top: item.section * vh, behavior: 'smooth' });
                                }}
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: 'var(--color-text-muted)',
                                    transition: 'color 0.3s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.target.style.color = 'var(--color-brand-red)'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={toggleLanguage}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--color-brand-red)',
                        color: 'white',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'var(--color-brand-red)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                    }}
                >
                    {i18n.language === 'en' ? 'TR' : 'EN'}
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
