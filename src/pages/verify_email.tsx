import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { userAccount } from "../data/accountDB"

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
    const { Database } = userAccount();

    const handleCodeVerification = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const code = codeInput.current?.value;

        if (code) {
            if (code === '123456') {
                const email = localStorage.getItem('email');

                if (email) {
                    const user = (Database)[email]
                    localStorage.setItem('data', JSON.stringify(user));
                    navigate('/app/home');
                }
            }
            else {
                alert('wrong code');
            }
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

                    <button style={submitButtont} type="submit">Verify</button>
                </form>
            </div>
        </>
    )
}