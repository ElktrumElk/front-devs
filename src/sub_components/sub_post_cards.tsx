import { convertRate } from "../modules/rate_cnverter";

interface Post {
    id: number;
    username: string;
    category: string;
    img: string;
    description: string;
    ratings: number; // Added optional rating
}

interface pc {
    styles: {[key: string]: React.CSSProperties },
    list: Post[]
}


export function SubPostCard({ styles, list }: pc) {

    return (
        <>
            {/* The 2-Column Grid */}
            < div style={styles.grid} >
                {
                    list.map((post) => (
                        <div key={post.id} style={styles.card}>
                            <div style={{ ...styles.imageThumb, backgroundImage: `url(${post.img})` }} />
                            <div style={styles.cardInfo}>
                                <span style={styles.username}>{post.username}</span>
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