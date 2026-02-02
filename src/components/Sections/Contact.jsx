import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 80,
            rotateX: -60,
            z: -250,
            scale: 0.7
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            z: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 18
            }
        }
    };

    const socialVariants = {
        hidden: {
            opacity: 0,
            scale: 0,
            rotateY: -180
        },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.5 + i * 0.15
            }
        })
    };

    return (
        <section
            id="contact"
            style={{
                width: '100%',
                padding: '4rem 1rem',
                position: 'relative',
                perspective: '2000px',
                transformStyle: 'preserve-3d'
            }}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center',
                    transformStyle: 'preserve-3d'
                }}
            >
                <motion.h2
                    variants={itemVariants}
                    style={{
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        color: 'var(--color-brand-red)',
                        fontFamily: 'var(--font-display)',
                    }}
                >
                    03. İLETİŞİM KANALLARI
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    style={{
                        fontSize: '0.9rem',
                        color: '#eee',
                        marginBottom: '3rem',
                        lineHeight: '1.6',
                        fontWeight: 500
                    }}
                >
                    Yeni projeler, iş birlikleri veya sadece merhaba demek için.
                </motion.p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '4rem'
                }}>
                    <motion.div
                        variants={itemVariants}
                        style={{
                            padding: '1.5rem',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '4px',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{ color: 'var(--color-brand-red)', fontSize: '0.7rem', marginBottom: '0.5rem' }}>E-POSTA</div>
                        <a href="mailto:alkan2798@gmail.com" style={{ fontSize: '1.1rem', color: '#fff' }}>alkan2798@gmail.com</a>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        style={{
                            padding: '1.5rem',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '4px',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{ color: 'var(--color-brand-red)', fontSize: '0.7rem', marginBottom: '0.5rem' }}>LOKASYON</div>
                        <div style={{ fontSize: '1.1rem', color: '#fff' }}>Sivas, Türkiye</div>
                    </motion.div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                    {[
                        { name: 'GitHub', icon: '💻', url: 'https://github.com' },
                        { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
                        { name: 'X', icon: '🐦', url: 'https://x.com' }
                    ].map((social, i) => (
                        <motion.a
                            key={social.name}
                            variants={socialVariants}
                            custom={i}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontSize: '1.5rem',
                                opacity: 0.6,
                                transition: 'opacity 0.3s'
                            }}
                            whileHover={{ opacity: 1, y: -2 }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    variants={itemVariants}
                    style={{
                        marginTop: '4rem',
                        padding: '2rem',
                        background: 'rgba(10, 10, 10, 0.6)',
                        borderRadius: '12px',
                        border: '1px solid var(--color-brand-red-glow)',
                        backdropFilter: 'blur(10px)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <p style={{ color: '#fff', opacity: 0.8, fontSize: '0.9rem' }}>
                        © 2026 Fatih Northman. Tüm hakları saklıdır.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Contact;
