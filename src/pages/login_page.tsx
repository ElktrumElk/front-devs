import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../api/auth"
import { styleResponsive } from "../styles/responsivness"

const logHeader: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '.5rem'
}

const formInputRow: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    gap: '.2rem',
    borderRadius: '.5rem',
    padding: '.1rem',
    paddingInlineStart: '.5rem',
    background: '#f5f5f5',
    alignItems: 'center'

}

const formInput: React.CSSProperties = {
    flex: '1',
    background: 'none',
    outline: 'none',
    border: 'none',
    fontSize: '1rem',
    padding: '.8rem'
}

const submitButtont: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    borderRadius: '.5rem',
    border: 'none',
    background: '#010a1b',
    color: 'white',
    fontWeight: 'bolder'

}


export default function Login() {

    const navigate = useNavigate();
    const userEmailInput = useRef<HTMLInputElement>(null);
    const userPasswordInput = useRef<HTMLInputElement>(null);
    const { isMobile } = styleResponsive();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const email = userEmailInput.current?.value;
        const password = userPasswordInput.current?.value;

        if (email && password) {
            setLoading(true);
            try {
                const { data } = await login({ email, password });
                localStorage.setItem('token', data.token);
                localStorage.setItem('data', JSON.stringify(data.user));
                localStorage.setItem('_tempPassword', password);
                localStorage.setItem('verificationEmail', email);
                navigate('/verifyemail', { replace: true });
            } catch (err: any) {
                setError(err.response?.data?.message || 'Invalid login credentials');
            } finally {
                setLoading(false);
            }
        }
    }


    return (
        <>
            <div style={{ display: 'flex', gap: '1rem', background: 'white', flexDirection: 'column', alignItems: 'center', padding: '2rem', width: isMobile ? '95%' : "80%", maxWidth: '500px', borderRadius: '1rem' }}>
                <div style={logHeader}>
                    <h1>Login</h1>
                    <p>Please fill in the form to continue</p>
                </div>

                <form onSubmit={(e) => handleLogin(e)} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                    <div style={formInputRow}>
                        <img src="https://img.icons8.com/?size=100&id=94652&format=png&color=7a7a7a" width={"30"} height={"30"} />
                        <input ref={userEmailInput} style={formInput} placeholder="Email" type="email" required />
                    </div>

                    <div style={formInputRow}>
                        <img src="https://img.icons8.com/?size=100&id=brCQDcQgxSm1&format=png&color=7a7a7a" width={"30"} height={"30"} />
                        <input ref={userPasswordInput} style={formInput} placeholder="Password" type="password" required />
                    </div>

                    {error && <span style={{ color: 'red', fontSize: '.9rem' }}>{error}</span>}

                    <div style={{ width: '100%', display: 'flex', marginBlockEnd: '1rem' }}>
                        <span style={{ color: '#10a7f9', cursor: 'pointer' }} onClick={() => navigate('/signup', { replace: true })}>Create Account</span>
                        <span style={{ marginInlineStart: 'auto', cursor: 'pointer' }}>Forgot password?</span>
                    </div>

                    <button style={submitButtont} type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Get Started'}
                    </button>
                </form>
            </div>
        </>
    )
}
