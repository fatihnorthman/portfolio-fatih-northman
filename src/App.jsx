import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';

function App() {
    return (
        <div style={{ background: '#050505', minHeight: '100vh' }}>
            <Navbar />
            <Hero />
            <Projects />
            <Contact />
        </div>
    )
}

export default App
