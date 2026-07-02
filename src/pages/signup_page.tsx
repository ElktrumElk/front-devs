import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

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


export default function Signup() {
    const navigate = useNavigate();
    const fullnameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const fullname = fullnameRef.current?.value;
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (fullname && username && email && password) {
            setLoading(true);
            try {
                await signup({ fullname, username, email, password });
                localStorage.setItem('verificationEmail', email);
                localStorage.setItem('_tempPassword', password);
                navigate('/verifyemail', { replace: true });
            } catch (err: any) {
                setError(err.response?.data?.message || 'Signup failed. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div style={{ display: 'flex', gap: '1rem', background: 'white', flexDirection: 'column', alignItems: 'center', padding: '2rem', width: "80%", maxWidth: '500px', borderRadius: '1rem' }}>
                <div style={logHeader}>
                    <h1>Signup</h1>
                    <p>Please fill in the form to continue</p>
                </div>

                <form onSubmit={handleSignup} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>

                    <div style={formInputRow}>
                        <img src="https://img.icons8.com/?size=100&id=2800&format=png&color=7a7a7a" width={"30"} height={"30"} />
                        <input ref={fullnameRef} style={formInput} placeholder="Fullname" type="text" required />
                    </div>

                    <div style={formInputRow}>
                        <img src="https://img.icons8.com/?size=100&id=98957&format=png&color=7a7a7a" width={"30"} height={"30"} />
                        <input ref={usernameRef} style={formInput} placeholder="Username" type="text" required />
                    </div>

                    <div style={formInputRow}>
                        <img src="https://img.icons8.com/?size=100&id=94652&format=png&color=7a7a7a" width={"30"} height={"30"} />
                        <input ref={emailRef} style={formInput} placeholder="Email" type="email" required />
                    </div>

                    <div style={formInputRow}>
                        <img src="https://img.icons8.com/?size=100&id=brCQDcQgxSm1&format=png&color=7a7a7a" width={"30"} height={"30"} />
                        <input ref={passwordRef} style={formInput} placeholder="Password" type="password" required />
                    </div>

                    {error && <span style={{ color: 'red', fontSize: '.9rem' }}>{error}</span>}

                    <div style={{ width: '100%', display: 'flex', marginBlockEnd: '1rem' }}>
                        <span style={{ color: '#10a7f9', cursor: 'pointer' }} onClick={() => navigate('/login', { replace: true })}>Login</span>
                    </div>

                    <button style={submitButtont} type="submit" disabled={loading}>
                        {loading ? 'Creating account...' : 'Get Started'}
                    </button>
                </form>
            </div>

        </>
    )
}
