import { useEffect, useState } from "react";
import { ratePost } from "../api/posts";

interface RateCardProps {
  closePanel?: () => void;
  postId?: string;
}

export default function RateCard({ closePanel, postId }: RateCardProps) {
    const rates = [1, 2, 3, 4, 5];
    const [isClicked, setClicked] = useState<number>(0);
    const [rateCardScale, setScale] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const handleClick = async (v: number) => {
        setClicked(v);
        setLoading(true);
        if (postId) {
            try {
                await ratePost(postId, v);
            } catch {}
        }
        setTimeout(() => {
            setLoading(false);
            if (closePanel) closePanel();
        }, 300);
    }

    useEffect(() => {
        setScale(1);
    }, []);
    
    return (
        <>
            <div style={{ display: 'flex', transform: `scale(${rateCardScale})`, transition: 'transform .4s ease', padding: '.4rem', borderRadius: '1rem', gap: '1rem', cursor: 'pointer', boxShadow: '0 0 1rem #4a484897', width: 'fit-content', opacity: loading ? 0.5 : 1 }}>
                {
                    rates.map((rate) => (
                        <img key={rate} src={`https://img.icons8.com/?size=100&id=104&format=png&color=${isClicked >= rate ? 'dfbf06' : '7a7a7a'}`} width={'30'} height={'30'} onClick={() => !loading && handleClick(rate)} style={{ cursor: 'pointer' }} />
                    ))
                }
            </div>
        </>
    )
}
