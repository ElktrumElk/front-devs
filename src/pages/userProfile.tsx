import type React from "react";
import { postsData } from "../data/mockData";
import { SubPostCard } from "../sub_components/sub_post_cards";
import { useEffect, useState, type SetStateAction } from "react";
import GetIntouchButton from "../sub_components/get_in_touch_btn";
//import { useParams } from "react-router-dom";
import GetInTouchPanel from "../sub_components/get_intouch_panel";
import { GetData } from "../api/authenticate";
import StyleUtilities from "../styles/style_utility";
import UserMenuList from "../sub_components/user_profile_menu_list";

// --- INLINE STYLES ---
const pageWrapper: React.CSSProperties = {
  width: "100%",
  height: "100%",
  minHeight: "100dvh",
  margin: "0 auto",
  padding: "2.5rem 1rem",
  background: "var(--global-component-bg)",

  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  color: "#000000",
  gridRow: "span 2",
  borderRadius: "1rem",
  display: "flex",
  flexDirection: "column",
  position: "relative",
};

const headerSection: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "1rem",
  width: "100%",
};

const avatarWrapper: React.CSSProperties = {
  position: "relative",
  width: "90px",
  height: "90px",
  marginBottom: "1rem",
};

const avatarImg: React.CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
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
  border: "2px solid #fdfdfd",
};

const nameStyle: React.CSSProperties = {
  fontSize: "1.35rem",
  fontWeight: "600",
  margin: "0 0 0.25rem 0",
  letterSpacing: "-0.02em",
  color: 'var(--global-txt-cl)'
};

const emailStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#8e8e93",
  margin: 0,
};

export interface userprofile {
  expandPost: React.Dispatch<SetStateAction<boolean>>;
  postId: React.Dispatch<SetStateAction<number>>;
  isPublicView?: boolean;
}

//=======================================================MAIN======================================MAIN=
//=====================================================================================================
//=======================================================================================================
export default function UserProfileMenu({
  expandPost,
  postId,
  //isPublicView = false,
}: userprofile) {
  //const { username } = useParams<{ username: string }>();

  const { subPostCards } = StyleUtilities();
  // fetch the user data using axios
  const { userData } = GetData();
  /**Holds the information of the user */
  const [user, setUser] = useState<
    [
      {
        username: string;
        fullname: string;
        email: string;
        usertag: string;
        avatarUrl: string;
        bio: string;
        ratingsTotal: string;
        followersCount: string;
      },
    ]
  >();

  // A flag to listen for user data arrival */
  const [isData, setIsData] = useState(false);
  /**Posts belonging to the user*/
  const postsByUser = postsData.filter((x) => x.usertag === user?.[0].usertag);

  useEffect(() => {
    setTimeout(() => {
      userData()
        .then((res) => {
          setUser(res as unknown as typeof user);

          setIsData(true);
        })
        .catch((e) => console.error(e));
    }, 2000);

    return;
  }, [isData]);

  const [isGetintouchPanel, setGetintouchPanel] = useState(false);
  const [isMenu, setMenu] = useState(false);

  return (
    <div style={pageWrapper}>
      <button
        style={{
          alignSelf: "flex-end",
          background: "none",
          padding: ".5rem",
          border: "none",
          cursor: 'pointer'
        }}
        onClick={() => setMenu(true)}
      >
        <img
          src="https://img.icons8.com/?size=100&id=20763&format=png&color=7a7a7a"
          width={"20"}
          height={"20"}
        
        />
      </button>
      {isMenu &&
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "100",
            background: "#1e1f1f3d",
          }}
          onClick={(e) =>e.target === e.currentTarget && setMenu?.(false)}
        >
          <UserMenuList />
        </div>
      }

      {/* Identity Profile Block */}
      <div style={headerSection}>
        <div style={avatarWrapper}>
          <img src={user ? user[0].avatarUrl : "..."} style={avatarImg} />
          <div style={verifiedBadge}>✓</div>
        </div>
        <h2 style={nameStyle}>{user ? user[0].username : "..."}</h2>
        <p style={emailStyle}>{user ? user[0].email : "..."}</p>

        {
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              marginBlockStart: "1rem",
            }}
          >
            <GetIntouchButton
              isResponsive={false}
              showPanel={setGetintouchPanel}
              panelState={isGetintouchPanel}
            />
            {isGetintouchPanel && <GetInTouchPanel />}
          </div>
        }
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          color: "GrayText",
        }}
      >
        <p>{user ? user[0].bio : "..."}</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyItems: "center",
          marginBlockStart: "2rem",
          marginBlockEnd: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <strong style={{color: 'var(--global-txt-cl)'}}>{user ? user[0].followersCount : "..."}</strong>
          <span style={{ color: "GrayText" }}>Followers</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <strong style={{color: 'var(--global-txt-cl)'}}>{user ? user[0].ratingsTotal : "..."}</strong>
          <span style={{ color: "GrayText" }}>Ratings</span>
        </div>
      </div>

      <div>
        <SubPostCard
          styles={subPostCards}
          list={postsByUser}
          expand={expandPost}
          cardId={postId}
        />
      </div>

      {/*menu list*/}
    </div>
  );
}
