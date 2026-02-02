import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Project data with different categories
const tempProjects = [
    // Games
    {
        id: 'game1',
        title: 'Space Shooter VR',
        category: 'game',
        tags: ['Unity', 'VR', 'C#'],
        icon: '🚀',
        description: 'Immersive VR space combat game with realistic physics'
    },
    {
        id: 'game2',
        title: 'Mobile RPG Adventure',
        category: 'game',
        tags: ['Unity', 'Mobile', '3D'],
        icon: '⚔️',
        description: 'Epic mobile RPG with stunning graphics and deep gameplay'
    },
    {
        id: 'game3',
        title: 'Puzzle Platformer',
        category: 'game',
        tags: ['Unity', '2D', 'Physics'],
        icon: '🎮',
        description: 'Mind-bending puzzle platformer with unique mechanics'
    },
    {
        id: 'game4',
        title: 'Racing Simulator',
        category: 'game',
        tags: ['Unity', 'Multiplayer', 'Physics'],
        icon: '🏎️',
        description: 'Realistic racing simulator with online multiplayer'
    },
    // Tools
    {
        id: 'tool1',
        title: 'Level Editor Pro',
        category: 'tool',
        tags: ['Unity', 'Editor', 'Tool'],
        icon: '🛠️',
        description: 'Advanced level editor for Unity game development'
    },
    {
        id: 'tool2',
        title: 'Shader Graph Library',
        category: 'tool',
        tags: ['Shaders', 'Graphics', 'Unity'],
        icon: '✨',
        description: 'Collection of professional shader graphs for Unity'
    },
    {
        id: 'tool3',
        title: 'Animation Controller',
        category: 'tool',
        tags: ['Unity', 'Animation', 'Tool'],
        icon: '🎬',
        description: 'Advanced animation controller system for Unity'
    },
    {
        id: 'tool4',
        title: 'Asset Manager',
        category: 'tool',
        tags: ['Unity', 'Workflow', 'Tool'],
        icon: '📦',
        description: 'Powerful asset management tool for Unity projects'
    }
];

const tempCategories = [
    { id: 'all', name: 'All Projects' },
    { id: 'game', name: 'Games' },
    { id: 'tool', name: 'Tools' }
];

const Projects = () => {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProjects = selectedCategory === 'all'
        ? tempProjects
        : tempProjects.filter(p => p.category === selectedCategory);

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
                    {tempCategories.map((category, i) => (
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
                            {category.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Project Count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        textAlign: 'center',
                        color: '#888',
                        marginBottom: '2rem',
                        fontSize: '1.1rem'
                    }}
                >
                    Showing {filteredProjects.length} {selectedCategory === 'all' ? 'projects' : selectedCategory === 'game' ? 'games' : 'tools'}
                </motion.p>

                {/* Projects Grid */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2.5rem',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{
                                opacity: 0,
                                rotateX: -60,
                                rotateY: -30,
                                y: 100,
                                z: -300,
                                scale: 0.7
                            }}
                            animate={{
                                opacity: 1,
                                rotateX: 0,
                                rotateY: 0,
                                y: 0,
                                z: 0,
                                scale: 1
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                transition: { duration: 0.2 }
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 60,
                                damping: 20,
                                delay: index * 0.1
                            }}
                            whileHover={{
                                scale: 1.05,
                                rotateY: 5,
                                z: 30,
                                boxShadow: '0 30px 80px rgba(230, 0, 0, 0.4)'
                            }}
                            style={{
                                position: 'relative',
                                background: 'rgba(10, 10, 10, 0.7)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '1px solid rgba(230, 0, 0, 0.2)',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                                cursor: 'pointer',
                                transformStyle: 'preserve-3d',
                                perspective: '1500px'
                            }}
                        >
                            <div style={{
                                height: '250px',
                                background: project.category === 'game'
                                    ? 'linear-gradient(135deg, rgba(230, 0, 0, 0.3), rgba(0, 0, 0, 0.8))'
                                    : 'linear-gradient(135deg, rgba(0, 100, 230, 0.3), rgba(0, 0, 0, 0.8))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '6rem',
                                position: 'relative'
                            }}>
                                {project.icon}
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    padding: '0.5rem 1rem',
                                    background: project.category === 'game'
                                        ? 'rgba(230, 0, 0, 0.8)'
                                        : 'rgba(0, 100, 230, 0.8)',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    fontFamily: 'var(--font-display)',
                                    textTransform: 'uppercase'
                                }}>
                                    {project.category}
                                </div>
                            </div>

                            <div style={{ padding: '2rem' }}>
                                <h3 style={{
                                    fontSize: '1.8rem',
                                    marginBottom: '1rem',
                                    color: project.category === 'game' ? '#E60000' : '#0064E6'
                                }}>
                                    {project.title}
                                </h3>

                                <p style={{
                                    color: '#ccc',
                                    lineHeight: '1.6',
                                    marginBottom: '1.5rem'
                                }}>
                                    {project.description}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap'
                                }}>
                                    {project.tags.map(tag => (
                                        <span
                                            key={tag}
                                            style={{
                                                padding: '0.4rem 0.8rem',
                                                background: project.category === 'game'
                                                    ? 'rgba(230, 0, 0, 0.2)'
                                                    : 'rgba(0, 100, 230, 0.2)',
                                                border: `1px solid ${project.category === 'game'
                                                    ? 'rgba(230, 0, 0, 0.4)'
                                                    : 'rgba(0, 100, 230, 0.4)'}`,
                                                borderRadius: '4px',
                                                fontSize: '0.85rem',
                                                color: '#fff'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
