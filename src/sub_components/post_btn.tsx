import { useNavigate } from "react-router-dom"
import { styleResponsive } from "../styles/responsivness"


const addButton: React.CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    background: '#010a1b',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}


const addButtonMiniDesktop: React.CSSProperties = {
    width: '100%',
    height: '50px',
    borderRadius: '40px',
    background: '#010a1b',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBlockStart: 'auto'
}

const addIc: React.CSSProperties = {
    width: '30px',
    height: '30px'
}

interface postbutton {
    color: string,
    active: CallableFunction
}

export default function PostButton({ color = 'ffffff', active }: postbutton) {
    const navigate = useNavigate();
    const { isMiniDesktop } = styleResponsive()


    const handleRoute = () => {
        navigate('/app/post');
        active('post');
    }
    return (
        <>
            <button style={isMiniDesktop ? addButtonMiniDesktop : addButton} onClick={handleRoute}>
                {
                    !isMiniDesktop &&
                    <img style={addIc} src={`https://img.icons8.com/?size=100&id=oF7jXJoq6nNX&format=png&color=${color}`} />
                }
                {
                    isMiniDesktop &&
                    <span style={{ color: 'white' }}>New Post</span>
                }
            </button>
        </>
    )
}