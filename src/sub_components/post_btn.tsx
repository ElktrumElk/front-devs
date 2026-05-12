import StyleUtilities from "../styles/style_utility"



const { footerButton } = StyleUtilities();

const addIc: React.CSSProperties = {
    width: '30px',
    height: '30px'
}

export default function PostButton() {

    return (
        <>
            <button style={footerButton}>
                <img style={addIc} src="https://img.icons8.com/?size=100&id=oF7jXJoq6nNX&format=png&color=ffffff" />
            </button>
        </>
    )
}