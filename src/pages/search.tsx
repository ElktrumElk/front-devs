import { useRef, useState } from "react"
import { postsData } from "../data/mockData";

interface Post {
    id: number;
    username: string;
    category: string;
    img: string;
    description: string;
    ratings: number; // Added optional rating
}

export default function Search() {

    const [recentSearch, setRecentSearch] = useState<Post[]>([]);
    const searchInput = useRef<HTMLInputElement>(null);

    const handleFilter = () => {
        const query = searchInput.current?.value.toLowerCase();
        if (!query) {
            setRecentSearch([]);
            return;
        }

        const results = postsData.filter(post =>
            post.category.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) ||
            post.username.toLowerCase().includes(query)
        );
        setRecentSearch(results);
    }

    const handleRatings = (rate: number) => {
        if (rate >= 1000) {
            let calcRate = rate / 1000;
            let r: string = calcRate.toString() + 'K'
            return r;
        }
        else if (rate >= 1000000) {
            let calcRate = rate / 1000000;
            let r: string = calcRate.toString() + 'M';
            return r
        }
        else if (rate >= 1000000000) {
            let calcRate = rate / 1000000000;
            let r: string = calcRate.toString() + 'B';
            return r
        }
        else {
            return rate.toString()
        }


    }
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>Search</h1>
                <div style={styles.searchBar}>
                    <img src="https://img.icons8.com/?size=100&id=XU3XKgdpT0qG&format=png&color=7a7a7a" width="24px" height="24px" alt="search" />
                    <input
                        ref={searchInput}
                        placeholder="CSS flexbox"
                        onChange={handleFilter}
                        style={styles.input}
                    />
                </div>
            </div>

            <div style={styles.resultsHeader}>
                {recentSearch.length > 0 ? "Results" : "Recent Searches"}
            </div>

            {/* The 2-Column Grid */}
            <div style={styles.grid}>
                {recentSearch.map((post) => (
                    <div key={post.id} style={styles.card}>
                        <div style={{ ...styles.imageThumb, backgroundImage: `url(${post.img})` }} />
                        <div style={styles.cardInfo}>
                            <span style={styles.username}>{post.username}</span>
                            <div style={styles.ratingRow}>
                                <span style={styles.star}>★</span>
                                <span>{handleRatings(post.ratings) || '4.8'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// --- Styles Warehouse ---
const styles: { [key: string]: React.CSSProperties } = {
    container: { width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', backgroundColor: '#f9f9f9' },
    header: { width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' },
    searchBar: { width: '100%', display: 'flex', gap: '1rem', background: '#ffffff', borderRadius: '4rem', padding: '0.8rem 1.2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    input: { flex: '1', border: 'none', outline: 'none', fontSize: '1rem' },
    resultsHeader: { fontWeight: 'bold', fontSize: '0.9rem', color: '#666', marginTop: '1rem' },

    // Grid Logic
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // Exactly two columns
        gap: '1rem',
        marginTop: '0.5rem'
    },
    card: {
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column'
    },
    imageThumb: {
        width: '100%',
        height: '140px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#eee'
    },
    cardInfo: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    username: {
        fontSize: '0.85rem',
        fontWeight: 'bold',
        color: '#333',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    ratingRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.8rem',
        color: '#777'
    },
    star: {
        color: '#FFD700', // Gold color
        fontSize: '1rem'
    }
};
