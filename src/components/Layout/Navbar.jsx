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
                background: 'rgba(5, 5, 5, 0.5)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}
        >
            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'white' }}>
                NORTH PROTOCOL<span style={{ color: 'var(--color-brand-red)' }}>.</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none' }}>
                    {['projects', 'skills', 'about', 'contact'].map((item) => (
                        <li key={item}>
                            <a href={`#${item}`} style={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: 'var(--color-text-muted)',
                                transition: 'color 0.3s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => e.target.style.color = 'var(--color-brand-red)'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                            >
                                {t(`navbar.${item}`)}
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
