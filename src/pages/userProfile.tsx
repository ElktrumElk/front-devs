import type React from "react";
import { postsData } from "../data/mockData";
import { SubPostCard } from "../sub_components/sub_post_cards";
import StyleUtilities from "../styles/style_utility";
import { useState } from "react";
import UserMenuList from "../sub_components/user_profile_menu_list";

// --- INLINE STYLES ---
const pageWrapper: React.CSSProperties = {
    width: '100%',
    height: '100%',
    margin: "0 auto",
    padding: "2.5rem 1rem",
    background: "#fdfdfd",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#000000",
    gridRow: 'span 2',
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
};

const headerSection: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem",
    width: '100%'
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



export default function UserProfileMenu() {
    const posts = postsData;
    const userPost = posts.filter(x => x.usertag === '@vector_runner');
    const { subPostCards } = StyleUtilities();
    const [userMenu, showMenu] = useState(false);

    const user = {
        name: "Elktrum Elk",
        email: "elk@gmail.com",
        bio: 'I am the Vector Runner',
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
    };


    return (

        <div style={pageWrapper}>

            <button onClick={() => showMenu(!userMenu)} style={{ alignSelf: 'flex-end' }}>More</button>
            {
                userMenu &&
                <div onClick={() => showMenu(false)} style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0',  zIndex: '100', background: '#1e1f1f1d'}}>
                    <UserMenuList />
                </div>
            }

            {/* Identity Profile Block */}
            <div style={headerSection}>
                <div style={avatarWrapper}>
                    <img src={user.avatarUrl} alt={user.name} style={avatarImg} />
                    <div style={verifiedBadge}>✓</div>
                </div>
                <h2 style={nameStyle}>{user.name}</h2>
                <p style={emailStyle}>{user.email}</p>

                <div style={{ display: 'flex', alignSelf: 'center', marginBlockStart: '1rem' }}>
                    <button style={{ padding: '.8rem 2rem', borderRadius: '1rem', color: 'white', fontSize: '1rem', background: '#010a1b' }}>Get In touch</button>
                </div>
            </div>


            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'GrayText' }}>
                <p>{user.bio}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', marginBlockStart: '2rem', marginBlockEnd: '2rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <strong>200</strong>
                    <span style={{ color: 'GrayText' }}>Followers</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <strong>90000</strong>
                    <span style={{ color: 'GrayText' }}>Ratings</span>
                </div>
            </div>

            <div>
                <SubPostCard styles={subPostCards} list={userPost} />
            </div>

            {/*menu list*/}
        </div>
    );
}
