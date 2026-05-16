import { useRef } from "react"
import GetIntouchButton from "./get_in_touch_btn"
import { getPostsByID } from "../data/get_post_data"
import { styleResponsive } from "../styles/responsivness";

interface viewcardProps {
    setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>,
    postId: number
}

export default function ViewCard({ setPanelOpen, postId }: viewcardProps) {

    const bk = useRef<HTMLDivElement>(null);
    const { isMobile } = styleResponsive()

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {

        if (bk) {
            if (e.target === bk.current) {
                setPanelOpen(false);
            }
        }
        return;
    }

    const [cardData] = getPostsByID(postId)

    return (
        <>
            <div className="backgroundContainer" ref={bk} style={styles.backgroundContainer} onClick={(e) => handleClose(e)}>
                <div className="viewCard" style={styles.viewCard}>
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

                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '.2rem', borderRadius: '1rem', background: '#f5f5f5', marginBottom: '1rem', justifyContent: 'space-between' }}>
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
        gap: '2rem',
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
        alignItems: 'center'
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
    }

}