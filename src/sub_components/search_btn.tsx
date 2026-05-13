import { useNavigate } from "react-router-dom";
import StyleUtilities from "../styles/style_utility";


interface searchbutton {
    color: string
    active: CallableFunction
}

const { footerButton, footerButtonIc } = StyleUtilities();

export default function SearchButton({ color = '7a7a7a', active }: searchbutton) {
    const navigate = useNavigate()
    const handleRoute = () => {
        navigate('/search', { replace: true });
        active('search');
    }

    return (
        <>
            <button style={footerButton} onClick={handleRoute}>
                <img style={footerButtonIc} src={`https://img.icons8.com/?size=100&id=XU3XKgdpT0qG&format=png&color=${color}`} alt="search" />
                <span style={{ color: "#" + color }}>Search</span>
            </button>
        </>
    )
}