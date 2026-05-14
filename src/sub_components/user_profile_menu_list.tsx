import { useNavigate } from "react-router-dom";
import StyleUtilities from "../styles/style_utility";
import { styleResponsive } from "../styles/responsivness";
import Bell from "./bell";

export default function UserMenuList() {
    const navigate = useNavigate();
    const { menuItemRow, menuListContainer, leftItemBlock, labelStyle, arrowStyle } = StyleUtilities();
    const { isMobile, isMiniDesktop, isDesktop } = styleResponsive()
    // Added explicit destination paths for routing
    const menuItems = [
        {
            label: "Personal Information",
            path: "user/profile/info"
        },
        {
            label: "Posts",
            path: "user/profile/posts"
        },
        {
            label: "Settings",
            path: "/settings"
        }
    ];

    const filterMenuItems = isMobile ? menuItems : menuItems.filter(x => x.label !== 'Posts');

    const handleLogout = () => {
        console.log("Logging user out...");
        navigate("/login", { replace: true });
    };

    return (
        <>
            {/* Menu List Navigation Container */}
            <nav style={menuListContainer}>
                {filterMenuItems.map((item, index) => (
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

                {
                    isMiniDesktop &&
                    <button style={menuItemRow} onClick={() => navigate(!isDesktop ? '/app/user/notification' : '/app/home')}>
                        <div style={leftItemBlock}>
                            <Bell color="7a7a7a" />
                            <span style={labelStyle}>Notification</span>
                        </div>
                        <span style={arrowStyle}>❯</span>
                    </button>
                }

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
        </>
    )
}