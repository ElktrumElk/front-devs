const userContainer: React.CSSProperties = {
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4rem',
    background: '#cacaca'
}

const userStyle: React.CSSProperties = {
    width: '20px',
    height: '20px'
}


export default function Profile() {

    return (
        <>
            <div style={userContainer}>
                <img style={userStyle} src="https://img.icons8.com/?size=100&id=22396&format=png&color=000000" alt="user" />
            </div>
        </>
    )
}