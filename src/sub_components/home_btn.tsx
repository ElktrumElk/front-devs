import StyleUtilities from "../styles/style_utility"

const {footerButton, footerButtonIc} = StyleUtilities()

export default function HomeButton() {

    return (
        <>
            <button style={footerButton}>
                <img style={footerButtonIc} src="https://img.icons8.com/?size=100&id=3685&format=png&color=7a7a7a" />
                <span>Feed</span>
            </button>
        </>
    )
}