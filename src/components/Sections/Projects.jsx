import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Project keys map to translation file
const projectKeys = [
    { id: 'cyber_drift', category: 'game', tags: ['Unity', 'Custom Physics'], icon: '🏎️' },
    { id: 'shadow_protocol', category: 'game', tags: ['Unity', 'Networking'], icon: '🕵️' },
    { id: 'vox_world', category: 'game', tags: ['Unity', 'Generation'], icon: '🧊' },
    { id: 'node_graph', category: 'tool', tags: ['Editor', 'UI Toolkit'], icon: '🕸️' },
    { id: 'post_fx', category: 'tool', tags: ['Shaders', 'URP'], icon: '🌈' },
    { id: 'build_automator', category: 'tool', tags: ['CI/CD', 'Python'], icon: '🤖' }
];

const categories = ['all', 'game', 'tool'];

const Projects = () => {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProjects = selectedCategory === 'all'
        ? projectKeys
        : projectKeys.filter(p => p.category === selectedCategory);

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
                    {t('projects.title')}
                </motion.h2>
                <p style={{ color: '#eee', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: 500 }}>
                    {t('projects.subtitle')}
                </p>

                <motion.div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        flexWrap: 'wrap',
                    }}
                >
                    {categories.map((catId) => (
                        <button
                            key={catId}
                            onClick={() => setSelectedCategory(catId)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: selectedCategory === catId ? 'var(--color-brand-red)' : 'transparent',
                                border: `1px solid ${selectedCategory === catId ? 'var(--color-brand-red)' : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '4px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                transition: 'all 0.2s',
                            }}
                        >
                            {t(`projects.filter.${catId}`)}
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
                    {t('projects.count', {
                        count: filteredProjects.length,
                        category: selectedCategory === 'all' ? '' : t(`projects.categories.${selectedCategory}`)
                    })}
                </motion.p>

                {/* Projects Grid */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
                                    {t(`projects.items.${project.id}.title`)}
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: '#eee', marginBottom: '1rem', lineHeight: '1.5' }}>
                                    {t(`projects.items.${project.id}.desc`)}
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
