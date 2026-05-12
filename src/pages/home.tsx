import { useState } from "react";
import PostCards from "../components/post_cards";
import ImageSlider from "../components/slider";
import Categories from "../sub_components/categories";

const homecnt: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    gap: '1rem'
}

const imageSliderSection: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
}
export default function Home() {

    /**Post By category */
    const [pbc, setpbc] = useState('All');

    return (
        <>
            <div style={homecnt}>

                <section style={{ width: '100%' }} id="imageSlider">
                    <div style={imageSliderSection}>
                        <h2 style={{ fontSize: '.9rem', lineHeight: '.9rem' }}>Top Raters</h2>
                        <ImageSlider />
                    </div>
                </section>

                <nav style={{ width: '100%' }}>
                    <Categories setCategory={setpbc} />
                </nav>

                <section id="post-feeds" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '1rem' }}>
                        <PostCards postByCategory={pbc} />
                    </div>
                </section>
            </div>
        </>
    )
}