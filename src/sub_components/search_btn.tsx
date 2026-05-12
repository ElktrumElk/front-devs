import { useNavigate } from "react-router-dom";
import StyleUtilities from "../styles/style_utility";

const { footerButton, footerButtonIc } = StyleUtilities();

export default function SearchButton() {
     const navigate = useNavigate()
    const handleRoute = () => {
        navigate('/search', {replace: true});
    }
    return (
        <>
            <button style={footerButton} onClick={handleRoute}>
                <img style={footerButtonIc} src="https://img.icons8.com/?size=100&id=XU3XKgdpT0qG&format=png&color=7a7a7a" alt="search"/>
                <span>Search</span>
            </button>
        </>
    )
}