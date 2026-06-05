import type React from "react";
import { SubPostCard } from "../sub_components/sub_post_cards";
import StyleUtilities from "../styles/style_utility";
import { useEffect, useState, type SetStateAction } from "react";
import UserMenuList from "../sub_components/user_profile_menu_list";
import { styleResponsive } from "../styles/responsivness";
import { getMe } from "../api/auth";
import { getUserProfile, type UserProfile } from "../api/users";
import { getUserPosts, type Post } from "../api/posts";
import GetIntouchButton from "../sub_components/get_in_touch_btn";
import { useParams } from "react-router-dom";
import GetInTouchPanel from "../sub_components/get_intouch_panel";

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

interface userprofile {
    expandPost: React.Dispatch<SetStateAction<boolean>>,
    postId: React.Dispatch<SetStateAction<string>>,
    isPublicView?: boolean
}

export default function UserProfileMenu({ expandPost, postId, isPublicView = false }: userprofile) {
    const { username } = useParams<{ username: string }>();

    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const { subPostCards } = StyleUtilities();
    const [userMenu, showMenu] = useState(false);
    const { isMobile } = styleResponsive();
    const [showGetIntouchPanel, setGetIntouchPane] = useState<boolean>(false);

    useEffect(() => {
        const f = async () => {
            setLoading(true);
            try {
                if (isPublicView && username) {
                    const [profileRes, postsRes] = await Promise.all([
                        getUserProfile(username),
                        getUserPosts(username)
                    ]);
                    setUserData(profileRes.data);
                    setUserPosts(postsRes.data.posts);
                } else {
                    const { data } = await getMe();
                    setUserData(data);
                    const postsRes = await getUserPosts(data.username);
                    setUserPosts(postsRes.data.posts);
                }
            } catch {
                setUserData(null);
                setUserPosts([]);
            } finally {
                setLoading(false);
            }
        }
        f();
    }, [isPublicView, username]);

    const userTag = localStorage.getItem('data');
    const parsedData = userTag ? JSON.parse(userTag) : null;
    const isOwnProfile = !isPublicView || (parsedData?.username === username);
    const showMenu_Button = !isPublicView;

    if (loading) {
        return (
            <div style={isMobile ? pageWrapperMobile : pageWrapper}>
                <p style={{ textAlign: 'center', color: 'GrayText' }}>Loading profile...</p>
            </div>
        );
    }

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

            <div style={headerSection}>
                <div style={avatarWrapper}>
                    <img src={userData ? userData.avatarUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' : '...'} alt={''} style={avatarImg} />
                    <div style={verifiedBadge}>✓</div>
                </div>
                <h2 style={nameStyle}>{userData ? userData.username : '...'}</h2>
                <p style={emailStyle}>{userData ? userData.email : '...'}</p>

                {!isOwnProfile && (
                    <div style={{ display: 'flex', alignSelf: 'center', marginBlockStart: '1rem' }}>
                        <GetIntouchButton isResponsive={false} showPanel={setGetIntouchPane} panelState={showGetIntouchPanel} />
                        {showGetIntouchPanel && <GetInTouchPanel username={username || ''} />}

                    </div>

                )}
            </div>


            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'GrayText' }}>
                <p>{userData ? userData.bio : '...'}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', marginBlockStart: '2rem', marginBlockEnd: '2rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <strong>{userData ? userData.followersCount : '...'}</strong>
                    <span style={{ color: 'GrayText' }}>Followers</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <strong>{userData ? userData.ratingsTotal : '...'}</strong>
                    <span style={{ color: 'GrayText' }}>Ratings</span>
                </div>
            </div>

            <div>
                <SubPostCard styles={subPostCards} list={userPosts} expand={expandPost} cardId={postId} />
            </div>

        </div>
    );
}
