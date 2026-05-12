
const homeBtn: React.CSSProperties = {
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

const homeIc: React.CSSProperties = {
    width: '20px',
    height: '20px'
}

export default function HomeButton() {

    return (
        <>
            <button style={homeBtn}>
                <img style={homeIc} src="https://img.icons8.com/?size=100&id=3685&format=png&color=7a7a7a" />
                <span>Feed</span>
            </button>
        </>
    )
}