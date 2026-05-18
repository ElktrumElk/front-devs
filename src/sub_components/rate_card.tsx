import { useEffect, useState } from "react";

interface RateCardProps {
  isRate?: boolean;
}

export default function RateCard({ isRate = false }: RateCardProps) {
    const rates = [1, 2, 3, 4, 5];
    const [isClicked, setClicked] = useState<number>(1);
    const [isClickedbool, setClickedbool] = useState<boolean>(true);
    const [rateCardScale, setScale] = useState<number>(0);

    const handleClick = (v: number) => {
        setClicked(v);

        if (v === 1) {
            setClickedbool(!isClickedbool)
            return
        }
    }

    useEffect(() => {
        setScale(rateCardScale === 0 ? 1 : 0)
    }, []);
    
    return (
        <>
            <div style={{ display: 'flex', transform: `scale(${rateCardScale})`, transition: 'transform .4s ease', padding: '.4rem', borderRadius: '1rem', gap: '1rem', cursor: 'pointer', boxShadow: '0 0 1rem #4a484897', width: 'fit-content' }}>
                {
                    rates.map((rate) => (
                        <img key={rate} src={`https://img.icons8.com/?size=100&id=104&format=png&color=${isRate && isClicked >= rate ? 'dfbf06' : '7a7a7a'}`} width={'30'} height={'30'} onClick={() => handleClick(rate)} />
                    ))
                }
            </div>
        </>
    )
}