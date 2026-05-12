
const searchBtn: React.CSSProperties = {
    width: '30px',
    height: '30px',
    borderRadius: '50px',
    background: 'none',
    border: 'none',
    color: 'gray',
    fontSize: '16px'
}

const searchIc: React.CSSProperties = {
    width: '20px',
    height: '20px'
}

export default function SearchButton() {

    return (
        <>
            <button style={searchBtn}>
                <img style={searchIc} src="https://img.icons8.com/?size=100&id=XU3XKgdpT0qG&format=png&color=7a7a7a" alt="search"/>
                <span>Search</span>
            </button>
        </>
    )
}