import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import MobileFooter from './components/mobileFooter';
import Header from './components/header';
import Search from './pages/search';
import AddPost from './pages/post';
import { styleResponsive } from './styles/responsivness';
import DesktopSidebar from './components/desktop_side_bar';
import UserProfile from './pages/userProfile';
import NotificationPanel from './pages/notifaction';


const subWrapperDesktop: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '.5fr 1.5fr 500px .7fr',
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

export default function App() {

  const { isMobile, isTablet } = styleResponsive();
  const isDesktop = !isMobile && !isTablet;

  return (
    <>
      <div className='app' >
        <div style={isDesktop ? subWrapperDesktop : subWrapperMobile}>

          {isDesktop && <DesktopSidebar />}
          {isMobile && <Header />}


          <div style={subWrapperMobile} className='subWrapper'>

            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/post' element={<AddPost />} />
              <Route path='/search' element={<Search />} />
            </Routes>
          </div>

          <div style={{ gridRow: 'span 2', width: "100%", overflowY: 'auto', display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem", gap: '1rem'}}>
            {
              isDesktop &&
              <>
                <NotificationPanel />
                <div style={{ width: '100%', background: '#ffffff', padding: '.5rem'}}>
                  <AddPost />
                </div>
              </>
            }
          </div>
          {isDesktop && <UserProfile />}

        </div>
        {
          isMobile &&
          <MobileFooter />
        }

      </div>
    </>
  )
}

