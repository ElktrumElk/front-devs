import { useEffect, useState } from "react"



export default function GetInTouchPanel() {

    const [panelScale, setPanelScale] = useState<number>(0);

    useEffect(() => {
        setPanelScale(panelScale === 0 ? 1 : 0);
    }, [])

    return (
        <>
            <div style={{ ...panel, transform: `scale(${panelScale})` }}>
                <ul style={listPanel}>
                    <li style={lists}>
                        <span>Whatsapp</span>
                    </li>
                    <li style={lists}>
                        <span>elktrumelk@gmail.com</span>
                    </li>
                </ul>
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

const listPanel: React.CSSProperties = {
    padding: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    cursor: 'pointer'
}

const lists: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '.9rem'
}