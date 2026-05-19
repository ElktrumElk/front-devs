import { useEffect, useState } from "react";

interface RateCardProps {
  closePanel?: () => void;
}

export default function RateCard({ closePanel }: RateCardProps) {
    const rates = [1, 2, 3, 4, 5];
    const [isClicked, setClicked] = useState<number>(0);
    const [rateCardScale, setScale] = useState<number>(0);

    const handleClick = (v: number) => {
        setClicked(v);
        // Close panel after selection
        setTimeout(() => {
            if (closePanel) closePanel();
        }, 300);
    }

    useEffect(() => {
        setScale(1);
    }, []);
    
    return (
        <>
            <div style={{ display: 'flex', transform: `scale(${rateCardScale})`, transition: 'transform .4s ease', padding: '.4rem', borderRadius: '1rem', gap: '1rem', cursor: 'pointer', boxShadow: '0 0 1rem #4a484897', width: 'fit-content' }}>
                {
                    rates.map((rate) => (
                        <img key={rate} src={`https://img.icons8.com/?size=100&id=104&format=png&color=${isClicked >= rate ? 'dfbf06' : '7a7a7a'}`} width={'30'} height={'30'} onClick={() => handleClick(rate)} style={{ cursor: 'pointer' }} />
                    ))
                }
            </div>
        </>
    )
}