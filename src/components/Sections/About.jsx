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

    return (
        <section id="about" style={{ padding: '8rem 2rem', background: '#0a0a0a' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: '3.5rem',
                        marginBottom: '3rem',
                        color: 'white',
                        borderLeft: '5px solid #E60000',
                        paddingLeft: '1.5rem'
                    }}
                >
                    {t('about.title')}
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                    {/* About Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 style={{ fontSize: '2rem', color: '#E60000', marginBottom: '1.5rem' }}>
                            {t('about.subtitle')}
                        </h3>
                        <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                            {t('about.bio1')}
                        </p>
                        <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.8' }}>
                            {t('about.bio2')}
                        </p>
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 style={{ fontSize: '2rem', color: '#E60000', marginBottom: '2rem' }}>
                            {t('about.skills')}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ color: 'white', fontSize: '1.1rem' }}>
                                            {skill.icon} {skill.name}
                                        </span>
                                        <span style={{ color: '#E60000', fontWeight: 'bold' }}>{skill.level}%</span>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        background: '#222',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            style={{
                                                height: '100%',
                                                background: 'linear-gradient(90deg, #E60000, #ff4444)',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
