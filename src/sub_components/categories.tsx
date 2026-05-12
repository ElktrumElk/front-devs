import { useState } from "react";

const categoriesData = [
    'All',
    'Portfolio',
    'Career & Insights',
    'Educational & Tips',
    'Micro-Tutorials',
    'UI/UX Design',
    'Code Snippets',
    'Resources',
    'Tech Stack',
    'Open Source',
    'Performance',
    'Accessibility',
    'Behind the Scenes'
];

export default function Categories() {
    // 1. Initialize state with the first category ('All')
    const [activeCat, setActiveCat] = useState('All');

    // 2. Accept the specific category name as a parameter
    const handleActiveCat = (catName: string) => {
        setActiveCat(catName);
    };

    return (
        <div style={{ width: '100%', display: 'flex', gap: '1rem', overflowX: 'auto', padding: '10px', scrollbarColor: 'transparent', scrollbarWidth: "none" }}>
            {categoriesData.map((cat: string, idx) => (
                <button
                    key={idx}
                    style={{
                        // 3. Compare current category in loop to the active state
                        background: activeCat === cat ? '#010a1b' : 'none',
                        color: activeCat === cat ? 'white' : 'black',
                        border: '1px solid black',
                        borderRadius: '4rem',
                        display: 'flex',
                        alignItems: 'center',
                        flex: '0 0 auto',
                        padding: '.5rem 1rem',
                        cursor: 'pointer'
                    }}
                    onClick={() => handleActiveCat(cat)}
                >
                    <span>{cat}</span>
                </button>
            ))}
        </div>
    );
}
