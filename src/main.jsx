import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './i18n';
import './index.css'

const Loading = () => (
    <div style={{
        height: '100vh',
        width: '100vw',
        background: '#050505',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#E60000',
        fontFamily: 'sans-serif'
    }}>
        LOADING...
    </div>
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Suspense fallback={<Loading />}>
            <App />
        </Suspense>
    </StrictMode>,
)
