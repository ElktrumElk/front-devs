

const addButton: React.CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    background: '#010a1b',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}

const addIc: React.CSSProperties = {
    width: '30px',
    height: '30px'
}

export default function PostButton() {

    return (
        <>
            <button style={addButton}>
                <img style={addIc} src="https://img.icons8.com/?size=100&id=oF7jXJoq6nNX&format=png&color=ffffff" />
            </button>
        </>
    )
}