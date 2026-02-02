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
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -15 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section id="about" style={{ padding: '8rem 2rem', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, x: -100, rotateY: -30 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                    style={{
                        fontSize: '3.5rem',
                        marginBottom: '4rem',
                        color: 'white',
                        borderLeft: '5px solid #E60000',
                        paddingLeft: '1.5rem',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {t('about.title')}
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '4rem'
                    }}
                >
                    {/* About Text */}
                    <motion.div variants={itemVariants} style={{ transformStyle: 'preserve-3d' }}>
                        <h3 style={{ fontSize: '2rem', color: '#E60000', marginBottom: '1.5rem', letterSpacing: '2px' }}>
                            {t('about.subtitle')}
                        </h3>
                        <p style={{ color: '#aaa', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                            {t('about.bio1')}
                        </p>
                        <p style={{ color: '#aaa', fontSize: '1rem', lineHeight: '1.8' }}>
                            {t('about.bio2')}
                        </p>
                    </motion.div>

                    {/* Skills */}
                    <motion.div variants={itemVariants} style={{ transformStyle: 'preserve-3d' }}>
                        <h3 style={{ fontSize: '2rem', color: '#E60000', marginBottom: '2rem', letterSpacing: '2px' }}>
                            {t('about.skills')}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -50, rotateY: -20 }}
                                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                    viewport={{ once: false, margin: "-50px" }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ color: 'white', fontSize: '1.1rem', fontWeight: 500 }}>
                                            {skill.icon} {skill.name}
                                        </span>
                                        <span style={{ color: '#E60000', fontWeight: 'bold', fontSize: '1.1rem' }}>{skill.level}%</span>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: '10px',
                                        background: '#222',
                                        borderRadius: '5px',
                                        overflow: 'hidden',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
                                    }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: false }}
                                            transition={{
                                                duration: 1.2,
                                                delay: index * 0.15,
                                                ease: "easeOut"
                                            }}
                                            style={{
                                                height: '100%',
                                                background: 'linear-gradient(90deg, #E60000, #ff4444)',
                                                borderRadius: '5px',
                                                boxShadow: '0 0 10px rgba(230, 0, 0, 0.5)'
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
