import React, { useState, useEffect } from 'react';

// Define the shape of our slide data
interface SlideData {
  id: number;
  image: string;
  username: string;
  post: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: 'https://cdn.dribbble.com/userupload/25262631/file/original-dfe419a034fee3bb345f6c08def7e764.jpg?resize=1024x768&vertical=center',
    username: '@Vector_runner',
    post: 'Frontend development is the art of building the bridge between cold, logical code and the warm, human experience.'
  },
  {
    id: 2,
    image: 'https://cdn.dribbble.com/userupload/47291370/file/a5cd041c54c59188b352becbc0876956.webp?format=webp&resize=640x480&vertical=center',
    username: '@favmaclegend',
    post: "A great user interface is like glass: if you're doing your job right, the user doesn't even notice the code; they just see the content."
  },
  {
    id: 3,
    image: 'https://cdn.dribbble.com/userupload/28589049/file/original-4d1d34ee4b63573d8af620818125698e.png?format=webp&resize=1000x750&vertical=center',
    username: '@Sheik',
    post: "In the frontend world, we don't just write code; we curate pixels. Every margin, hover state, and transition is a conversation we're having with the user"
  }
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic: Advances every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div style={styles.container}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            ...styles.slide,
            opacity: index === currentIndex ? 1 : 0, // Smooth fade transition
          }}
        >
          {/* Background Image */}
          <div 
            style={{ 
              ...styles.image, 
              backgroundImage: `url(${slide.image})` 
            }} 
          />

          {/* Profile Overlay */}
          <div style={styles.overlay}>
            <div style={styles.profileContainer}>
              <h3 style={styles.username}>{slide.username}</h3>
              <p style={styles.postText}>{slide.post}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Indicators */}
      <div style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              ...styles.dot,
              backgroundColor: index === currentIndex ? '#fff' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// --- Styles Warehouse ---
const styles: { [key: string]: React.CSSProperties} = {
  container: {
    position: 'relative',
    width: '100%',
    height: '16rem',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    backgroundColor: '#000',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 1s ease-in-out', // Professional fade effect
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '40px 20px 20px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)', // Smooth gradient for text readability
    color: '#fff',
  },
  profileContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  username: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    fontFamily: 'sans-serif',
  },
  postText: {
    fontSize: '1rem',
    lineHeight: '1.5',
    opacity: 0.9,
    fontFamily: 'sans-serif',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    gap: '8px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};

export default ImageSlider;
