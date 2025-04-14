import { useState } from 'react';
import Select from 'react-select';

export default function Home() {
  const [inputEC, setInputEC] = useState('');
  const [startingEC, setStartingEC] = useState('');
  const [ppm, setPPM] = useState('');
  const [results, setResults] = useState(null);
  const [waterType, setWaterType] = useState(null);

  const waterOptions = [
    { value: 'Distilled', label: 'Distilled' },
    { value: 'Filtered', label: 'Filtered' },
    { value: 'Other', label: 'Other' },
    { value: 'Rain', label: 'Rain' },
    { value: 'RO', label: 'RO' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Tap', label: 'Tap' },
    { value: 'Well', label: 'Well' }
  ];

  const calculate = () => {
    const ec = parseFloat(inputEC);
    const baseEC = parseFloat(startingEC) || 0;
    const nutrientEC = ec - baseEC;

    const ppmValue = Math.round(ec * 500);
    const maxigrow = +(nutrientEC * 1.5).toFixed(2);
    const maxibloom = +(nutrientEC * 1.3).toFixed(2);
    const koolbloom = +(nutrientEC * 0.6).toFixed(2);

    setPPM(ppmValue);
    setResults({ maxigrow, maxibloom, koolbloom });
  };

  return (
    <main style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Chronic Worm Farmer Nutrient Calculator</h1>

      <div style={{ marginBottom: '1rem' }}>
        <Select
          options={waterOptions}
          value={waterType}
          onChange={setWaterType}
          placeholder="Select water type"
          isClearable
        />
      </div>

      <input
        type="number"
        placeholder="Enter your starting EC (e.g., 1.2)"
        value={startingEC}
        onChange={(e) => setStartingEC(e.target.value)}
        style={{ marginBottom: '1rem', marginRight: '1rem' }}
      />

      <input
        type="number"
        placeholder="Enter target EC (e.g., 2.0)"
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
