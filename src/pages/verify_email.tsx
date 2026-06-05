import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { verifyEmail, login } from "../api/auth"

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
    fontSize: '1.1rem',
    padding: '.8rem',
    letterSpacing: '4px',
    textAlign: 'center'
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

export default function VerifyEmail() {

    const codeInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCodeVerification = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const code = codeInput.current?.value;
        const email = localStorage.getItem('email') || localStorage.getItem('verificationEmail');

        if (code && email) {
            setLoading(true);
            try {
                await verifyEmail({ email, code });
                const password = localStorage.getItem('_tempPassword');
                const { data } = await login({ email, password: password || '' });
                localStorage.setItem('token', data.token);
                localStorage.setItem('data', JSON.stringify(data.user));
                localStorage.removeItem('_tempPassword');
                localStorage.removeItem('verificationEmail');
                navigate('/app/home');
            } catch (err: any) {
                setError(err.response?.data?.message || 'Invalid verification code');
            } finally {
                setLoading(false);
            }
        } else {
            setError('No email found. Please sign up again.');
        }
    }

    const maxMizeCharacter = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;

        if (value.length >= 6) {
            e.target.value = e.target.value.substring(0, 6);
        }
        if (isNaN(parseInt(value))) {
            e.target.value = value.toString().replace(/[a-z | A-z]/g, '');
        }
    }



    return (

        <>
            <div style={{ display: 'flex', gap: '1rem', background: 'white', flexDirection: 'column', alignItems: 'center', padding: '2rem', width: "80%", maxWidth: '500px', borderRadius: '1rem' }}>
                <div style={logHeader}>
                    <h1>Verify Email</h1>
                    <p>A code was sent to your email. Please enter the code bellow</p>
                </div>

                <form onSubmit={(e) => handleCodeVerification(e)} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>

                    <div style={formInputRow}>
                        <input ref={codeInput} onChange={(e) => maxMizeCharacter(e)} style={formInput} placeholder="000000" type="text" required />
                    </div>

                    {error && <span style={{ color: 'red', fontSize: '.9rem' }}>{error}</span>}

                    <button style={submitButtont} type="submit" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>
            </div>
        </>
    )
}
