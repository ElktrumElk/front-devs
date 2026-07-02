import { useNavigate } from 'react-router-dom'

const features = [
    { title: 'Showcase Your Work', desc: 'Share your projects, code snippets, and designs with the developer community.' },
    { title: 'Get Feedback', desc: 'Receive ratings and constructive feedback to improve your craft.' },
    { title: 'Discover Talent', desc: 'Explore work from other developers and get inspired by their creations.' },
]

export default function SplashScreen() {
    const navigate = useNavigate()

    return (
        <div style={{
            width: '100%',
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            background: '#f5f5f5',
        }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
            }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#010a1b' }}>front-devs</span>
                <button
                    onClick={() => navigate('/login')}
                    style={{
                        padding: '.5rem 1.2rem',
                        borderRadius: '.5rem',
                        border: '1px solid #010a1b',
                        background: 'transparent',
                        color: '#010a1b',
                        fontSize: '.9rem',
                        cursor: 'pointer',
                        fontWeight: 600,
                    }}
                >
                    Sign In
                </button>
            </nav>

            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                gap: '3rem',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
            }}>
                <div style={{ textAlign: 'center', maxWidth: '650px' }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        margin: 0,
                        lineHeight: 1.15,
                        color: '#010a1b',
                        letterSpacing: '-1px',
                    }}>
                        Where{' '}
                        <span style={{ color: '#aa3bff' }}>
                            developers
                        </span>
                        {' '}share their work
                    </h1>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '1.05rem',
                        lineHeight: 1.6,
                        marginTop: '1rem',
                        marginBottom: '2rem',
                    }}>
                        Join a community of developers showcasing projects, getting real feedback,
                        and connecting with like-minded creators.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            padding: '.8rem 2.5rem',
                            borderRadius: '.5rem',
                            border: 'none',
                            background: '#010a1b',
                            color: '#fff',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Get Started
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem',
                    width: '100%',
                }}>
                    {features.map((f, i) => (
                        <div key={i} style={{
                            background: '#fff',
                            border: '1px solid #e5e4e7',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            textAlign: 'left',
                        }}>
                            <h3 style={{ margin: '0 0 .4rem', fontSize: '1rem', fontWeight: 600, color: '#010a1b' }}>{f.title}</h3>
                            <p style={{ margin: 0, color: '#6b7280', fontSize: '.85rem', lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </main>

            <footer style={{
                textAlign: 'center',
                padding: '1rem',
                color: '#9ca3af',
                fontSize: '.8rem',
                borderTop: '1px solid #e5e4e7',
            }}>
                front-devs &copy; {new Date().getFullYear()}
            </footer>
        </div>
    )
}