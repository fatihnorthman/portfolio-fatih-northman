import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const skills = [
    { name: "Unity", level: 95, icon: "🎮" },
    { name: "C#", level: 90, icon: "💻" },
    { name: "Game Design", level: 85, icon: "🎨" },
    { name: "3D Modeling", level: 75, icon: "🗿" },
    { name: "Shader Programming", level: 80, icon: "✨" },
    { name: "Mobile Optimization", level: 85, icon: "📱" }
];

const About = () => {
    const { t } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 80,
            rotateX: -45,
            z: -200,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            z: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 15,
                mass: 1
            }
        }
    };

    const skillVariants = {
        hidden: {
            opacity: 0,
            x: -100,
            rotateY: -45,
            z: -150
        },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            rotateY: 0,
            z: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: i * 0.1
            }
        })
    };

    return (
        <section
            id="about"
            style={{
                minHeight: '100vh',
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
                    maxWidth: '1200px',
                    margin: '0 auto',
                    transformStyle: 'preserve-3d'
                }}
            >
                <motion.h2
                    variants={itemVariants}
                    style={{
                        fontSize: '3.5rem',
                        marginBottom: '3rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #fff, #E60000)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 40px rgba(230, 0, 0, 0.3)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    HAKKIMIZDA
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    style={{
                        fontSize: '1.2rem',
                        lineHeight: '1.8',
                        color: '#ccc',
                        textAlign: 'center',
                        marginBottom: '4rem',
                        maxWidth: '800px',
                        margin: '0 auto 4rem',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    Unity oyun motoru ile yüksek kaliteli, performanslı ve etkileyici oyunlar geliştiriyoruz. Mobil, PC ve konsol platformları için profesyonel çözümler sunuyoruz.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    style={{
                        background: 'rgba(10, 10, 10, 0.6)',
                        padding: '3rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(230, 0, 0, 0.2)',
                        boxShadow: '0 10px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(230, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <h3 style={{
                        fontSize: '2rem',
                        marginBottom: '2rem',
                        color: '#E60000',
                        textAlign: 'center'
                    }}>
                        YETENEKLERİMİZ
                    </h3>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {skills.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                custom={i}
                                variants={skillVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.5 }}
                                whileHover={{
                                    scale: 1.05,
                                    x: 20,
                                    rotateY: 5,
                                    z: 30,
                                    transition: { type: 'spring', stiffness: 300 }
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <span style={{ fontSize: '2rem' }}>{skill.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <span style={{ fontWeight: 600 }}>{skill.name}</span>
                                        <span style={{ color: '#E60000' }}>{skill.level}%</span>
                                    </div>
                                    <div style={{
                                        height: '8px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: false }}
                                            transition={{
                                                duration: 1.5,
                                                delay: i * 0.1,
                                                ease: 'easeOut'
                                            }}
                                            style={{
                                                height: '100%',
                                                background: 'linear-gradient(90deg, #E60000, #ff4444)',
                                                boxShadow: '0 0 10px #E60000',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;
