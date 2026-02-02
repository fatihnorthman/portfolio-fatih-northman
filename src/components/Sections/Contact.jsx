import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" style={{ padding: '6rem 2rem', background: '#080808', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '3rem', marginBottom: '2rem', color: 'white' }}
                >
                    Let's Work Together
                </motion.h2>

                <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '3rem' }}>
                    Currently looking for new opportunities in Game Development. <br />
                    Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <motion.a
                    href="mailto:alkan2798@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'inline-block',
                        padding: '1rem 3rem',
                        background: '#E60000',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-display)',
                        boxShadow: '0 0 20px rgba(230, 0, 0, 0.3)'
                    }}
                >
                    Say Hello
                </motion.a>

                <footer style={{ marginTop: '5rem', color: '#444', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} Fatih Northman. All Rights Reserved.
                </footer>
            </div>
        </section>
    )
}

export default Contact
