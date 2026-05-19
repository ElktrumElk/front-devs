
interface getIntouch {
    isResponsive: boolean,
    panelState: boolean,
    showPanel: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GetIntouchButton({ isResponsive, showPanel, panelState }: getIntouch) {
    return (
        <>
            <button onClick={() => showPanel(!panelState)} className={isResponsive ? 'get-intouch-btn' : ''} style={isResponsive ? {background: 'none', border: 'none'}: buttonStyle}>{isResponsive ? <img src="https://img.icons8.com/?size=100&id=gBFid1P0BvH4&format=png&color=7a7a7a" width={'20'} height={'20'} /> : 'Get In touch'}</button>
        </>
    )
}

const buttonStyle: React.CSSProperties = {
    padding: '.8rem 2rem',
    borderRadius: '1rem',
    color: 'white',
    fontSize: '1rem',
    background: '#010a1b',
    border: 'none'
}