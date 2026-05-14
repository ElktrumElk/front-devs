import { useNavigate } from "react-router-dom"

const bellContainer: React.CSSProperties = {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const bellStyles: React.CSSProperties = {
    width: '20px',
    height: '20px'
}

interface bellProp {
    color: string
}

export default function Bell ({color}: bellProp) {
    const navigate = useNavigate()
    return (
        <>
            <div style={bellContainer} onClick={() => navigate('/user/notification')}>
                <img style={bellStyles} src={`https://img.icons8.com/?size=100&id=11642&format=png&color=${color.substring(1)}`} alt="bell"/>
            </div>
        </>
    )
}