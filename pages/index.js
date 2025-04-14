import { useState } from 'react'; import Select from 'react-select';

export default function Home() { const [waterType, setWaterType] = useState(null); const [startingEC, setStartingEC] = useState(''); const [inputEC, setInputEC] = useState(''); const [ec, setEC] = useState(null); const [ppm, setPPM] = useState(null); const [results, setResults] = useState(null); const [phase, setPhase] = useState(null); const [feedChart, setFeedChart] = useState(null);

const waterOptions = [ { value: 'Distilled', label: 'Distilled' }, { value: 'Filtered', label: 'Filtered' }, { value: 'Other', label: 'Other' }, { value: 'Rain', label: 'Rain' }, { value: 'RO', label: 'RO' }, { value: 'Spring', label: 'Spring' }, { value: 'Tap', label: 'Tap' }, { value: 'Well', label: 'Well' } ];

const phaseOptions = [ { value: 'veg', label: 'Veg (MaxiGrow only)' }, { value: 'early', label: 'Early Flower (MaxiBloom only)' }, { value: 'mid', label: 'Mid Flower (MaxiBloom + KoolBloom)' }, { value: 'late', label: 'Late Flower (MaxiBloom + KoolBloom)' } ];

const feedChartOptions = [ { value: 'light', label: 'Light' }, { value: 'medium', label: 'Medium' }, { value: 'aggressive', label: 'Aggressive' } ];

const calculate = () => { const ecVal = parseFloat(inputEC); const baseEC = parseFloat(startingEC) || 0; const ecDiff = ecVal - baseEC;

setEC(ecVal);
setPPM(Math.round(ecVal * 500));

let maxigrow = 0;
let maxibloom = 0;
let koolbloom = 0;

let bloomMultiplier = 1.3;
let koolMultiplier = 0.5;

if (feedChart?.value === 'light') {
  bloomMultiplier = 0.6;
  koolMultiplier = 0.2;
} else if (feedChart?.value === 'aggressive') {
  bloomMultiplier = 1.5;
  koolMultiplier = 0.6;
}

if (phase?.value === 'veg') {
  maxigrow = +(ecDiff * 1.5).toFixed(2);
} else if (phase?.value === 'early') {
  maxibloom = +(ecDiff * bloomMultiplier).toFixed(2);
} else if (phase?.value === 'mid' || phase?.value === 'late') {
  maxibloom = +(ecDiff * bloomMultiplier).toFixed(2);
  koolbloom = +(ecDiff * koolMultiplier).toFixed(2);
}

setResults({ maxigrow, maxibloom, koolbloom });

};

return ( <main style={{ padding: '1rem', fontFamily: 'Arial' }}> <h1>Chronic Worm Farmer Nutrient Calculator</h1>

<div style={{ marginBottom: '1rem' }}>
    <label>Water Type:</label>
    <Select
      options={waterOptions}
      value={waterType}
      onChange={setWaterType}
    />
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <label>Starting EC of Water:</label>
    <input
      type="number"
      step="any"
      value={startingEC}
      onChange={(e) => setStartingEC(e.target.value)}
    />
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <label>Target EC or PPM:</label>
    <input
      type="text"
      value={inputEC}
      onChange={(e) => setInputEC(e.target.value)}
    />
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <label>Nutrient Phase:</label>
    <Select
      options={phaseOptions}
      value={phase}
      onChange={setPhase}
    />
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <label>Feed Chart Intensity:</label>
    <Select
      options={feedChartOptions}
      value={feedChart}
      onChange={setFeedChart}
    />
  </div>

  <button onClick={calculate}>Convert</button>

  {results && (
    <div style={{ marginTop: '1.5rem' }}>
      <h2>Results:</h2>
      <p><strong>EC:</strong> {ec}</p>
      <p><strong>PPM (500 scale):</strong> {ppm}</p>
      {results.maxigrow > 0 && (
        <p><strong>MaxiGrow:</strong> {results.maxigrow} g/gal</p>
      )}
      {results.maxibloom > 0 && (
        <p><strong>MaxiBloom:</strong> {results.maxibloom} g/gal</p>
      )}
      {results.koolbloom > 0 && (
        <p><strong>KoolBloom:</strong> {results.koolbloom} g/gal</p>
      )}
    </div>
  )}
</main>

); }

