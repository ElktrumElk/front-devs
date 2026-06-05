import { useNavigate } from "react-router-dom";
import StyleUtilities from "../styles/style_utility";
import { styleResponsive } from "../styles/responsivness";
import Bell from "./bell";
import { routes } from "../modules/routes";

export default function UserMenuList() {
  const navigate = useNavigate();
  const {
    menuItemRow,
    menuListContainer,
    leftItemBlock,
    labelStyle,
    arrowStyle,
  } = StyleUtilities();
  const { isMobile, isMiniDesktop, isDesktop } = styleResponsive();
  // Added explicit destination paths for routing
  const menuItems = [
    {
      label: "Personal Information",
      path: "user/profile/info",
    },
    {
      label: "Posts",
      path: routes.posts,
    },
    {
      label: "Settings",
      path: routes.setting,
    },
  ];

  const filterMenuItems = isMobile
    ? menuItems
    : menuItems.filter((x) => x.label !== "Posts");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Menu List Navigation Container */}
      <nav style={menuListContainer}>
        <h2 style={{color: 'var(--global-txt-cl)'}}>Menu</h2>
        {filterMenuItems.map((item, index) => (
          <button
            key={index}
            style={menuItemRow}
            onClick={() => navigate(item.path)}
          >
            <Bell color="7a7a7a" />
            <div style={leftItemBlock}>
              <span style={labelStyle}>{item.label}</span>
              <span style={arrowStyle}>❯</span>
            </div>
          </button>
        ))}

        {isMiniDesktop && (
          <button
            style={menuItemRow}
            onClick={() =>
              navigate(!isDesktop ? "/app/user/notification" : "/app/home")
            }
          >
            <Bell color="7a7a7a" />
            <div style={leftItemBlock}>
              <span style={labelStyle}>Notification</span>
              <span style={arrowStyle}>❯</span>
            </div>
          </button>
        )}

        {/* Integrated Logout Row */}
        <button
          style={{ ...menuItemRow, borderBottom: "none" }}
          onClick={handleLogout}
        >
            <Bell color="7a7a7a" />
          <div style={leftItemBlock}>
            <span style={{ ...labelStyle, color: "#ef4444" }}>Logout</span>
          </div>
        </button>
      </nav>
    </>
  );
}
