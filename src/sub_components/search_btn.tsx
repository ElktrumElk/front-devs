import StyleUtilities from "../styles/style_utility";


const { footerButton } = StyleUtilities();

const searchIc: React.CSSProperties = {
    width: '20px',
    height: '20px'
}

export default function SearchButton() {

    return (
        <>
            <button style={footerButton}>
                <img style={searchIc} src="https://img.icons8.com/?size=100&id=XU3XKgdpT0qG&format=png&color=7a7a7a" alt="search"/>
                <span>Search</span>
            </button>
        </>
    )
}