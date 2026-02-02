import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(newLang);
    };

    const [currentHash, setCurrentHash] = useState(window.location.hash || '#hero');

    useEffect(() => {
        const handleHashChange = () => setCurrentHash(window.location.hash || '#hero');
        // Monitor hash changes from scroll sync
        window.addEventListener('popstate', handleHashChange);
        window.addEventListener('hashchange', handleHashChange);

        // Polling as a fallback for hash replacement which doesn't trigger events
        const interval = setInterval(handleHashChange, 500);

        return () => {
            window.removeEventListener('popstate', handleHashChange);
            window.removeEventListener('hashchange', handleHashChange);
            clearInterval(interval);
        };
    }, []);

    const menuItems = [
        { id: 'hero', label: 'Ana Sayfa', section: 0 },
        { id: 'about', label: 'Hakkımızda', section: 1 },
        { id: 'projects', label: 'Projeler', section: 2 },
        { id: 'contact', label: 'İletişim', section: 3 }
    ];

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
                background: 'rgba(10, 10, 10, 0.4)',
                backdropFilter: 'blur(10px)',
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
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
                                y: [0, -1, 1, 0],
                                transition: { duration: 0.2, repeat: Infinity }
                            }
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none' }}>
                    {menuItems.map((item) => {
                        const isActive = currentHash === (item.id === 'hero' ? '#hero' : `#${item.id}`) ||
                            (currentHash === '' && item.id === 'hero');

                        return (
                            <li key={item.id}>
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const vh = window.innerHeight;
                                        window.scrollTo({ top: item.section * vh, behavior: 'smooth' });
                                    }}
                                    style={{
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        color: isActive ? 'var(--color-brand-red)' : 'var(--color-text-muted)',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer',
                                        letterSpacing: '1px',
                                        position: 'relative',
                                        display: 'inline-block'
                                    }}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-4px',
                                                left: 0,
                                                width: '100%',
                                                height: '2px',
                                                background: 'var(--color-brand-red)'
                                            }}
                                        />
                                    )}
                                </a>
                            </li>
                        );
                    })}
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
