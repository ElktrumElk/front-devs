


export default function GetIntouchButton({isResponsive}) {
    return (
        <>
            <button className={isResponsive ? 'get-intouch-btn' : ''} style={{ padding: '.8rem 2rem', borderRadius: '1rem', color: 'white', fontSize: '1rem', background: '#010a1b', border: 'none' }}>{isResponsive ? '' : 'Get In touch'}</button>
        </>
    )
}