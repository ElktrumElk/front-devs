import { useNavigate } from "react-router-dom"


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

    const handleRoute = () => {
        navigate('/post');
        active('post');
    }
    return (
        <>
            <button style={addButton} onClick={handleRoute}>
                <img style={addIc} src={`https://img.icons8.com/?size=100&id=oF7jXJoq6nNX&format=png&color=${color}`} />
            </button>
        </>
    )
}