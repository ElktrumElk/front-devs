import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './home';
import MobileFooter from '../components/mobileFooter';
import Header from '../components/header';
import Search from './search';
import AddPost from './post';
import { styleResponsive } from '../styles/responsivness';
import DesktopSidebar from '../components/desktop_side_bar';
import UserProfile from './userProfile';
import NotificationPanel from './notifaction';
import { useState } from 'react';
import ViewCard from '../sub_components/view_card';
import ViewCommentPanel from '../sub_components/view_comments';
import useViewCardContext from '../context/view_card_context';




const subWrapperDesktop: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '200px 1.5fr 1fr 400px',
    width: "100%",
    maxWidth: '2500px',
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
    const { isViewCard, setIsViewCard, viewCardId, setViewCardId } = useViewCardContext();
    const [isViewComment, setViewComment] = useState<boolean>(false);
    const [commentId, setCommentId] = useState<string>('');
    const [viewCardCordinates, setViewCardCoordinates] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [cardScale, setCardScale] = useState<number>(1);
    const location = useLocation();
    const hiddenHeaderRoutes = ['/app/post', '/app/user/profile', '/app/user/notification'];
    const showHeader = !hiddenHeaderRoutes.includes(location.pathname);

    return (
        <>
            <div className={isViewCard ? 'mainCnt' : ''} style={isDesktop ? subWrapperDesktop : isMiniDesktop ? subWrapperDesktopMini : subWrapperMobile}>
                {isViewCard && <ViewCard setCardScale={setCardScale} setPanelOpen={setIsViewCard} postId={viewCardId} viewCardCoordinate={viewCardCordinates} />}
                {isViewComment && <ViewCommentPanel setPanelOpen={setViewComment} commentId={commentId} />}

                {isDesktop && <DesktopSidebar />}
                {isMiniDesktop && <DesktopSidebar />}
                {!isDesktop && !isMiniDesktop && showHeader && <Header />}


                <div style={isTablet ? subWrapperTablet : subWrapperMobile} className='subWrapper'>
                    <Routes>
                        <Route path='/home' element={<Home setCardScale={setCardScale} cardScale={cardScale} setViewCardCoordinates={setViewCardCoordinates} setIsViewCard={setIsViewCard} setViewCardId={setViewCardId} setViewComment={setViewComment} setCommentId={setCommentId} />} />
                        <Route path='/post' element={<AddPost />} />
                        <Route path='/search' element={<Search setIsViewCard={setIsViewCard} setViewCardId={setViewCardId} />} />
                        <Route path='/user/profile' element={<UserProfile postId={setViewCardId} expandPost={setIsViewCard} />} />
                        <Route path='/user/:username' element={<UserProfile postId={setViewCardId} expandPost={setIsViewCard} isPublicView={true} />} />
                        <Route path='/user/notification' element={!isDesktop ? <NotificationPanel /> : <Home setCardScale={setCardScale} cardScale={cardScale} setViewCardCoordinates={setViewCardCoordinates} setIsViewCard={setIsViewCard} setViewCardId={setViewCardId} setViewComment={setViewComment} setCommentId={setCommentId} />} />
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

                {isDesktop && <UserProfile postId={setViewCardId} expandPost={setIsViewCard} />}
                {isMiniDesktop && <UserProfile postId={setViewCardId} expandPost={setIsViewCard} />}

            </div>
            {
                !isDesktop && !isMiniDesktop &&
                <MobileFooter />
            }
        </>
    )
}