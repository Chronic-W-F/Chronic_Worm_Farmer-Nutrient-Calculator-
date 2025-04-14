import { useState } from 'react'; import Select from 'react-select';

export default function Home() { const [startingEC, setStartingEC] = useState(''); const [targetEC, setTargetEC] = useState(''); const [waterType, setWaterType] = useState(null); const [nutrientPhase, setNutrientPhase] = useState(null); const [feedIntensity, setFeedIntensity] = useState(null); const [results, setResults] = useState(null);

const waterOptions = [ { value: 'Distilled', label: 'Distilled' }, { value: 'Filtered', label: 'Filtered' }, { value: 'Other', label: 'Other' }, { value: 'Rain', label: 'Rain' }, { value: 'RO', label: 'RO' }, { value: 'Spring', label: 'Spring' }, { value: 'Tap', label: 'Tap' }, { value: 'Well', label: 'Well' }, ];

const nutrientPhases = [ { value: 'veg', label: 'Veg (MaxiGrow only)' }, { value: 'early', label: 'Early Flower (MaxiBloom only)' }, { value: 'mid', label: 'Mid Flower (MaxiBloom + KoolBloom)' }, { value: 'late', label: 'Late Flower (MaxiBloom + KoolBloom)' }, ];

const feedIntensities = [ { value: 'light', label: 'Light' }, { value: 'medium', label: 'Medium' }, { value: 'aggressive', label: 'Aggressive' }, ];

const calculate = () => { const ec = parseFloat(targetEC); const baseEC = parseFloat(startingEC) || 0; const adjustedEC = ec - baseEC; const ppm = Math.round(ec * 500);

let maxigrow = null;
let maxibloom = null;
let koolbloom = null;

if (nutrientPhase?.value === 'veg') {
  if (feedIntensity?.value === 'light') maxigrow = +(adjustedEC * 2.56).toFixed(2);
  if (feedIntensity?.value === 'medium') maxigrow = +(adjustedEC * 2.89).toFixed(2);
  if (feedIntensity?.value === 'aggressive') maxigrow = +(adjustedEC * 3.61).toFixed(2);
} else {
  if (feedIntensity?.value === 'light') maxibloom = +(adjustedEC * 2.56).toFixed(2);
  if (feedIntensity?.value === 'medium') maxibloom = +(adjustedEC * 2.89).toFixed(2);
  if (feedIntensity?.value === 'aggressive') maxibloom = +(adjustedEC * 3.61).toFixed(2);

  if (nutrientPhase?.value === 'mid') koolbloom = +(adjustedEC * 0.25).toFixed(2);
  if (nutrientPhase?.value === 'late') koolbloom = +(adjustedEC * 0.60).toFixed(2);
}

setResults({ ec, ppm, maxigrow, maxibloom, koolbloom });

};

return ( <main style={{ padding: '1rem', fontFamily: 'Arial' }}> <h1>Chronic Worm Farmer Nutrient Calculator</h1>

<label style={{ fontWeight: 'bold' }}>Water Type:</label>
  <Select options={waterOptions} value={waterType} onChange={setWaterType} />

  <label style={{ fontWeight: 'bold', marginTop: '1rem', display: 'block' }}>Starting EC of Water:</label>
  <input
    type="number"
    value={startingEC}
    onChange={(e) => setStartingEC(e.target.value)}
    style={{ width: '100%', marginBottom: '1rem' }}
  />

  <label style={{ fontWeight: 'bold' }}>Target EC or PPM:</label>
  <input
    type="text"
    value={targetEC}
    onChange={(e) => setTargetEC(e.target.value)}
    style={{ width: '100%', marginBottom: '1rem' }}
  />

  <label style={{ fontWeight: 'bold' }}>Nutrient Phase:</label>
  <Select options={nutrientPhases} value={nutrientPhase} onChange={setNutrientPhase} />

  <label style={{ fontWeight: 'bold', marginTop: '1rem', display: 'block' }}>Feed Chart Intensity:</label>
  <Select options={feedIntensities} value={feedIntensity} onChange={setFeedIntensity} />

  <button onClick={calculate} style={{ marginTop: '1rem' }}>Convert</button>

  {results && (
    <div style={{ marginTop: '2rem' }}>
      <h2>Results:</h2>
      <p><strong>EC:</strong> {results.ec}</p>
      <p><strong>PPM (500 scale):</strong> {results.ppm}</p>
      {results.maxigrow && <p><strong>MaxiGrow:</strong> {results.maxigrow} g/gal</p>}
      {results.maxibloom && <p><strong>MaxiBloom:</strong> {results.maxibloom} g/gal</p>}
      {results.koolbloom && <p><strong>KoolBloom:</strong> {results.koolbloom} g/gal</p>}
    </div>
  )}
</main>

); }

