import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projectsData, categories } from '../../data/projectsData';

const ProjectCard = ({ project, index, t }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
    const z = useTransform(mouseY, [-0.5, 0.5], [50, -50]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const thumbnail = project.images && project.images.length > 0
        ? project.images[0]
        : "https://placehold.co/600x400/1a1a1a/e60000?text=" + encodeURIComponent(project.title);

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                rotateX: -60,
                rotateY: -30,
                y: 100,
                z: -300,
                scale: 0.7
            }}
            whileInView={{
                opacity: 1,
                rotateX: 0,
                rotateY: 0,
                y: 0,
                z: 0,
                scale: 1
            }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
                delay: index * 0.15
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                background: 'rgba(10, 10, 10, 0.7)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(230, 0, 0, 0.2)',
                boxShadow: isHovered
                    ? '0 30px 80px rgba(230, 0, 0, 0.4), 0 0 40px rgba(230, 0, 0, 0.2)'
                    : '0 10px 40px rgba(0, 0, 0, 0.5)',
                transition: 'box-shadow 0.3s',
                cursor: 'pointer',
                rotateX,
                rotateY,
                z,
                transformStyle: 'preserve-3d',
                perspective: '1500px'
            }}
        >
            <div style={{
                height: '250px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <motion.img
                    src={thumbnail}
                    alt={project.title}
                    animate={{
                        scale: isHovered ? 1.15 : 1
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8))',
                    pointerEvents: 'none'
                }} />
            </div>

            <div style={{ padding: '2rem', transformStyle: 'preserve-3d' }}>
                <motion.h3
                    animate={{
                        z: isHovered ? 50 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontSize: '1.8rem',
                        marginBottom: '1rem',
                        color: '#E60000',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {project.title}
                </motion.h3>

                <motion.p
                    animate={{
                        z: isHovered ? 30 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    style={{
                        color: '#ccc',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {t(`projects.items.${project.id}.description`)}
                </motion.p>

                <motion.div
                    animate={{
                        z: isHovered ? 40 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            style={{
                                padding: '0.4rem 0.8rem',
                                background: 'rgba(230, 0, 0, 0.2)',
                                border: '1px solid rgba(230, 0, 0, 0.4)',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                color: '#fff'
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProjects = selectedCategory === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === selectedCategory);

    return (
        <section
            id="projects"
            style={{
                padding: '8rem 2rem',
                position: 'relative',
                perspective: '2000px',
                transformStyle: 'preserve-3d'
            }}
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, y: -80, rotateX: 45, z: -200 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{
                        type: 'spring',
                        stiffness: 80,
                        damping: 20
                    }}
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
                    {t('projects.title')}
                </motion.h2>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginBottom: '4rem',
                        flexWrap: 'wrap',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {categories.map((category, i) => (
                        <motion.button
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            whileHover={{
                                scale: 1.1,
                                rotateY: 10,
                                z: 20
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category.id)}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: selectedCategory === category.id
                                    ? 'linear-gradient(135deg, #E60000, #ff4444)'
                                    : 'rgba(230, 0, 0, 0.1)',
                                border: `1px solid ${selectedCategory === category.id ? '#E60000' : 'rgba(230, 0, 0, 0.3)'}`,
                                borderRadius: '8px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontFamily: 'var(--font-display)',
                                boxShadow: selectedCategory === category.id
                                    ? '0 0 20px rgba(230, 0, 0, 0.5)'
                                    : 'none',
                                transition: 'all 0.3s',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {t(`projects.categories.${category.id}`)}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2.5rem',
                    transformStyle: 'preserve-3d'
                }}>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            t={t}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
