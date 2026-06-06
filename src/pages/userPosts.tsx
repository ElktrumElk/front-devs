import { postsData } from "../data/mockData"
import StyleUtilities from "../styles/style_utility"
import { SubPostCard } from "../sub_components/sub_post_cards"
import type { userprofile } from "./userProfile"




export default function UserPostsPage ({expandPost, postId}: userprofile) {
    const data = localStorage.getItem('data')
    const userTag = JSON.parse(data as unknown as string).usertag || null
    const postByUser = postsData.filter(x => x.usertag === userTag)
    const {subPostCards} = StyleUtilities()

    return (
        <>
            <section style={userPostStyle.postCnt}>
                <h1 style={{fontSize: '1.5rem', lineHeight: '1.5rem'}}>Posts</h1>
                <SubPostCard list={postByUser} expand={expandPost} cardId={postId} styles={subPostCards} />
            </section>
        </>
    )
}

interface style {
    postCnt: React.CSSProperties
    scrollView: React.CSSProperties
}

const userPostStyle: style  = {
    
    postCnt: {
        inset: '0',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        background: 'var(--global-component-bg)',
        padding: '1rem'
    },

    scrollView: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 400px))',
        gap: '1rem',
        overflowY: 'auto'
    }
}