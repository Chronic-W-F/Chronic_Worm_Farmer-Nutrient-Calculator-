import { useState } from 'react'; import Select from 'react-select';

export default function Home() { const [waterType, setWaterType] = useState({ value: 'Tap', label: 'Tap' }); const [startingEC, setStartingEC] = useState(''); const [targetECInput, setTargetECInput] = useState(''); const [nutrientPhase, setNutrientPhase] = useState(null); const [feedChartIntensity, setFeedChartIntensity] = useState(null); const [results, setResults] = useState(null);

const waterOptions = [ { value: 'Tap', label: 'Tap' }, { value: 'RO', label: 'RO' }, { value: 'Distilled', label: 'Distilled' }, ];

const nutrientPhases = [ { value: 'veg', label: 'Veg (MaxiGrow only)' }, { value: 'early', label: 'Early Flower (MaxiBloom only)' }, { value: 'mid', label: 'Mid Flower (MaxiBloom + KoolBloom)' }, { value: 'late', label: 'Late Flower (MaxiBloom + KoolBloom)' }, ];

const intensityLevels = [ { value: 'light', label: 'Light' }, { value: 'medium', label: 'Medium' }, { value: 'aggressive', label: 'Aggressive' }, ];

const baseGrams = { veg: { light: 3.6, medium: 4.6, aggressive: 6.5, }, early: { light: 2.6, medium: 3.3, aggressive: 4.6, }, mid: { light: { bloom: 2.6, kool: 0.65 }, medium: { bloom: 3.3, kool: 0.85 }, aggressive: { bloom: 4.6, kool: 1.2 }, }, late: { light: { bloom: 1.75, kool: 1.3 }, medium: { bloom: 2.2, kool: 1.6 }, aggressive: { bloom: 3.3, kool: 2.4 }, }, };

const calculate = () => { let isPPM = !targetECInput.includes('.') && parseInt(targetECInput) >= 20; const baseEC = parseFloat(startingEC) || 0; const targetEC = isPPM ? parseFloat(targetECInput) / 500 : parseFloat(targetECInput); const nutrientEC = targetEC - baseEC; const ppmValue = Math.round(targetEC * 500);

let output = { ec: targetEC.toFixed(2), ppm: ppmValue };

if (!nutrientPhase || !feedChartIntensity) return;

const phase = nutrientPhase.value;
const intensity = feedChartIntensity.value;

if (phase === 'veg') {
  const maxigrow = (nutrientEC / 2.5 * baseGrams.veg[intensity]).toFixed(2);
  output.maxigrow = maxigrow;
} else if (phase === 'early') {
  const maxibloom = (nutrientEC / 2.5 * baseGrams.early[intensity]).toFixed(2);
  output.maxibloom = maxibloom;
} else if (phase === 'mid') {
  const bloom = baseGrams.mid[intensity].bloom;
  const kool = baseGrams.mid[intensity].kool;
  const maxibloom = (nutrientEC / 2.5 * bloom).toFixed(2);
  const koolbloom = (nutrientEC / 2.5 * kool).toFixed(2);
  output.maxibloom = maxibloom;
  output.koolbloom = koolbloom;
} else if (phase === 'late') {
  const bloom = baseGrams.late[intensity].bloom;
  const kool = baseGrams.late[intensity].kool;
  const maxibloom = (nutrientEC / 2.5 * bloom).toFixed(2);
  const koolbloom = (nutrientEC / 2.5 * kool).toFixed(2);
  output.maxibloom = maxibloom;
  output.koolbloom = koolbloom;
}

setResults(output);

};

return ( <main style={{ padding: '1rem', fontFamily: 'Arial' }}> <h1>Chronic Worm Farmer Nutrient Calculator</h1>

<label>Water Type:</label>
  <Select options={waterOptions} value={waterType} onChange={setWaterType} />

  <label>Starting EC of Water:</label>
  <input
    type="number"
    value={startingEC}
    onChange={(e) => setStartingEC(e.target.value)}
  />

  <label>Target EC or PPM:</label>
  <input
    type="text"
    value={targetECInput}
    onChange={(e) => setTargetECInput(e.target.value)}
  />

  <label>Nutrient Phase:</label>
  <Select options={nutrientPhases} value={nutrientPhase} onChange={setNutrientPhase} />

  <label>Feed Chart Intensity:</label>
  <Select options={intensityLevels} value={feedChartIntensity} onChange={setFeedChartIntensity} />

  <button onClick={calculate}>Convert</button>

  {results && (
    <div style={{ marginTop: '1rem' }}>
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

