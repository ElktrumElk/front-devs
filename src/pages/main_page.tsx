import { Routes, Route } from 'react-router-dom'
import Home from './home';
import MobileFooter from '../components/mobileFooter';
import Header from '../components/header';
import Search from './search';
import AddPost from './post';
import { styleResponsive } from '../styles/responsivness';
import DesktopSidebar from '../components/desktop_side_bar';
import UserProfile from './userProfile';
import NotificationPanel from './notifaction';




const subWrapperDesktop: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '.5fr 1.5fr 1fr 400px',
    width: "100%",
    height: "100%",
    gap: '1rem'

}


const subWrapperDesktopMini: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '.5fr 1.5fr 400px',
    width: "100%",
    height: "100%",
    gap: '1rem'

}

const subWrapperMobile: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
    flexGrow: "1",
    minWidth: '0',
    height: '100%',

}

const subWrapperTablet: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
    flexGrow: "1",
    minWidth: '0',
    height: '100%',
    maxWidth: '600px'
}

export default function MainPage() {
    const { isMobile, isTablet, isMiniDesktop } = styleResponsive();
    const isDesktop = !isMobile && !isTablet && !isMiniDesktop;

    return (
        <>
          
                <div style={isDesktop ? subWrapperDesktop : isMiniDesktop ? subWrapperDesktopMini : subWrapperMobile}>

                    {isDesktop && <DesktopSidebar />}
                    {isMiniDesktop && <DesktopSidebar />}
                    {!isDesktop && !isMiniDesktop && <Header />}


                    <div style={isTablet ? subWrapperTablet : subWrapperMobile} className='subWrapper'>
                        <Routes>
                            <Route path='/home' element={<Home />} />
                            <Route path='/post' element={<AddPost />} />
                            <Route path='/search' element={<Search />} />
                            <Route path='/user/profile' element={<UserProfile />} />
                            <Route path='/user/notification' element={!isDesktop ? <NotificationPanel /> : <Home />} />
                        </Routes>
                    </div>

                    <div style={{ gridRow: 'span 2', width: "100%", overflowY: 'auto', display: !isDesktop && isMiniDesktop ? 'none' : 'flex', flexDirection: "column", alignItems: "center", padding: "1rem", gap: '1rem' }}>
                        {
                            isDesktop && !isMiniDesktop &&
                            <>
                                <NotificationPanel />
                                <div style={{ width: '100%', background: '#ffffff', padding: '.5rem' }}>
                                    <AddPost />
                                </div>
                            </>
                        }
                    </div>

                    {isDesktop && <UserProfile />}
                    {isMiniDesktop && <UserProfile />}

                </div>
                {
                    !isDesktop && !isMiniDesktop &&
                    <MobileFooter />
                }
        </>
    )
}