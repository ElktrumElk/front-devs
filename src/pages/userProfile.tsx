import type React from "react";
import { postsData } from "../data/mockData";
import { SubPostCard } from "../sub_components/sub_post_cards";
import StyleUtilities from "../styles/style_utility";
import { useEffect, useState, type SetStateAction } from "react";
import UserMenuList from "../sub_components/user_profile_menu_list";
import { styleResponsive } from "../styles/responsivness";
import { fetchData } from "../data/fetch_data";
import GetIntouchButton from "../sub_components/get_in_touch_btn";
import { useParams } from "react-router-dom";

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

interface userprofile {
    expandPost: React.Dispatch<SetStateAction<boolean>>,
    postId: React.Dispatch<SetStateAction<number>>,
    isPublicView?: boolean
}

export default function UserProfileMenu({ expandPost, postId, isPublicView = false }: userprofile) {
    const { username } = useParams<{ username: string }>();

    const posts = postsData;
    let userTag = localStorage.getItem('data');
    
    const currentUserData = userTag ? JSON.parse(userTag)?.usertag : null;

    const userPost = isPublicView 
        ? posts.filter(x => x.username === username)
        : posts.filter(x => x.usertag === currentUserData);
    
    const { subPostCards } = StyleUtilities();
    const [userMenu, showMenu] = useState(false);
    const { isMobile } = styleResponsive();
    const [userData, setUserData] = useState<dat | null>(null);

    useEffect(() => {
        const f = async () => {
            if (isPublicView && username) {
                // For public profile, get data from post data based on username
                const userPost = posts.find(x => x.username === username);
                if (userPost) {
                    setUserData({
                        id: userPost.id,
                        username: userPost.username,
                        email: 'user@example.com',
                        fullname: userPost.username,
                        avatarUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                        bio: 'User bio',
                        ratings: userPost.ratings,
                        followers: 12000
                    });
                }
            } else {
                // For private profile, get current user data
                const data = await fetchData();
                const dat = (data as dat)
                setUserData(dat)
            }
        }
        f();
    }, [isPublicView, username]);

    const isOwnProfile = !isPublicView || (userTag && JSON.parse(userTag)?.username === username);
    const showMenu_Button = !isPublicView;

    return (

        <div style={isMobile ? pageWrapperMobile : pageWrapper}>

            {showMenu_Button && (
                <button onClick={() => showMenu(!userMenu)} style={{ alignSelf: 'flex-end', background: 'none', padding: '.5rem', border: 'none' }}>
                    <img src="https://img.icons8.com/?size=100&id=20763&format=png&color=7a7a7a" width={"20"} height={"20"} />
                </button>
            )}
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

                {!isOwnProfile && (
                    <div style={{ display: 'flex', alignSelf: 'center', marginBlockStart: '1rem' }}>
                        <GetIntouchButton isResponsive={false} />
                    </div>
                )}
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
                <SubPostCard styles={subPostCards} list={userPost} expand={expandPost} cardId={postId} />
            </div>

            {/*menu list*/}
        </div>
    );
}
