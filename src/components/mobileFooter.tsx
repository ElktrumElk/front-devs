import type React from "react";
import HomeButton from "../sub_components/home_btn";
import PostButton from "../sub_components/post_btn";
import SearchButton from "../sub_components/search_btn";
import { useState } from "react";

const footerStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    position: 'fixed',
    bottom: '0',
    display: 'flex',
    background: '#ffffff'

}

const footerContainer: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1
}

export default function MobileFooter() {
    const [pageButtonActive, setPageButtonActive] = useState('feed');

    return (
        <>
            <footer style={footerStyle}>
                <nav style={footerContainer}>
                    <HomeButton color={pageButtonActive === 'feed' ? "0e0d0d" : "7a7a7a"} active={setPageButtonActive}/>
                    <PostButton color="ffffff" active={setPageButtonActive}/>
                    <SearchButton color={pageButtonActive === 'search' ? "0e0d0d" : "7a7a7a"} active={setPageButtonActive}/>
                </nav>
            </footer>
        </>
    )
}