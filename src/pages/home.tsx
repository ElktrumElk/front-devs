import { useState, type SetStateAction } from "react";
import PostCards from "../components/post_cards";
import ImageSlider from "../components/slider";
import Categories from "../sub_components/categories";

const homecnt: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    gap: '1rem',
    overflowY: 'auto'

}

const imageSliderSection: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
}

interface home {
    setIsViewCard: React.Dispatch<SetStateAction<boolean>>,
    setViewCardId: React.Dispatch<SetStateAction<number>>,
    setViewComment: React.Dispatch<SetStateAction<boolean>>,
    setCommentId: React.Dispatch<SetStateAction<number>>
}

export default function Home({ setIsViewCard, setViewCardId, setViewComment, setCommentId }: home) {

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
                        <PostCards postByCategory={pbc} expand={setIsViewCard} cardId={setViewCardId} setViewComment={setViewComment} setCommentId={setCommentId as unknown as React.Dispatch<SetStateAction<string>>} />
                    </div>
                </section>
            </div>
        </>
    )
}