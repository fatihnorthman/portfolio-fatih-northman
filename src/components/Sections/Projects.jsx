import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const projects = [
    {
        id: 1,
        title: "Cyberpunk Shooter",
        categoryKey: "pc_console",
        description: "A fast-paced FPS with neon aesthetics and advanced AI mechanics.",
        tech: ["Unity", "C#", "HDRP"],
        image: "https://placehold.co/600x400/1a1a1a/e60000?text=FPS+Project",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
        id: 2,
        title: "Mystic RPG",
        categoryKey: "pc_console",
        description: "Open-world RPG featuring a custom quest system and inventory management.",
        tech: ["Unity", "C#", "Shader Graph"],
        image: "https://placehold.co/600x400/1a1a1a/e60000?text=RPG+Project",
        video: ""
    },
    {
        id: 3,
        title: "Hyper Run 3D",
        categoryKey: "mobile_3d",
        description: "Hypercasual endless runner optimized for mobile performance.",
        tech: ["Unity", "Mobile", "URP"],
        image: "https://placehold.co/600x400/1a1a1a/e60000?text=Mobile+3D",
        video: ""
    },
    {
        id: 4,
        title: "Pixel Quest",
        categoryKey: "mobile_2d",
        description: "Classic 2D platformer with retro pixel art and touch controls.",
        tech: ["Unity 2D", "Mobile", "Sprite Atlas"],
        image: "https://placehold.co/600x400/1a1a1a/e60000?text=Mobile+2D",
        video: ""
    }
];

const ProjectCard = ({ project, index, t }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

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

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, rotateX: -30, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: index * 0.15
            }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    background: '#0a0a0a',
                    border: '1px solid #222',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    rotateX,
                    rotateY,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                }}
                whileHover={{
                    borderColor: '#E60000',
                    boxShadow: '0 20px 40px -10px rgba(230,0,0,0.2)'
                }}
            >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#000' }}>
                    {/* Video Preview on Hover - Muted & Autoplay */}
                    {project.video && isHovered ? (
                        <video
                            src={project.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                background: `url(${project.image}) center/cover`,
                                transition: 'transform 0.5s'
                            }}
                            className="card-image"
                        ></div>
                    )}

                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(0,0,0,0.8)',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        color: '#fff',
                        border: '1px solid #333'
                    }}>
                        {t(`projects.categories.${project.categoryKey}`)}
                    </div>
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>{project.title}</h3>
                    <p style={{ color: '#aaa', marginBottom: '1.5rem', fontSize: '0.9rem', flex: 1 }}>
                        {project.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {project.tech.map(t => (
                            <span key={t} style={{
                                fontSize: '0.7rem',
                                background: 'rgba(230, 0, 0, 0.1)',
                                color: '#E60000',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-display)',
                                border: '1px solid rgba(230, 0, 0, 0.2)'
                            }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const { t } = useTranslation();

    return (
        <section id="projects" style={{ padding: '8rem 2rem', background: '#050505', perspective: '1px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, x: -50, rotateY: -20 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: '3.5rem',
                        marginBottom: '5rem',
                        color: 'white',
                        borderLeft: '5px solid #E60000',
                        paddingLeft: '1.5rem',
                        perspective: 1000
                    }}
                >
                    {t('projects.title')}
                </motion.h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3rem',
                    perspective: '2000px'
                }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} t={t} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
