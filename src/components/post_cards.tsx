
import { postsData } from "../data/mockData"

export default function PostCards() {

    const data = postsData;
    return (
        <>
            {
                data.map((dat, idx) => (
                    <div key={idx} style={{ width: '100%', borderRadius: '10px', background: 'white', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        <div style={{ width: '100%', padding: '.4rem', display: 'flex', justifyContent: 'space-between' }}>

                            <div style={{display: 'flex', gap: '.3rem'}}>
                                <div style={{background: '#03344b', width: '40px', height: '40px', color: 'white', padding: '20px', borderRadius: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                    <span>{dat.username.substring(0, 1)}</span>
                                </div>

                                <h4>{dat.username}</h4>
                                <span>{dat.username.substring(0, 4)}</span>
                            </div>
                            <div>
                                <span>Follow</span>
                            </div>
                        </div>

                        <div style={{width: '100%', height: '200px', overflow: 'hidden', background: 'black', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', objectFit: 'cover'}}>
                            <img src={dat.img} style={{width: 'inherit'}}/>
                        </div>
                    </div>
                ))
            }
        </>
    )
}