import { useNavigate } from "react-router-dom"
import StyleUtilities from "../styles/style_utility"
import { styleResponsive } from "../styles/responsivness"

const { footerButton, footerButtonIc, sideBarButton } = StyleUtilities()

interface homebutton {
    color: string,
    active: CallableFunction
}



export default function HomeButton({ color = '7a7a7a', active }: homebutton) {
    
    const { isMobile } = styleResponsive();
    
    const navigate = useNavigate()
    const handleRoute = () => {
        navigate('/home', { replace: true });
        active('feed');
    }

    return (
        <>
            <button style={isMobile ? footerButton : sideBarButton} onClick={handleRoute}>
                <img style={footerButtonIc} src={`https://img.icons8.com/?size=100&id=3685&format=png&color=${color}`} />
                <span style={{ color: '#' + color }}>Feed</span>
            </button>
        </>
    )
}