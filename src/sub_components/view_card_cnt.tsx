import { ProgressBar } from "./progress_bar";
import GetIntouchButton from "./get_in_touch_btn"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPostById, getRatingBreakdown, type Post, type RatingBreakdown } from "../api/posts";
import { styleResponsive } from "../styles/responsivness";
import GetInTouchPanel from "./get_intouch_panel";

interface coord {
    x: number,
    y: number
}


interface viewcardProps {
    setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setCardScale: React.Dispatch<React.SetStateAction<number>>,
    setPop: React.Dispatch<React.SetStateAction<number>>,
    pop: number,
    postId: string,
    viewCardCoordinate: coord
}

export default function ViewCardCnt({ setPanelOpen, postId, viewCardCoordinate, setPop, pop }: viewcardProps) {
    const navigate = useNavigate();
    const { isMobile } = styleResponsive()
    const [cardData, setCardData] = useState<Post | null>(null);
    const [ratingBreakdown, setRatingBreakdown] = useState<RatingBreakdown | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!postId) return;
        setLoading(true);
        Promise.all([
            getPostById(postId),
            getRatingBreakdown(postId)
        ])
            .then(([postRes, ratingRes]) => {
                setCardData(postRes.data);
                setRatingBreakdown(ratingRes.data);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [postId]);

    const ratingsCount = ratingBreakdown?.breakdown || [0, 0, 0, 0, 0];
    const displayRatings = ratingBreakdown?.average || 0;
    const handleRatings = (value: number) => {
        const max = Math.max(...ratingsCount, 1);
        return value / max * 100;
    }

    const handleCloseMobile = () => {
        setPanelOpen(false);
        return;
    }

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            setPop(pop === 0 ? 1 : 0);
        })
        return () => cancelAnimationFrame(id);
    }, [setPanelOpen]);

    const [showGetIntouchPanel, setGetIntouchPane] = useState<boolean>(false);

    if (loading || !cardData) {
        return (
            <div style={{ ...styles.viewCard, transform: `scale(${pop})`, transition: 'transform .2s ease' }}>
                <p style={{ padding: '2rem', textAlign: 'center', color: 'GrayText' }}>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="viewCard viewCardMobile" style={{ ...styles.viewCard, transform: `scale(${pop})`, transition: 'transform .2s ease', transformOrigin: isMobile ? `center ${viewCardCoordinate.y}` : `${viewCardCoordinate.x}px ${viewCardCoordinate.y}px` }}>
                <header style={styles.header}>
                    <div className="profileNameCnt" onClick={() => navigate(`/app/user/${cardData.author?.username}`)} style={{ ...styles.profileNameCnt, cursor: 'pointer' }}>
                        <div style={styles.profileImageCnt}>
                            <img />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.2rem' }}>
                            <h1 style={{ fontSize: '25px', lineHeight: '25px' }}>{cardData.author?.username}</h1>
                            <span style={{ color: 'GrayText' }}>{cardData.author?.usertag}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <GetIntouchButton panelState={showGetIntouchPanel} isResponsive={isMobile ? true : false} showPanel={setGetIntouchPane} />
                        {showGetIntouchPanel && cardData.author && <GetInTouchPanel username={cardData.author.username} />}
                        <button style={{ alignSelf: 'flex-end', cursor: 'pointer', background: 'none', border: 'none', padding: '.4rem', borderRadius: '1rem', color: 'white' }} onClick={handleCloseMobile}>
                            <img src="https://img.icons8.com/?size=100&id=8112&format=png&color=7a7a7a" width={'20'} height={'20'} />
                        </button>
                    </div>
                </header>

                <div className="view-card-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    <figure style={styles.figure}>
                        <div style={styles.figureCnt}>
                            <div style={styles.figureImageCnt}>
                                <img style={styles.previewImage} src={cardData.img} />
                                <button style={styles.previewLinkImgCnt}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', inset: 0, background: '#000000be' }}>
                                        <strong style={{ color: '#fff', fontWeight: 'bolder', fontSize: '1rem' }}>Preview</strong>
                                    </div>
                                    <img style={styles.previewLink} src={cardData.img} />
                                </button>
                            </div>
                            <figcaption>
                                <p style={{ color: 'GrayText' }}>image of {cardData.author?.usertag}</p>
                            </figcaption>
                        </div>
                    </figure>

                    <article style={{ display: 'flex', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.2rem', width: '100%', padding: '.1rem', marginTop: '1rem' }}>
                            <h1 style={{ fontSize: isMobile ? '1.6rem' : '1rem' }}>{cardData.title}</h1>
                            <p style={{ color: 'rgba(58, 58, 58, 0.9)' }}>{cardData.description}</p>
                        </div>
                    </article>

                    <div className="ratingCnt" style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBlockStart: '1rem', marginBlockEnd: '1rem' }}>
                        <h5 style={{ color: 'gray' }}>Ratings</h5>
                        <div style={{ width: '100%', borderRadius: '1rem', display: 'flex', gap: '.5rem', background: '#f5f5f5', alignItems: 'center', padding: '.5rem' }}>
                            <div style={{ width: isMobile ? '7rem' : '10rem', height: isMobile ? '7rem' : '10rem', borderRadius: '1rem', background: '#dedbdb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: isMobile ? '2rem' : '3rem', color: 'GrayText' }}>{displayRatings.toFixed(1)}</span>
                            </div>
                            <div style={{ flex: '1', display: 'flex', height: '100%' }}>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', width: '100%' }}>

                                    <li style={styles.ulList}>
                                        <span>5</span>
                                        <ProgressBar value={handleRatings(ratingsCount[4])} />
                                        <span>{ratingsCount[4]}</span>
                                    </li>
                                    <li style={styles.ulList}>
                                        <span>4</span>
                                        <ProgressBar value={handleRatings(ratingsCount[3])} />
                                        <span>{ratingsCount[3]}</span>
                                    </li>
                                    <li style={styles.ulList}>
                                        <span>3</span>
                                        <ProgressBar value={handleRatings(ratingsCount[2])} />
                                        <span>{ratingsCount[2]}</span>
                                    </li>
                                    <li style={styles.ulList}>
                                        <span>2</span>
                                        <ProgressBar value={handleRatings(ratingsCount[1])} />
                                        <span>{ratingsCount[1]}</span>
                                    </li>
                                    <li style={styles.ulList}>
                                        <span>1</span>
                                        <ProgressBar value={handleRatings(ratingsCount[0])} />
                                        <span>{ratingsCount[0]}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const styles: { [key: string]: React.CSSProperties } = {


    viewCard: {
        width: '50rem',
        height: 'auto',
        padding: '1rem',
        background: '#fff',
        borderRadius: '1rem',
        gap: '.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '0 0 auto',

    },

    header: {
        width: '100%',
        padding: '.3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    },

    profileNameCnt: {
        display: 'flex',
        alignItems: 'center',
        gap: '.2rem',
        cursor: 'pointer'
    },

    profileImageCnt: {
        width: '50px',
        height: '50px',
        borderRadius: '40px',
        background: '#000'
    },

    figure: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    figureCnt: {
        width: '100%',
        minHeight: '100px',
        maxHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '1rem',

    },

    figureImageCnt: {
        width: '100%',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '1rem',
    },

    previewImage: {
        width: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
    },

    previewLinkImgCnt: {
        position: 'absolute',
        right: '20px',
        bottom: '20px',
        width: '100px',
        height: '100px',
        borderRadius: '.8rem',
        background: '#000',
        border: 'none',
        boxShadow: '0 1px 1rem #edeaea',
        objectFit: 'cover',
        overflow: 'hidden'


    },
    previewLink: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },

    ulList: {
        display: 'grid',
        gridTemplateColumns: '.1fr 1fr .1fr',
        gap: '.3rem',
        alignItems: 'center',
        width: '100%',
        textAlign: 'right'
    }

}
