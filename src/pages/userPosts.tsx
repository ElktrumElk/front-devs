import { useEffect, useState } from "react"
import StyleUtilities from "../styles/style_utility"
import { SubPostCard } from "../sub_components/sub_post_cards"
import { getMe } from "../api/auth"
import { getUserPosts, type Post } from "../api/posts"
import type React from "react"

interface userprofile {
    expandPost: React.Dispatch<React.SetStateAction<boolean>>,
    postId: React.Dispatch<React.SetStateAction<string>>
}

export default function UserPostsPage ({expandPost, postId}: userprofile) {
    const [posts, setPosts] = useState<Post[]>([])
    const {subPostCards} = StyleUtilities()

    useEffect(() => {
        const f = async () => {
            try {
                const { data } = await getMe()
                const postsRes = await getUserPosts(data.username)
                setPosts(postsRes.data.posts)
            } catch {
                setPosts([])
            }
        }
        f()
    }, [])

    return (
        <section style={userPostStyle.postCnt}>
            <h1 style={{fontSize: '1.5rem', lineHeight: '1.5rem'}}>Posts</h1>
            <SubPostCard list={posts} expand={expandPost} cardId={postId} styles={subPostCards} />
        </section>
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
