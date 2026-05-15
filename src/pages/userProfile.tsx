import type React from "react";
import { postsData } from "../data/mockData";
import { SubPostCard } from "../sub_components/sub_post_cards";
import StyleUtilities from "../styles/style_utility";
import { useEffect, useState } from "react";
import UserMenuList from "../sub_components/user_profile_menu_list";
import { styleResponsive } from "../styles/responsivness";
import { fetchData } from "../data/fetch_data";

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


// --- INLINE STYLES ---
const pageWrapperMobile: React.CSSProperties = {
    width: '95%',
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

interface dat {
    id: number,
    username: string,
    email: string,
    fullname: string,
    avatarUrl: string,
    bio: string,
    ratings: number,
    followers: number
}

export default function UserProfileMenu() {

    const posts = postsData;
    const userTag = localStorage.getItem('data');

    const userPost = posts.filter(x => x.usertag === JSON.parse(userTag).usertag);
    const { subPostCards } = StyleUtilities();
    const [userMenu, showMenu] = useState(false);
    const { isMobile } = styleResponsive();
    const [userData, setUserData] = useState<dat>(null);

    useEffect(() => {

        const f = async () => {
            const data = await fetchData();
            const dat = (data as dat)
            setUserData(dat)
        }
        f();
    }, []);

    return (

        <div style={isMobile ? pageWrapperMobile : pageWrapper}>

            <button onClick={() => showMenu(!userMenu)} style={{ alignSelf: 'flex-end', background: 'none', padding: '.5rem', border: 'none' }}>
                <img src="https://img.icons8.com/?size=100&id=20763&format=png&color=7a7a7a" width={"20"} height={"20"} />
            </button>
            {
                userMenu &&
                <div onClick={() => showMenu(false)} style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0', zIndex: '100', background: '#1e1f1f1d' }}>
                    <UserMenuList />
                </div>
            }

            {/* Identity Profile Block */}
            <div style={headerSection}>
                <div style={avatarWrapper}>
                    <img src={userData ? userData.avatarUrl : '...'} alt={''} style={avatarImg} />
                    <div style={verifiedBadge}>✓</div>
                </div>
                <h2 style={nameStyle}>{userData ? userData.username : '...'}</h2>
                <p style={emailStyle}>{userData ? userData.email : '...'}</p>

                <div style={{ display: 'flex', alignSelf: 'center', marginBlockStart: '1rem' }}>
                    <button style={{ padding: '.8rem 2rem', borderRadius: '1rem', color: 'white', fontSize: '1rem', background: '#010a1b' }}>Get In touch</button>
                </div>
            </div>


            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'GrayText' }}>
                <p>{userData ? userData.bio : '...'}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', marginBlockStart: '2rem', marginBlockEnd: '2rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <strong>{userData ? userData.followers : '...'}</strong>
                    <span style={{ color: 'GrayText' }}>Followers</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <strong>{userData ? userData.ratings : '...'}</strong>
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
