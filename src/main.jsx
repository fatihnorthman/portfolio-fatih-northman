import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './i18n';
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Suspense fallback={<div style={{ background: '#050505', color: '#ff3c3c', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron, sans-serif' }}>[ INITIALIZING PROTOCOL... ]</div>}>
            <App />
        </Suspense>
    </StrictMode>,
)
