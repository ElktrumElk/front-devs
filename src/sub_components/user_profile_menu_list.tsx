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
            path: "app/user/profile/info",
            icon: 'https://img.icons8.com/?size=100&id=60655&format=png&color=7a7a7a'
        },
        {
            label: "Posts",
            path: "user/profile/posts",
            icon: 'https://img.icons8.com/?size=100&id=69092&format=png&color=7a7a7a'
        },
        {
            label: "Settings",
            path: "/app/settings",
            icon: 'https://img.icons8.com/?size=100&id=364&format=png&color=7a7a7a'
        }
    ];

    const filterMenuItems = isMobile ? menuItems : menuItems.filter(x => x.label !== 'Posts');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('data');
        localStorage.removeItem('isLogin');
        localStorage.removeItem('isEmailVerify');
        navigate("/login", { replace: true });
    };

    return (
        <>
            {/* Menu List Navigation Container */}
            <nav style={menuListContainer}>
              <h1 style={{color: 'var(--global-txt-cl)', paddingBlockEnd: '.5rem'}}>Menu</h1>
                {filterMenuItems.map((item, index) => (
                    <button
                        key={index}
                        style={menuItemRow}
                        onClick={() => navigate(item.path)}
                    >
                          <img src={item.icon} style={{width: '20px', height: '20px'}}/>
                        <div style={leftItemBlock}>
                            <span style={labelStyle}>{item.label}</span>
                        </div>
                        <span style={arrowStyle}>❯</span>
                    </button>
                ))}

                {
                    isMiniDesktop &&
                    <button style={menuItemRow} onClick={() => navigate(!isDesktop ? '/app/user/notification' : '/app/home')}>
                            <Bell color="7a7a7a" />
                        <div style={leftItemBlock}>
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
                  <img src="https://img.icons8.com/?size=100&id=2445&format=png&color=ff0000" style={{width: '20px', height: '20px'}}/>
                    <div style={{...leftItemBlock, border: 'none', alignItems: 'center', paddingBlockEnd: '0rem'}}>
                        <span style={{ ...labelStyle, color: "#ef4444" }}>Logout</span>
                    </div>
  
                </button>
            </nav>
        </>
    )
}