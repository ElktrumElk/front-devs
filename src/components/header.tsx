import { useLocation } from "react-router-dom";
import Bell from "../sub_components/bell";
import Profile from "../sub_components/profile";

const headerStyle: React.CSSProperties = {
    width: '100%',
    padding: '.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}

const subHeaderContainers: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
}

const routeTitles: Record<string, string> = {
    '/app/home': 'Home',
    '/app/search': 'Search',
    '/app/post': 'Add Post',
    '/app/user/profile': 'Profile',
    '/app/user/notification': 'Notifications',
};

export default function Header () {
    const location = useLocation();
    const title = routeTitles[location.pathname] ?? 'Home';

    return (
        <>
            <header className="header" style={headerStyle}>
                <div>
                    <h1 style={{color: 'black', fontSize: '20px', lineHeight: '20px' }}>{title}</h1>
                </div>

                <div style={subHeaderContainers}>
                    <Bell color="#1b1a1a"/>
                    <Profile />
                </div>
            </header>
        </>
    )
}