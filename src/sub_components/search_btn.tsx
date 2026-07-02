import { useNavigate } from "react-router-dom";
import StyleUtilities from "../styles/style_utility";
import { styleResponsive } from "../styles/responsivness";


interface searchbutton {
    color: string
    active: CallableFunction
}

const { footerButton, footerButtonIc, sideBarButton } = StyleUtilities();

export default function SearchButton({ color = '7a7a7a', active }: searchbutton) {

    const { isMobile } = styleResponsive();

    const navigate = useNavigate()
    const handleRoute = () => {
        navigate('/app/search', { replace: true });
        active('search');
    }

    return (
        <>
            <button style={isMobile ? footerButton : sideBarButton} onClick={handleRoute}>
                <img style={footerButtonIc} src={`https://img.icons8.com/?size=100&id=XU3XKgdpT0qG&format=png&color=${color}`}  />
                <span style={{ color: "#" + color }}>Search</span>
            </button>
        </>
    )
}