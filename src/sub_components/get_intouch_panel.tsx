import { useEffect, useState } from "react"
import { sendContact } from "../api/users"

interface GetInTouchPanelProps {
    username: string;
}

export default function GetInTouchPanel({ username }: GetInTouchPanelProps) {

    const [panelScale, setPanelScale] = useState<number>(0);
    const [message, setMessage] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [sent, setSent] = useState(false);

    useEffect(() => {
        setPanelScale(panelScale === 0 ? 1 : 0);
    }, []);

    const handleSend = async () => {
        if (!message) return;
        try {
            await sendContact(username, message, contactInfo);
            setSent(true);
        } catch {}
    };

    return (
        <>
            <div style={{ ...panel, transform: `scale(${panelScale})` }}>
                {sent ? (
                    <span style={{ color: 'green', padding: '1rem' }}>Message sent!</span>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                        <input
                            placeholder="Your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ padding: '.5rem', borderRadius: '.5rem', border: '1px solid #ccc' }}
                        />
                        <input
                            placeholder="Your contact (optional)"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            style={{ padding: '.5rem', borderRadius: '.5rem', border: '1px solid #ccc' }}
                        />
                        <button onClick={handleSend} style={{ padding: '.5rem', background: '#010a1b', color: 'white', border: 'none', borderRadius: '.5rem' }}>
                            Send
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

const panel: React.CSSProperties = {
    position: 'absolute',
    padding: '1rem',
    borderRadius: '1rem',
    display: 'flex',
    background: '#fff',
    boxShadow: '0 0 1rem #d5d1d1',
    zIndex: '1',
    top: '60px',
    right: '90px',
    transition: 'transform .3s ease'
}
