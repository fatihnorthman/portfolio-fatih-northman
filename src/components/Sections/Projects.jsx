import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: "Cyberpunk Shooter",
        description: "A fast-paced FPS with neon aesthetics and advanced AI mechanics.",
        tech: ["Unity", "C#", "HDRP"],
        image: "https://placehold.co/600x400/1a1a1a/e60000?text=FPS+Project"
    },
    {
        id: 2,
        title: "Mystic RPG",
        description: "Open-world RPG featuring a custom quest system and inventory management.",
        tech: ["Unity", "C#", "Shader Graph"],
        image: "https://placehold.co/600x400/1a1a1a/e60000?text=RPG+Project"
    },
    {
        id: 3,
        title: "Space Strategy",
        description: "Real-time strategy game set in deep space with procedural generation.",
        tech: ["Unity", "DOTS", "Netcode"],
        image: "https://placehold.co/600x400/1a1a1a/e60000?text=Strategy+Project"
    }
];

const Projects = () => {
    return (
        <section id="projects" style={{ padding: '8rem 2rem', background: '#050505', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontSize: '3rem',
                        marginBottom: '4rem',
                        color: 'white',
                        borderLeft: '4px solid #E60000',
                        paddingLeft: '1rem'
                    }}
                >
                    Selected Projects
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            style={{
                                background: '#0a0a0a',
                                border: '1px solid #222',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                transition: 'border-color 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#E60000'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#222'}
                        >
                            <div style={{ height: '200px', background: '#111', overflow: 'hidden' }}>
                                {/* Placeholder for project image */}
                                <div style={{ width: '100%', height: '100%', background: `url(${project.image}) center/cover` }}></div>
                            </div>

                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>{project.title}</h3>
                                <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '0.9rem' }}>{project.description}</p>

                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {project.tech.map(t => (
                                        <span key={t} style={{
                                            fontSize: '0.7rem',
                                            background: 'rgba(230, 0, 0, 0.1)',
                                            color: '#E60000',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '4px',
                                            fontFamily: 'var(--font-display)'
                                        }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
