import { useState } from 'react';
import Select from 'react-select';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [startingEC, setStartingEC] = useState('');
  const [waterType, setWaterType] = useState(null);
  const [phase, setPhase] = useState(null);
  const [calculated, setCalculated] = useState(null);

  const phaseOptions = [
    { value: 'veg', label: 'Veg (MaxiGrow only)' },
    { value: 'early', label: 'Early Flower (MaxiBloom only)' },
    { value: 'mid', label: 'Mid Flower (MaxiBloom + low KoolBloom)' },
    { value: 'late', label: 'Late Flower (MaxiBloom + full KoolBloom)' },
  ];

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
    const rawInput = inputValue.trim();
    const baseEC = parseFloat(startingEC) || 0;

    let targetEC = 0;
    let ppm = 0;

    // Detect EC or PPM based on input pattern
    if (rawInput.includes('.') || parseInt(rawInput) < 20) {
      // Treat as EC
      targetEC = parseFloat(rawInput);
      ppm = Math.round(targetEC * 500);
    } else {
      // Treat as PPM
      ppm = parseInt(rawInput);
      targetEC = +(ppm / 500).toFixed(2);
    }

    const nutrientEC = targetEC - baseEC;

    // Nutrient calculations
    let maxigrow = 0;
    let maxibloom = 0;
    let koolbloom = 0;

    if (phase?.value === 'veg') {
      maxigrow = +(nutrientEC * 1.5).toFixed(2);
    } else if (phase?.value === 'early') {
      maxibloom = +(nutrientEC * 1.3).toFixed(2);
    } else if (phase?.value === 'mid') {
      maxibloom = +(nutrientEC * 1.2).toFixed(2);
      koolbloom = +(nutrientEC * 0.25).toFixed(2);
    } else if (phase?.value === 'late') {
      maxibloom = +(nutrientEC * 1.3).toFixed(2);
      koolbloom = +(nutrientEC * 0.6).toFixed(2);
    }

    setCalculated({
      targetEC,
      ppm,
      maxigrow,
      maxibloom,
      koolbloom
    });
  };

  return (
    <main style={{ padding: '1rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Chronic Worm Farmer Nutrient Calculator</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Water Type:</label>
        <Select
          options={waterOptions}
          value={waterType}
          onChange={setWaterType}
          placeholder="Select water type"
          isClearable
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Starting EC of Water:</label>
        <input
          type="number"
          placeholder="e.g., 0.3"
          value={startingEC}
          onChange={(e) => setStartingEC(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Target EC or PPM:</label>
        <input
          type="text"
          placeholder="Enter EC (e.g., 2.0) or PPM (e.g., 1000)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Nutrient Phase:</label>
        <Select
          options={phaseOptions}
          value={phase}
          onChange={setPhase}
          placeholder="Select grow phase"
        />
      </div>

      <button onClick={calculate} style={{ padding: '0.5rem 1rem' }}>
        Convert
      </button>

      {calculated && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Results:</h3>
          <p><strong>EC:</strong> {calculated.targetEC}</p>
          <p><strong>PPM (500 scale):</strong> {calculated.ppm}</p>
          {calculated.maxigrow > 0 && <p><strong>MaxiGrow:</strong> {calculated.maxigrow} g/gal</p>}
          {calculated.maxibloom > 0 && <p><strong>MaxiBloom:</strong> {calculated.maxibloom} g/gal</p>}
          {calculated.koolbloom > 0 && <p><strong>KoolBloom:</strong> {calculated.koolbloom} g/gal</p>}
        </div>
      )}
    </main>
  );
}
