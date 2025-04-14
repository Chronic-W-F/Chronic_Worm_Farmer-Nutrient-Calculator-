import { useState } from 'react'; import Select from 'react-select';

export default function Home() { const [inputEC, setInputEC] = useState(''); const [startingEC, setStartingEC] = useState(''); const [results, setResults] = useState(null); const [waterType, setWaterType] = useState(null); const [nutrientPhase, setNutrientPhase] = useState(null); const [intensity, setIntensity] = useState(null);

const waterOptions = [ { value: 'Distilled', label: 'Distilled' }, { value: 'Filtered', label: 'Filtered' }, { value: 'Other', label: 'Other' }, { value: 'Rain', label: 'Rain' }, { value: 'RO', label: 'RO' }, { value: 'Spring', label: 'Spring' }, { value: 'Tap', label: 'Tap' }, { value: 'Well', label: 'Well' } ];

const phaseOptions = [ { value: 'veg', label: 'Veg (MaxiGrow only)' }, { value: 'flower', label: 'Early Flower (MaxiBloom only)' } ];

const intensityOptions = [ { value: 'light', label: 'Light' }, { value: 'medium', label: 'Medium' }, { value: 'aggressive', label: 'Aggressive' } ];

const calculate = () => { const ecInput = parseFloat(inputEC); const ecStart = parseFloat(startingEC) || 0; const targetEC = ecInput >= 20 ? ecInput / 500 : ecInput; const baseEC = Math.max(0, targetEC - ecStart); const ppmValue = Math.round(targetEC * 500);

let gramsPerEC = 0;
let nutrientLabel = '';

if (nutrientPhase?.value === 'veg') {
  nutrientLabel = 'MaxiGrow';
  if (intensity?.value === 'light') gramsPerEC = 2.5;
  else if (intensity?.value === 'medium') gramsPerEC = 2.5;
  else if (intensity?.value === 'aggressive') gramsPerEC = 3.25;
} else if (nutrientPhase?.value === 'flower') {
  nutrientLabel = 'MaxiBloom';
  if (intensity?.value === 'light') gramsPerEC = 2.0;
  else if (intensity?.value === 'medium') gramsPerEC = 2.0;
  else if (intensity?.value === 'aggressive') gramsPerEC = 2.6;
}

const gramsNeeded = (baseEC * gramsPerEC).toFixed(2);

setResults({
  ec: targetEC,
  ppm: ppmValue,
  nutrientLabel,
  gramsNeeded
});

};

return ( <main style={{ padding: '1rem', fontFamily: 'sans-serif' }}> <h1>Chronic Worm Farmer Nutrient Calculator</h1>

<label>Water Type:</label>
  <Select
    options={waterOptions}
    value={waterType}
    onChange={setWaterType}
    placeholder="Select Water Type"
  />

  <label>Starting EC of Water:</label>
  <input
    type="number"
    placeholder="e.g., 0.2"
    value={startingEC}
    onChange={(e) => setStartingEC(e.target.value)}
  />

  <label>Target EC or PPM:</label>
  <input
    type="text"
    placeholder="e.g., 2.0 or 1000"
    value={inputEC}
    onChange={(e) => setInputEC(e.target.value)}
  />

  <label>Nutrient Phase:</label>
  <Select
    options={phaseOptions}
    value={nutrientPhase}
    onChange={setNutrientPhase}
    placeholder="Select Phase"
  />

  <label>Feed Chart Intensity:</label>
  <Select
    options={intensityOptions}
    value={intensity}
    onChange={setIntensity}
    placeholder="Select Intensity"
  />

  <button onClick={calculate} style={{ marginTop: '1rem' }}>Convert</button>

  {results && (
    <div style={{ marginTop: '1.5rem' }}>
      <h2>Results:</h2>
      <p><strong>EC:</strong> {results.ec}</p>
      <p><strong>PPM (500 scale):</strong> {results.ppm}</p>
      <p><strong>{results.nutrientLabel}:</strong> {results.gramsNeeded} g/gal</p>
    </div>
  )}
</main>

); }

