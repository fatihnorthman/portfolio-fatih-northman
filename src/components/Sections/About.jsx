import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const skills = [
    { name: "Unity", level: 95, icon: "🎮", category: "Engine" },
    { name: "C#", level: 90, icon: "💻", category: "Language" },
    { name: "ShaderLab", level: 80, icon: "✨", category: "Graphics" },
    { name: "3D Math", level: 85, icon: "📐", category: "Core" },
    { name: "Optimization", level: 85, icon: "🚀", category: "Performance" },
    { name: "UI/UX", level: 75, icon: "🎨", category: "Design" }
];

const stats = [
    { label: "Experience", value: "5+ Years" },
    { label: "Projects", value: "20+" },
    { label: "Coffee", value: "∞" }
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
                width: '100%',
                maxWidth: '1200px',
                padding: '4rem 1rem',
                margin: '0 auto',
                position: 'relative',
                perspective: '2000px',
                transformStyle: 'preserve-3d'
            }}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    transformStyle: 'preserve-3d'
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem',
                    alignItems: 'start'
                }}>
                    {/* Left Column: Bio & Stats */}
                    <motion.div variants={itemVariants}>
                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                            marginBottom: '1.5rem',
                            color: 'var(--color-brand-red)',
                            fontFamily: 'var(--font-display)',
                        }}>
                            01. PROTOKOL ANALİZİ
                        </h2>

                        <div style={{
                            padding: '1.5rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderLeft: '2px solid var(--color-brand-red)',
                            marginBottom: '2rem'
                        }}>
                            <p style={{ fontSize: '1rem', color: '#fff', lineHeight: '1.6', marginBottom: '1rem' }}>
                                Yazılım dünyasına Unity ve C# ile adım attığımdan beri, karmaşık sistemleri zarif çözümlere dönüştürmeye odaklanıyorum. Sadece oyun değil, yaşayan dünyalar yaratma tutkum beni her zaman daha derin teknik detaylara itti.
                            </p>
                            <p style={{ fontSize: '1rem', color: '#fff', lineHeight: '1.6' }}>
                                Performans odaklı mimari yapılar ve görsel olarak etkileyici shader çalışmaları uzmanlık alanımdır.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>{stat.value}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#ddd', textTransform: 'uppercase' }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Skills */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            background: 'rgba(10, 10, 10, 0.4)',
                            padding: '2rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(5px)',
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.2rem',
                            marginBottom: '2rem',
                            color: '#fff',
                            letterSpacing: '2px',
                            borderBottom: '1px solid var(--color-brand-red)',
                            paddingBottom: '0.5rem'
                        }}>
                            YETENEK MATRİSİ
                        </h3>

                        <div style={{ display: 'grid', gap: '1.2rem' }}>
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={skill.name}
                                    custom={i}
                                    variants={skillVariants}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '0.9rem'
                                    }}>
                                        <span style={{ color: '#fff' }}>{skill.icon} {skill.name}</span>
                                        <span style={{ color: '#E60000', opacity: 0.8 }}>{skill.level}%</span>
                                    </div>
                                    <div style={{
                                        height: '4px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        borderRadius: '2px',
                                        overflow: 'hidden'
                                    }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            style={{
                                                height: '100%',
                                                background: 'var(--color-brand-red)',
                                                boxShadow: '0 0 10px var(--color-brand-red-glow)'
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
