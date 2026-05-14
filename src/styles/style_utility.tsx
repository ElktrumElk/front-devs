

export default function StyleUtilities() {
    const footerButton: React.CSSProperties = {
        width: '30px',
        height: '30px',
        borderRadius: '50px',
        background: 'none',
        border: 'none',
        color: 'gray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    const footerButtonIc: React.CSSProperties = {
        width: '20px',
        height: '20px'
    }

    const sideBarButton: React.CSSProperties = {
        width: '30px',
        height: '30px',
        borderRadius: '50px',
        background: 'none',
        border: 'none',
        color: 'gray',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }


    // --- Styles Warehouse ---
    const subPostCards: { [key: string]: React.CSSProperties } = {

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


    const menuListContainer: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        width: "90%",
        position: 'absolute',
        top: '70px',
        right: '10px',
        borderRadius: '.5rem',
        zIndex: '1000',
        background: 'white',
        boxShadow: "0 0 10px #e8e4e4"
        
    };

    const menuItemRow: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.25rem 0.5rem",
        borderBottom: "1px solid #f2f2f7",
        cursor: "pointer",
        background: "none",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        width: "100%",
        textAlign: "left"
    };

    const leftItemBlock: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1.25rem"
    };

    const labelStyle: React.CSSProperties = {
        fontSize: "1rem",
        fontWeight: "500",
        color: "#000000"
    };

    const arrowStyle: React.CSSProperties = {
        fontSize: "0.85rem",
        color: "#c7c7cc",
        fontWeight: "bold"
    };

    return { footerButton, footerButtonIc, sideBarButton, subPostCards, menuListContainer, menuItemRow, leftItemBlock, labelStyle, arrowStyle }
}