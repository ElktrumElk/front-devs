import { useRef } from "react"
import GetIntouchButton from "./get_in_touch_btn"
import { getPostsByID } from "../data/get_post_data"
import { styleResponsive } from "../styles/responsivness";
import { ProgressBar } from "./progress_bar";

interface viewcardProps {
    setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>,
    postId: number
}

export default function ViewCard({ setPanelOpen, postId }: viewcardProps) {

    /**The background Element */
    const bk = useRef<HTMLDivElement>(null);
    const { isMobile } = styleResponsive() // mobile users

    /** Handle close of the view card */
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (bk) {
            if (e.target === bk.current) {
                setPanelOpen(false);
            }
        }
        return;
    }
    const handleCloseMobile = () => {

        setPanelOpen(false);
        return;
    }

    /** Data that is render on the view card */
    const [cardData] = getPostsByID(postId);
    const ratingsCount = [8, 10, 3, 1, 6]
    const tRatings  = 8 + 10 + 3 + 1 + 6;
    const displayRatings = tRatings / 5
    const handleRatings = (value: number) => {
        return value / Math.max(...ratingsCount) * 100;
        
    }

    return (
        <>
            <div className="backgroundContainer" ref={bk} style={styles.backgroundContainer} onClick={(e) => handleClose(e)}>
                <div className="viewCard viewCardMobile" style={styles.viewCard}>
                    <button style={{ alignSelf: 'flex-end', background: '#282828', border: 'none', padding: '.4rem', borderRadius: '1rem', color: 'white'}} onClick={handleCloseMobile}>Close</button>
                    <header style={styles.header}>
                        <div className="profileNameCnt" style={styles.profileNameCnt}>
                            <div style={styles.profileImageCnt}>
                                <img />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '.2rem' }}>
                                <h1 style={{ fontSize: '25px', lineHeight: '25px' }}>{cardData.username}</h1>
                                <span style={{ color: 'GrayText' }}>{cardData.usertag}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <GetIntouchButton isResponsive={isMobile ? true : false} />
                        </div>
                    </header>

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
                                <p style={{ color: 'GrayText' }}>image @ {cardData.usertag}</p>
                            </figcaption>
                        </div>
                    </figure>

                    <article style={{ display: 'flex', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.2rem', width: '100%', padding: '1rem' }}>
                            <h1>{cardData.title}</h1>
                            <p>{cardData.description}</p>
                        </div>
                    </article>

                    <div className="ratingCnt" style={{display: 'flex', flexDirection: 'column', width: '100%', marginBlockStart: '3rem', marginBlockEnd: '3rem'}}>
                        <h5>Ratings</h5>
                        <div style={{ width: '90%', display: 'flex', gap: '.5rem', background: '#f5f5f5', alignItems: 'center', padding: '.5rem' }}>
                            <div style={{ width: '10rem', height: '10rem', borderRadius: '1rem', background: '#dedbdb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '3rem', color: 'GrayText' }}>{displayRatings.toFixed(1)}</span>
                            </div>
                            <div style={{ flex: '1', display: 'flex' }}>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', width: '100%' }}>

                                    <li style={styles.ulList}>
                                        <span>5</span>
                                        <ProgressBar value={handleRatings(8)}/>
                                        <span>8</span>
                                    </li>
                                    <li style={styles.ulList}>
                                        <span>4</span>
                                        <ProgressBar value={handleRatings(10)}/>
                                        <span>10</span>
                                    </li>
                                    <li style={styles.ulList}>
                                        <span>3</span>
                                        <ProgressBar value={handleRatings(3)}/>
                                        <span>3</span>
                                    </li>
                                    <li style={styles.ulList}>
                                        <span>2</span>
                                        <ProgressBar value={handleRatings(1)}/>
                                        <span>1</span>
                                    </li>
                                    <li style={styles.ulList}>
                                        <span>1</span>
                                        <ProgressBar value={handleRatings(6)}/>
                                        <span>6</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="buttonCnt" style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '.2rem', borderRadius: '1rem', background: '#f5f5f5', marginBottom: '1rem', justifyContent: 'space-between', }}>
                        <input style={{ width: '100%', padding: '1rem', fontSize: '20px', outline: 'none', background: 'none', border: 'none' }} placeholder="Leave A comment" />
                        <button style={{ background: 'rgb(10, 0, 17)', width: '100px', padding: '1rem', border: 'none', borderRadius: '1rem', color: '#fff' }}>Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}



const styles: { [key: string]: React.CSSProperties } = {

    backgroundContainer: {
        background: '#11101049',
        inset: 0,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: '2000',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '3rem',
    },
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