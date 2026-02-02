import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <section id="contact" style={{ padding: '6rem 2rem', background: '#080808', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '3rem', marginBottom: '2rem', color: 'white' }}
                >
                    {t('contact.title')}
                </motion.h2>

                <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '3rem' }}>
                    {t('contact.desc')}
                </p>

                <motion.a
                    href="mailto:alkan2798@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'inline-block',
                        padding: '1rem 3rem',
                        background: '#E60000',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-display)',
                        boxShadow: '0 0 20px rgba(230, 0, 0, 0.3)'
                    }}
                >
                    {t('contact.cta')}
                </motion.a>

                <footer style={{ marginTop: '5rem', color: '#444', fontSize: '0.9rem' }}>
                    {t('contact.footer', { year: new Date().getFullYear() })}
                </footer>
            </div>
        </section>
    )
}

export default Contact;
