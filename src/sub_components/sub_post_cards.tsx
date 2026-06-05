import type { SetStateAction } from "react";
import { convertRate } from "../modules/rate_cnverter";
import type { Post } from "../api/posts";

interface pc {
    styles: {[key: string]: React.CSSProperties },
    list: Post[],
    expand: React.Dispatch<SetStateAction<boolean>>,
    cardId: React.Dispatch<SetStateAction<string>>
}


export function SubPostCard({ styles, list, expand, cardId }: pc) {

    return (
        <>
            < div style={styles.grid} >
                {
                    list.map((post) => (
                        <div key={post.id} style={styles.card} onClick={() => {expand(true); cardId(post.id)}}>
                            <div style={{ ...styles.imageThumb, backgroundImage: `url(${post.img})` }} />
                            <div style={styles.cardInfo}>
                                <span style={styles.username}>{post.author?.username || post.title}</span>
                                <div style={styles.ratingRow}>
                                    <span style={styles.star}>★</span>
                                    <span>{convertRate(post.ratings) || '4.8'}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div >
        </>
    )
}
