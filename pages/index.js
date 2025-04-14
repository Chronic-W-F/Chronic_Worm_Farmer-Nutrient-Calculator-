import { useState } from 'react'; import Head from 'next/head';

export default function Home() { const [waterType, setWaterType] = useState('Tap'); const [startEC, setStartEC] = useState(''); const [targetEC, setTargetEC] = useState(''); const [phase, setPhase] = useState('Veg'); const [intensity, setIntensity] = useState('Medium'); const [results, setResults] = useState(null);

const waterOptions = [ { value: 'RO', label: 'RO' }, { value: 'Distilled', label: 'Distilled' }, { value: 'Tap', label: 'Tap' }, { value: 'Rain', label: 'Rain' }, { value: 'Spring', label: 'Spring' } ];

const phaseOptions = [ { value: 'Veg', label: 'Veg (MaxiGrow only)' }, { value: 'Early', label: 'Early Flower (MaxiBloom only)' }, { value: 'Mid', label: 'Mid Flower (MaxiBloom + KoolBloom)' } ];

const intensityOptions = [ { value: 'Light', label: 'Light' }, { value: 'Medium', label: 'Medium' }, { value: 'Aggressive', label: 'Aggressive' } ];

const feedChart = { Veg: { Light: { ec: 2.1, grams: 3.8 }, Medium: { ec: 2.7, grams: 4.6 }, Aggressive: { ec: 3.3, grams: 5.8 } }, Early: { Light: { ec: 2.1, grams: 3.8 }, Medium: { ec: 2.7, grams: 4.6 }, Aggressive: { ec: 3.3, grams: 5.8 } }, Mid: { Light: { ec: 2.1, grams: 3.8 }, Medium: { ec: 2.7, grams: 4.6 }, Aggressive: { ec: 3.3, grams: 5.8 } } };

const calculateResults = () => { const start = parseFloat(startEC); const target = targetEC.includes('.') ? parseFloat(targetEC) : parseFloat(targetEC) / 500; const delta = target - start; const feed = feedChart[phase][intensity]; const ratio = delta / feed.ec; const grams = ratio * feed.grams; const ppm = Math.round(target * 500); const result = { EC: target.toFixed(2), PPM: ppm, resultText: phase === 'Veg' ? MaxiGrow: ${grams.toFixed(2)} g/gal : phase === 'Early' ? MaxiBloom: ${grams.toFixed(2)} g/gal : MaxiBloom: ${(grams * 0.84).toFixed(2)} g/gal\nKoolBloom: ${(grams * 0.16).toFixed(2)} g/gal }; setResults(result); };

return ( <div className="container"> <Head> <title>Chronic Worm Farmer Nutrient Calculator</title> </Head> <h1>Chronic Worm Farmer Nutrient Calculator</h1>

<label>Water Type:</label>
  <select value={waterType} onChange={(e) => setWaterType(e.target.value)}>
    {waterOptions.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>

  <label>Starting EC of Water:</label>
  <input value={startEC} onChange={(e) => setStartEC(e.target.value)} />

  <label>Target EC or PPM:</label>
  <input value={targetEC} onChange={(e) => setTargetEC(e.target.value)} />

  <label>Nutrient Phase:</label>
  <select value={phase} onChange={(e) => setPhase(e.target.value)}>
    {phaseOptions.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>

  <label>Feed Chart Intensity:</label>
  <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
    {intensityOptions.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>

  <button onClick={calculateResults}>Convert</button>

  {results && (
    <div>
      <h2>Results:</h2>
      <p><strong>EC:</strong> {results.EC}</p>
      <p><strong>PPM (500 scale):</strong> {results.PPM}</p>
      <p><strong>{results.resultText}</strong></p>
    </div>
  )}
</div>

); }

