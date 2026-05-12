import ImageSlider from "../components/slider";

const divs: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    gap: '1rem'
}
export default function Home () {

    return (
        <>
          <div style={divs}>
            <ImageSlider />
          </div>
        </>
    )
}