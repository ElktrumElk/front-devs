import { useContext, useEffect } from "react"
import { UserTheme } from "../context/user_theme"

export default function Settings() {
    const { setColorMode, colorMode } = useContext(UserTheme);

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setColorMode(e.target?.value);
    }

    useEffect(() => {
        if (colorMode === 'Dark') {
            document.body.classList.add('dark')
        }
        else {
            document.body.classList.remove('dark')
        }
    }, [colorMode])

    return (
        <>
            <div style={styles.panel}>
                <h1 style={{paddingBottom: '1rem', fontSize: '1.5rem', color: 'var(--global-txt-cl)'}}>Settings</h1>
                <ul style={styles.listPanel}>
                    <li style={styles.lists}>
                        <span>Color Mode</span>
                        <select onChange={(e) => handleColorChange(e)} style={{ padding: '.4rem 1rem', border: 'none', background: '#f5f5f5', borderRadius: '1rem' }}>
                            <option>Light</option>
                            <option>Dark</option>
                        </select>
                    </li>
                </ul>
            </div>
        </>
    )
}

const styles: { [key: string]: React.CSSProperties } = {

    panel: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        background: 'var(--global-component-bg)',
        padding: '1rem',
        width: '100%',
        height: '100%',
    },

    listPanel: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        borderRadius: '1rem',
        background: 'var(--global-panel-section-bg)',
        gap: '.5rem',
        width: '100%',
        listStyle: 'none',
        color: 'var(--global-txt-cl)'
        

    },

    lists: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}