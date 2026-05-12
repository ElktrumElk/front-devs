
import { postsData } from "../data/mockData"

export default function PostCards() {

    const data = postsData;
    return (
        <>
            {
                data.map((dat, idx) => (
                    <div key={idx} style={{ width: '100%', borderRadius: '10px', background: 'white', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        <div style={{ width: '100%', padding: '.4rem', display: 'flex', justifyContent: 'space-between' }}>

                            <div style={{ display: 'flex', gap: '.3rem' }}>
                                <div style={{ background: '#03344b', width: '40px', height: '40px', color: 'white', padding: '20px', borderRadius: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <span>{dat.username.substring(0, 1)}</span>
                                </div>

                                <h4>{dat.username}</h4>
                                <span>{dat.username.substring(0, 4)}</span>
                            </div>
                            <div>
                                <span>Follow</span>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '250px', overflow: 'hidden', background: 'black', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', objectFit: 'cover' }}>
                            <img src={dat.img} style={{ width: 'inherit' }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong style={{ fontSize: '.9rem', lineHeight: '.9rem', color: '#033863' }}>{dat.category.toUpperCase()}</strong>
                            <span style={{ color: 'gray', fontSize: '.8rem', lineHeight: '.8rem' }}>{dat.time_posted}</span>
                        </div>

                        <article style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                            <h2>{dat.title}</h2>
                            <p style={{ color: '#5c5c5c' }}>{dat.description}</p>
                        </article>

                        <div style={{width: '100%', display: 'flex', gap: '.3rem', alignItems: 'center'}}>
                            <div>
                                <img alt="ratings" />
                                <span>{dat.ratings}</span>
                            </div>
                            <div>
                                <img alt="comment" />
                                <span>{dat.comment}</span>
                            </div>
                             <div>
                                <img alt="share"/>
                                <span>{dat.share}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}