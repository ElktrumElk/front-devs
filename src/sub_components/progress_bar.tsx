
interface progressbar {
    value: number
}

export function ProgressBar ({value}: progressbar) {
    return (
        <>
            <div style={progressContainer} role="progress">
                <div style={{width: value + "%", height: '100%', background: 'rgb(1, 42, 70)', borderRadius: '1rem'}}></div>
            </div>
        </>
    )
}

const progressContainer: React.CSSProperties = {
    width: '100%',
    height: '.4rem',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid black',
    overflow: 'hidden'
} 