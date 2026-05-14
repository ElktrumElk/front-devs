import { postsData } from "../data/mockData"
import { styleResponsive } from "../styles/responsivness";

const likesharecnt: React.CSSProperties = {
    display: 'flex',
    gap: '.2rem',
    color: 'gray',
    alignItems: 'center'
}

interface pc {
    postByCategory: string
}

export default function PostCards({ postByCategory }: pc) {

    const { isDesktop } = styleResponsive();


    const postData = postByCategory === 'All' ? postsData : postsData.filter(post => post.category === postByCategory)

    return (
        <>
            {
                postData.map((dat, idx) => (
                    <div key={idx} style={{ width: '100%', borderRadius: '10px', background: 'white', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        <div style={{ width: '100%', padding: '.4rem', display: 'flex', justifyContent: 'space-between' }}>

                            <div style={{ display: 'flex', gap: '.3rem' }}>
                                <div style={{ background: '#03344b', width: '40px', height: '40px', color: 'white', padding: '20px', borderRadius: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <span>{dat.username.substring(0, 1)}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
                                    <h4>{dat.username}</h4>
                                    <span style={{ color: 'GrayText', fontSize: '.8rem', lineHeight: '.8rem' }}>{dat.usertag}</span>
                                </div>
                            </div>
                            <div>
                                <span>Follow</span>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: isDesktop ? '350px' : '250px', overflow: 'hidden', background: 'black', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', objectFit: 'cover' }}>
                            <img src={dat.img} style={{ width: 'inherit', height: 'inherit', objectFit: 'cover' }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong style={{ fontSize: '.9rem', lineHeight: '.9rem', color: '#033863' }}>{dat.category.toUpperCase()}</strong>
                            <span style={{ color: 'gray', fontSize: '.8rem', lineHeight: '.8rem' }}>{dat.time_posted}</span>
                        </div>

                        <article style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                            <h2>{dat.title}</h2>
                            <p style={{ color: '#5c5c5c' }}>{dat.description}</p>
                        </article>

                        <div style={{ width: '100%', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={likesharecnt}>
                                <img src="https://img.icons8.com/?size=100&id=104&format=png&color=000000" width="20px" height="20px" alt="ratings" />
                                <span>{dat.ratings}</span>
                            </div>
                            <div style={likesharecnt}>
                                <img src="https://img.icons8.com/?size=100&id=143&format=png&color=000000" width="20px" height="20px" alt="comment" />
                                <span>{dat.comment}</span>
                            </div>
                            <div style={likesharecnt}>
                                <img src="https://img.icons8.com/?size=100&id=TDCU7KRViM2Q&format=png&color=000000" width="20px" height="20px" alt="share" />
                                <span>{dat.share}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                postData.length === 0 &&
                <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'GrayText' }}>
                    <span style={{ fontSize: '14px' }}>No post Available for this category yet. You can add Post</span>
                </div>
            }
        </>
    )
}

