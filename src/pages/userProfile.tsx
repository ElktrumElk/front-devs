import type React from "react";
import { useNavigate } from "react-router-dom";
import { postsData } from "../data/mockData";
import { SubPostCard } from "../sub_components/sub_post_cards";

// --- INLINE STYLES ---
const pageWrapper: React.CSSProperties = {
    width: '90%',
    height: '100%',
    margin: "0 auto",
    padding: "2.5rem 1rem",
    background: "#fdfdfd",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#000000",
    gridRow: 'span 2',
    borderRadius: '1rem'
};

const headerSection: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem"
};

const avatarWrapper: React.CSSProperties = {
    position: "relative",
    width: "90px",
    height: "90px",
    marginBottom: "1rem"
};

const avatarImg: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover"
};

const verifiedBadge: React.CSSProperties = {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    background: "#ff5a36",
    color: "#ffffff",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    border: "2px solid #fdfdfd"
};

const nameStyle: React.CSSProperties = {
    fontSize: "1.35rem",
    fontWeight: "600",
    margin: "0 0 0.25rem 0",
    letterSpacing: "-0.02em"
};

const emailStyle: React.CSSProperties = {
    fontSize: "0.9rem",
    color: "#8e8e93",
    margin: 0
};

const menuListContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%"
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

export default function UserProfileMenu() {
    const navigate = useNavigate();

    const user = {
        name: "Elktrum Elk",
        email: "elk@gmail.com",
        bio: 'I am the Vector Runner',
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
    };

    // Added explicit destination paths for routing
    const menuItems = [
        {
            label: "Personal Information",
            path: "/profile/info"
        },
        {
            label: "Posts",
            path: "/profile/posts"
        },
        {
            label: "Settings",

            path: "/settings"
        }
    ];

    const handleLogout = () => {
        // Clear tokens or state here if needed
        console.log("Logging user out...");
        navigate("/login", { replace: true });
    };

    const posts = postsData;
    const userPost = posts.filter(x => x.usertag === '@vector_runner');
    
    return (
        <div style={pageWrapper}>
            {/* Identity Profile Block */}
            <div style={headerSection}>
                <div style={avatarWrapper}>
                    <img src={user.avatarUrl} alt={user.name} style={avatarImg} />
                    <div style={verifiedBadge}>✓</div>
                </div>
                <h2 style={nameStyle}>{user.name}</h2>
                <p style={emailStyle}>{user.email}</p>

                <div style={{ display: 'flex', alignSelf: 'center', marginBlockStart: '1rem'}}>
                    <button style={{padding: '.8rem 2rem', borderRadius: '1rem', color: 'white', fontSize: '1rem', background: '#010a1b'}}>Get In touch</button>
                </div>
            </div>


            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'GrayText' }}>
                <p>{user.bio}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', marginBlockStart: '2rem', marginBlockEnd: '2rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <strong>200</strong>
                    <span style={{color: 'GrayText'}}>Followers</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <strong>90000</strong>
                    <span style={{color: 'GrayText'}}>Ratings</span>
                </div>
            </div>
            
         

            {/* Menu List Navigation Container */}
            <nav style={menuListContainer}>
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        style={menuItemRow}
                        onClick={() => navigate(item.path)}
                    >
                        <div style={leftItemBlock}>
                            <span style={labelStyle}>{item.label}</span>
                        </div>
                        <span style={arrowStyle}>❯</span>
                    </button>
                ))}

                {/* Integrated Logout Row */}
                <button
                    style={{ ...menuItemRow, borderBottom: "none" }}
                    onClick={handleLogout}
                >
                    <div style={leftItemBlock}>
                        <span style={{ ...labelStyle, color: "#ef4444" }}>Logout</span>
                    </div>
                    <span style={arrowStyle}>❯</span>
                </button>
            </nav>
        </div>
    );
}
