import { useState } from 'react'; import Select from 'react-select';

export default function Home() { const [startingEC, setStartingEC] = useState(''); const [targetEC, setTargetEC] = useState(''); const [waterType, setWaterType] = useState(null); const [phase, setPhase] = useState(null); const [intensity, setIntensity] = useState(null); const [results, setResults] = useState(null);

const waterOptions = [ { value: 'Distilled', label: 'Distilled' }, { value: 'Filtered', label: 'Filtered' }, { value: 'Other', label: 'Other' }, { value: 'Rain', label: 'Rain' }, { value: 'RO', label: 'RO' }, { value: 'Spring', label: 'Spring' }, { value: 'Tap', label: 'Tap' }, { value: 'Well', label: 'Well' }, ];

const phaseOptions = [ { value: 'veg', label: 'Veg (MaxiGrow only)' }, { value: 'early', label: 'Early Flower (MaxiBloom only)' }, { value: 'mid', label: 'Mid Flower (MaxiBloom + KoolBloom)' }, { value: 'late', label: 'Late Flower (MaxiBloom + KoolBloom)' }, ];

const intensityOptions = [ { value: 'light', label: 'Light' }, { value: 'medium', label: 'Medium' }, { value: 'aggressive', label: 'Aggressive' }, ];

const calculate = () => { const baseEC = parseFloat(startingEC) || 0; let inputValue = parseFloat(targetEC); let isPPM = !targetEC.includes('.') && parseInt(targetEC) >= 20; let targetECValue = isPPM ? inputValue / 500 : inputValue; const ec = Math.max(targetECValue - baseEC, 0); const ppm = Math.round(targetECValue * 500);

let gramsPerGal = 0;
let result = {};

if (phase?.value === 'veg') {
  let factor = 0;
  if (intensity?.value === 'light') factor = 1.84;
  else if (intensity?.value === 'medium') factor = 2.08;
  else if (intensity?.value === 'aggressive') factor = 2.6;
  gramsPerGal = +(ec * factor).toFixed(2);
  result = { ec: targetECValue, ppm, maxigrow: gramsPerGal };
} else if (phase?.value === 'early') {
  let factor = 1.3;
  gramsPerGal = +(ec * factor).toFixed(2);
  result = { ec: targetECValue, ppm, maxibloom: gramsPerGal };
} else if (phase?.value === 'mid') {
  let bloomFactor = 1.3;
  let koolFactor = 0.25;
  result = {
    ec: targetECValue,
    ppm,
    maxibloom: +(ec * bloomFactor).toFixed(2),
    koolbloom: +(ec * koolFactor).toFixed(2),
  };
} else if (phase?.value === 'late') {
  let bloomFactor = 1.3;
  let koolFactor = 0.6;
  result = {
    ec: targetECValue,
    ppm,
    maxibloom: +(ec * bloomFactor).toFixed(2),
    koolbloom: +(ec * koolFactor).toFixed(2),
  };
}

setResults(result);

};

return ( <main style={{ padding: '1rem', fontFamily: 'sans-serif' }}> <h1>Chronic Worm Farmer Nutrient Calculator</h1>

<div style={{ marginBottom: '1rem' }}>
    <label>Water Type:</label>
    <Select options={waterOptions} onChange={setWaterType} />
  </div>

  <input
    type="number"
    placeholder="Starting EC of Water:"
    value={startingEC}
    onChange={(e) => setStartingEC(e.target.value)}
    style={{ marginBottom: '0.5rem', display: 'block' }}
  />

  <input
    type="text"
    placeholder="Target EC or PPM:"
    value={targetEC}
    onChange={(e) => setTargetEC(e.target.value)}
    style={{ marginBottom: '0.5rem', display: 'block' }}
  />

  <div style={{ marginBottom: '1rem' }}>
    <label>Nutrient Phase:</label>
    <Select options={phaseOptions} onChange={setPhase} />
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <label>Feed Chart Intensity:</label>
    <Select options={intensityOptions} onChange={setIntensity} />
  </div>

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

