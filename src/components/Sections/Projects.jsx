import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Project data with different categories
const tempProjects = [
    {
        id: 'game1',
        title: 'Cyber Drift',
        category: 'game',
        tags: ['Unity', 'Custom Physics'],
        icon: '🏎️',
        description: 'Raycast-based arcade racing system with custom drifting physics.'
    },
    {
        id: 'game2',
        title: 'Shadow Protocol',
        category: 'game',
        tags: ['Unity', 'Networking'],
        icon: '🕵️',
        description: 'Co-op stealth game featuring dynamic lighting and AI vision systems.'
    },
    {
        id: 'game3',
        title: 'Vox World',
        category: 'game',
        tags: ['Unity', 'Generation'],
        icon: '🧊',
        description: 'Infinite voxel world generation using compute shaders.'
    },
    {
        id: 'tool1',
        title: 'Node Graph',
        category: 'tool',
        tags: ['Editor', 'UI Toolkit'],
        icon: '🕸️',
        description: 'Visual scripting node editor built for custom dialogue systems.'
    },
    {
        id: 'tool2',
        title: 'Post-FX Lite',
        category: 'tool',
        tags: ['Shaders', 'URP'],
        icon: '🌈',
        description: 'Mobile-optimized post-processing stack for low-end devices.'
    },
    {
        id: 'tool3',
        title: 'Build Automator',
        category: 'tool',
        tags: ['CI/CD', 'Python'],
        icon: '🤖',
        description: 'Automated build and deployment pipeline for multi-platform Unity projects.'
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
                width: '100%',
                padding: '4rem 1rem',
                position: 'relative',
                perspective: '2000px',
                transformStyle: 'preserve-3d'
            }}
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    style={{
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        color: 'var(--color-brand-red)',
                        fontFamily: 'var(--font-display)',
                    }}
                >
                    02. PROJE ARŞİVİ
                </motion.h2>
                <p style={{ color: '#eee', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: 500 }}>
                    Sınırları zorlayan teknik çalışmalar ve yaratıcı oyun deneyimleri.
                </p>

                {/* Category Filter */}
                <motion.div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        flexWrap: 'wrap',
                    }}
                >
                    {tempCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: selectedCategory === category.id ? 'var(--color-brand-red)' : 'transparent',
                                border: `1px solid ${selectedCategory === category.id ? 'var(--color-brand-red)' : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '4px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                transition: 'all 0.2s',
                            }}
                        >
                            {category.name}
                        </button>
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
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{
                                y: -10,
                                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                                borderColor: 'var(--color-brand-red)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 20px var(--color-brand-red-glow)'
                            }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                overflow: 'hidden',
                                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                                backdropFilter: 'blur(12px)',
                                position: 'relative'
                            }}
                        >
                            {/* Card Shine Effect */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '-100%',
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                                    pointerEvents: 'none'
                                }}
                                whileHover={{ left: '100%' }}
                                transition={{ duration: 0.8 }}
                            />
                            <div style={{
                                padding: '1.5rem',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '1.5rem' }}>{project.icon}</span>
                                <div style={{
                                    fontSize: '0.7rem',
                                    color: 'var(--color-brand-red)',
                                    padding: '2px 8px',
                                    border: '1px solid var(--color-brand-red)',
                                    borderRadius: '10px',
                                    textTransform: 'uppercase'
                                }}>
                                    {project.category}
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>
                                    {project.title}
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: '#eee', marginBottom: '1rem', lineHeight: '1.5' }}>
                                    {project.description}
                                </p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} style={{
                                            fontSize: '0.7rem',
                                            color: '#fff',
                                            background: 'var(--color-brand-red-glow)',
                                            padding: '2px 8px',
                                            borderRadius: '2px',
                                            border: '1px solid var(--color-brand-red-glow)'
                                        }}>
                                            #{tag}
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
