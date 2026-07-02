import { useEffect, useRef, useState } from "react"
import ViewCardCnt from "./view_card_cnt";

interface coord {
    x: number,
    y: number
}

interface viewcardProps {
    setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setCardScale: React.Dispatch<React.SetStateAction<number>>,
    postId: string,
    viewCardCoordinate: coord
}

export default function ViewCard({ setCardScale, setPanelOpen, postId, viewCardCoordinate }: viewcardProps) {

    /**The background Element */
    const bk = useRef<HTMLDivElement>(null);
    const [pop, setPop] = useState<number>(0);

    /** Handle close of the view card */
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (bk) {
            if (e.target === e.currentTarget) {
                requestAnimationFrame(() => {
                    setPop(pop === 0 ? 1 : 0);
                })
                setTimeout(() => {
                    setPanelOpen(false);
                }, 400)
            }
        }
        return;
    }

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    return (
        <>
            {
                <div className="backgroundContainer" ref={bk} style={backgroundContainer} onClick={(e) => { 
                    handleClose(e);
                    if (e.target === e.currentTarget) {
                        setCardScale(1) 
                    }
                 }}>
                    <ViewCardCnt setPanelOpen={setPanelOpen} postId={postId} viewCardCoordinate={viewCardCoordinate} setPop={setPop} pop={pop} setCardScale={setCardScale} />
                </div>
            }
        </>
    )
}


const backgroundContainer: React.CSSProperties = {
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
}
