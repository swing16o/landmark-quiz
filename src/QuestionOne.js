import { useState, useEffect } from 'react';

const QuestionOne = () => {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(15);
  const options = ["London", "New York", "Paris", "Rome"];
  const correct = "Paris";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setRevealed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setRevealed(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ height: '8px', background: '#ccc', marginBottom: '1rem' }}>
        <div style={{
          height: '100%',
          background: 'red',
          width: `${(timer / 15) * 100}%`,
          transition: 'width 1s linear'
        }} />
      </div>
      <h2>Where is this?</h2>
      <img src="/eiffel_tower.png" alt="Eiffel Tower" style={{ maxWidth: '300px', borderRadius: '8px' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            style={{
              padding: '1rem',
              margin: '0.5rem',
              backgroundColor: revealed
                ? option === correct
                  ? 'green'
                  : option === selected
                    ? 'red'
                    : '#eee'
                : '#eee',
              color: revealed ? '#fff' : '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: revealed ? 'default' : 'pointer',
              fontSize: '1rem'
            }}
            disabled={revealed}
          >
            {option}
          </button>
        ))}
      </div>
      {revealed && (
        <p style={{ marginTop: '1rem' }}>
          {selected === correct ? "Correct!" : `Incorrect. The correct answer is ${correct}.`}
        </p>
      )}
    </div>
  );
};

export default QuestionOne;