import React, { useEffect, useState } from 'react';
import './App.css';

const Ball = ({ style }) => (
  <div style={{
    ...style,
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: 'blue',
    position: 'absolute'
  }} />
);

const App = () => {
  const [ball1Style, setBall1Style] = useState({ top: '50%', left: '10%' });
  const [ball2Style, setBall2Style] = useState({ top: '50%', left: '80%' });
  const [showImage, setShowImage] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selected, setSelected] = useState(null);
  const correct = "Paris";

  useEffect(() => {
    const moveBalls = () => {
      let t = 0;
      const interval = setInterval(() => {
        t += 0.02;
        setBall1Style({
          top: `${50 + 10 * Math.sin(t * 3)}%`,
          left: `${10 + t * 35}%`
        });
        setBall2Style({
          top: `${50 + 10 * Math.cos(t * 3)}%`,
          left: `${80 - t * 35}%`
        });
        if (t >= 1) {
          clearInterval(interval);
          setShowImage(true);
          setTimeout(() => {
            setShowQuiz(true);
          }, 1500);
        }
      }, 30);
    };

    moveBalls();
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', background: '#f0f0f0' }}>
      {!showQuiz && <>
        <Ball style={ball1Style} />
        <Ball style={ball2Style} />
      </>}
      {showImage && <img src="/eiffel_tower.png" alt="Eiffel Tower" style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '200px', opacity: showQuiz ? 1 : 0.8, transition: 'opacity 1s'
      }} />}
      {showQuiz && (
        <div style={{
          position: 'absolute', top: '70%', left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
          <h2>Where is this?</h2>
          {['London', 'New York', 'Paris', 'Rome'].map((opt) => (
            <button key={opt} onClick={() => setSelected(opt)} style={{
              margin: '5px', padding: '10px 20px', fontSize: '16px',
              backgroundColor: selected
                ? opt === correct
                  ? 'green'
                  : opt === selected
                    ? 'red'
                    : '#ddd'
                : '#eee',
              color: selected ? '#fff' : '#000',
              cursor: selected ? 'default' : 'pointer'
            }}>{opt}</button>
          ))}
          {selected && <p style={{ marginTop: '1rem' }}>{selected === correct ? "Correct!" : `Incorrect. The correct answer is ${correct}.`}</p>}
        </div>
      )}
    </div>
  );
};

export default App;