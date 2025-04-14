import { useState } from 'react';

const feedChart = { Veg: { Light: 3, Medium: 4.5, Aggressive: 6.5, nutrient: 'MaxiGrow', }, 'Early Flower': { Light: 2, Medium: 3, Aggressive: 4, nutrient: 'MaxiBloom', }, 'Mid Flower': { Light: 2, Medium: 3, Aggressive: 4, nutrient: 'MaxiBloom+KoolBloom', koolbloomFactor: 0.25, }, 'Late Flower': { Light: 2, Medium: 3, Aggressive: 4, nutrient: 'MaxiBloom+KoolBloom', koolbloomFactor: 0.6, }, };

export default function Home() { const [waterType, setWaterType] = useState('Tap'); const [startingEC, setStartingEC] = useState(''); const [targetEC, setTargetEC] = useState(''); const [phase, setPhase] = useState('Veg'); const [intensity, setIntensity] = useState('Medium'); const [result, setResult] = useState(null);

const handleConvert = () => { const ecStart = parseFloat(startingEC) || 0; const ecTarget = parseFloat(targetEC); if (isNaN(ecTarget) || ecTarget <= ecStart) { alert('Please enter a valid Target EC greater than Starting EC.'); return; }

const ecNeeded = ecTarget - ecStart;
const chart = feedChart[phase];
const baseGrams = chart[intensity];
const gramsPerEC = baseGrams / 1.5;
const gramsNeeded = (ecNeeded * gramsPerEC).toFixed(2);

let koolBloom = null;
if (chart.nutrient.includes('KoolBloom')) {
  const bloom = (gramsNeeded * (1 - chart.koolbloomFactor)).toFixed(2);
  const kool = (gramsNeeded * chart.koolbloomFactor).toFixed(2);
  koolBloom = kool;
  setResult({ ec: ecTarget, ppm: Math.round(ecTarget * 500), bloom, kool });
} else {
  setResult({ ec: ecTarget, ppm: Math.round(ecTarget * 500), grams: gramsNeeded });
}

};

return ( <div style={{ padding: '2rem', fontFamily: 'Arial' }}> <h1>Chronic Worm Farmer Nutrient Calculator</h1>

<label>Water Type (for your own reference):</label>
  <select value={waterType} onChange={e => setWaterType(e.target.value)}>
    {['Tap', 'RO', 'Distilled', 'Spring', 'Rain', 'Well'].map(type => (
      <option key={type} value={type}>{type}</option>
    ))}
  </select>

  <br /><br />
  <label>Starting EC of Water (optional):</label>
  <input value={startingEC} onChange={e => setStartingEC(e.target.value)} placeholder="e.g. 1.2" />

  <br /><br />
  <label>Target EC or PPM:</label>
  <input value={targetEC} onChange={e => setTargetEC(e.target.value)} placeholder="e.g. 2.8 or 1400" />

  <br /><br />
  <label>Nutrient Phase:</label>
  <select value={phase} onChange={e => setPhase(e.target.value)}>
    {Object.keys(feedChart).map(key => (
      <option key={key} value={key}>{key}</option>
    ))}
  </select>

  <br /><br />
  <label>Feed Chart Intensity:</label>
  <select value={intensity} onChange={e => setIntensity(e.target.value)}>
    <option value="Light">Light</option>
    <option value="Medium">Medium</option>
    <option value="Aggressive">Aggressive</option>
  </select>

  <br /><br />
  <button onClick={handleConvert}>Convert</button>

  {result && (
    <div style={{ marginTop: '2rem' }}>
      <h2>Results:</h2>
      <p><strong>EC:</strong> {result.ec}</p>
      <p><strong>PPM (500 scale):</strong> {result.ppm}</p>
      {result.grams && <p><strong>{feedChart[phase].nutrient}:</strong> {result.grams} g/gal</p>}
      {result.bloom && (
        <>
          <p><strong>MaxiBloom:</strong> {result.bloom} g/gal</p>
          <p><strong>KoolBloom:</strong> {result.kool} g/gal</p>
        </>
      )}
    </div>
  )}
</div>

); }

