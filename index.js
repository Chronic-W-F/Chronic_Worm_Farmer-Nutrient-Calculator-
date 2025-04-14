
import { useState } from 'react';

export default function Home() {
  const [inputEC, setInputEC] = useState('');
  const [ppm, setPPM] = useState('');
  const [results, setResults] = useState(null);

  const calculate = () => {
    const ec = parseFloat(inputEC);
    const ppmValue = Math.round(ec * 500);
    const maxigrow = +(ec * 1.5).toFixed(2);
    const maxibloom = +(ec * 1.3).toFixed(2);
    const koolbloom = +(ec * 0.6).toFixed(2);
    setPPM(ppmValue);
    setResults({ maxigrow, maxibloom, koolbloom });
  };

  return (
    <main style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h1>Chronic Worm Farmer Nutrient Calculator</h1>
      <input
        type="number"
        placeholder="Enter EC (e.g., 2.0)"
        value={inputEC}
        onChange={(e) => setInputEC(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <button onClick={calculate}>Convert</button>
      {results && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>PPM:</strong> {ppm}</p>
          <p><strong>MaxiGrow:</strong> {results.maxigrow} g/gal</p>
          <p><strong>MaxiBloom:</strong> {results.maxibloom} g/gal</p>
          <p><strong>KoolBloom:</strong> {results.koolbloom} g/gal</p>
        </div>
      )}
    </main>
  );
}
