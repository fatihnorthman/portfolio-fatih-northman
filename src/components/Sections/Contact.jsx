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
                padding: '8rem 2rem',
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
                        fontSize: '3.5rem',
                        marginBottom: '2rem',
                        background: 'linear-gradient(135deg, #fff, #E60000)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 40px rgba(230, 0, 0, 0.3)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    GELECEĞİ İNŞA EDEL İM
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    style={{
                        fontSize: '1.2rem',
                        color: '#ccc',
                        marginBottom: '3rem',
                        lineHeight: '1.8',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    Bir sonraki projeniz için bizimle iletişime geçin. Harika bir şeyler yaratmaya hazırız!
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    whileHover={{
                        scale: 1.1,
                        rotateY: 5,
                        z: 50,
                        boxShadow: '0 30px 80px rgba(230, 0, 0, 0.6)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'inline-block',
                        padding: '1.5rem 4rem',
                        fontSize: '1.3rem',
                        background: 'linear-gradient(135deg, #E60000, #ff4444)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontFamily: 'var(--font-display)',
                        cursor: 'pointer',
                        boxShadow: '0 10px 40px rgba(230, 0, 0, 0.4)',
                        marginBottom: '4rem',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <a
                        href="mailto:contact@example.com"
                        style={{
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        İLETİŞİME GEÇ
                    </a>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        marginTop: '3rem',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {[
                        { name: 'GitHub', icon: '💻', url: 'https://github.com', rotation: 360 },
                        { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com', rotation: -360 },
                        { name: 'Twitter', icon: '🐦', url: 'https://twitter.com', rotation: 360 },
                        { name: 'Instagram', icon: '📸', url: 'https://instagram.com', rotation: -360 }
                    ].map((social, i) => (
                        <motion.a
                            key={social.name}
                            custom={i}
                            variants={socialVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                            whileHover={{
                                scale: 1.4,
                                rotate: social.rotation,
                                z: 80,
                                transition: {
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 10
                                }
                            }}
                            whileTap={{ scale: 0.9 }}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontSize: '3rem',
                                textDecoration: 'none',
                                filter: 'drop-shadow(0 0 20px rgba(230, 0, 0, 0.5))',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    style={{
                        marginTop: '4rem',
                        padding: '2rem',
                        background: 'rgba(10, 10, 10, 0.6)',
                        borderRadius: '12px',
                        border: '1px solid rgba(230, 0, 0, 0.2)',
                        backdropFilter: 'blur(10px)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>
                        © 2024 Fatih Northman. Tüm hakları saklıdır.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Contact;
