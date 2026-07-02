import type React from "react";
import { useContext, useState } from "react";
import HomeButton from "../sub_components/home_btn";
import SearchButton from "../sub_components/search_btn";
import { styleResponsive } from "../styles/responsivness";
import PostButton from "../sub_components/post_btn";

import { UserTheme } from "../context/user_theme";

const sidebarStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--global-component-bg)',
    padding: '2rem 1rem',
    gridRow: 'span 2',
    color: 'var(--global-txt-cl)'

}

const sidebarContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column', // Vertical list positioning
    gap: '1.5rem',           // Clean separation margins instead of spaces
    alignItems: 'flex-start', // Left aligns items cleanly
    width: '100%',
    height: '100%',
    marginTop: '2rem'        // Creates room for top branding/logo area
}

// const logoPlaceholder: React.CSSProperties = {
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//     paddingLeft: '0.5rem',
//     color: '#010a1b'
// }

export default function DesktopSidebar() {
    const [pageButtonActive, setPageButtonActive] = useState('feed');
    const { isMiniDesktop } = styleResponsive()
    const {colorMode} = useContext(UserTheme)

    return (
        <aside style={sidebarStyle}>
            <h1>FrontDevs</h1>
            <nav style={sidebarContainer}>
                <HomeButton color={pageButtonActive === 'feed' ? colorMode === 'Dark' ? "ffffff" : "000000" : "7a7a7a"} active={setPageButtonActive} />
                <SearchButton color={pageButtonActive === 'search' ? colorMode === 'Dark' ? "ffffff" : "000000" : "7a7a7a"} active={setPageButtonActive} />

                {
                    isMiniDesktop &&
                    <>
                        <PostButton color="" active={setPageButtonActive} />
                    </>
                }

            </nav>
        </aside>
    );
}
