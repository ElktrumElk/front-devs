import type React from "react";
import HomeButton from "../sub_components/home_btn";
import PostButton from "../sub_components/post_btn";
import SearchButton from "../sub_components/search_btn";

const footerStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    position: 'fixed',
    bottom: '0',
    display: 'flex',

}

const footerContainer: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1
}

export default function MobileFooter() {
    return (
        <>
            <footer style={footerStyle}>
                <nav style={footerContainer}>
                    <HomeButton />
                    <PostButton />
                    <SearchButton />
                </nav>
            </footer>
        </>
    )
}