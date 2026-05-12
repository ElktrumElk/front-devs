import { useNavigate } from "react-router-dom"
import StyleUtilities from "../styles/style_utility"

const { footerButton, footerButtonIc } = StyleUtilities()

export default function HomeButton() {
    const navigate = useNavigate()
    const handleRoute = () => {
        navigate('/home', {replace: true});
    }
    return (
        <>
            <button style={footerButton} onClick={handleRoute}>
                <img style={footerButtonIc} src="https://img.icons8.com/?size=100&id=3685&format=png&color=7a7a7a" />
                <span>Feed</span>
            </button>
        </>
    )
}