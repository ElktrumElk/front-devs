

export default function StyleUtilities() {
    const footerButton: React.CSSProperties = {
        width: '30px',
        height: '30px',
        borderRadius: '50px',
        background: 'none',
        border: 'none',
        color: 'gray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'    
    }

    const footerButtonIc: React.CSSProperties = {
        width: '20px',
        height: '20px'
    }

    return { footerButton, footerButtonIc }
}