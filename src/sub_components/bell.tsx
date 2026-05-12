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
    return (
        <>
            <div style={bellContainer}>
                <img style={bellStyles} src={`https://img.icons8.com/?size=100&id=11642&format=png&color=${color.substring(1)}`} alt="bell"/>
            </div>
        </>
    )
}