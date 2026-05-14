import { useRef } from "react"
import { useNavigate } from "react-router-dom"

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

    const handleCodeVerification = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const code = codeInput.current?.value;

        if (code) {
            if (code === '123456') {
                navigate('/app/home');
            }
            else {
                alert('wrong code');
            }
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
                        <input ref={codeInput} style={formInput} placeholder="000000" type="number" required />
                    </div>

                    <button style={submitButtont} type="submit">Verify</button>
                </form>
            </div>
        </>
    )
}