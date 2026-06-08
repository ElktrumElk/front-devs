import { styleResponsive } from "../styles/responsivness";
import { ProgressBar } from "./progress_bar";

export default function RatingsComponent() {
  //calculate the ratings
  const ratingsCount = [8, 10, 3, 1, 6];
  const tRatings = 8 + 10 + 3 + 1 + 6;
  const displayRatings = tRatings / 5;
  const handleRatings = (value: number) => {
    return (value / Math.max(...ratingsCount)) * 100;
  };
  // Responsivenss of style
  const { isMobile } = styleResponsive();
  return (
    <>
      <div
        style={{
          width: "100%",
          borderRadius: "1rem",
          display: "flex",
          gap: ".5rem",
          background: "var(--global-panel-section-bg)",
          alignItems: "center",
          padding: ".5rem",
        }}
      >
        <div
          style={{
            width: isMobile ? "7rem" : "10rem",
            height: isMobile ? "7rem" : "10rem",
            borderRadius: "1rem",
            background: "#dedbdb",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{ fontSize: isMobile ? "2rem" : "3rem", color: "GrayText" }}
          >
            {displayRatings.toFixed(1)}
          </span>
        </div>
        <div style={{ flex: "1", display: "flex", height: "100%" }}>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              width: "100%",
            }}
          >
            <li style={styles.ulList}>
              <span>5</span>
              <ProgressBar value={handleRatings(8)} />
              <span>8</span>
            </li>
            <li style={styles.ulList}>
              <span>4</span>
              <ProgressBar value={handleRatings(10)} />
              <span>10</span>
            </li>
            <li style={styles.ulList}>
              <span>3</span>
              <ProgressBar value={handleRatings(3)} />
              <span>3</span>
            </li>
            <li style={styles.ulList}>
              <span>2</span>
              <ProgressBar value={handleRatings(1)} />
              <span>1</span>
            </li>
            <li style={styles.ulList}>
              <span>1</span>
              <ProgressBar value={handleRatings(6)} />
              <span>6</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  ulList: {
    display: "grid",
    gridTemplateColumns: ".1fr 1fr .1fr",
    gap: ".3rem",
    alignItems: "center",
    width: "100%",
    textAlign: "right",
  },
};
