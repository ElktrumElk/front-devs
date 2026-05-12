import ImageSlider from "../components/slider";

const homecnt: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    gap: '1rem'
}

const imageSliderSection: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
}
export default function Home() {

    return (
        <>
            <div style={homecnt}>
                <section style={{width: '100%'}} id="imageSlider">
                    <div style={imageSliderSection}>
                        <h2 style={{fontSize: '.9rem', lineHeight: '.9rem'}}>Top Raters</h2>
                        <ImageSlider />
                    </div>
                </section>
            </div>
        </>
    )
}