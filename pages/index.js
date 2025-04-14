import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [waterType, setWaterType] = useState('Tap');
  const [startingEC, setStartingEC] = useState('');
  const [targetECInput, setTargetECInput] = useState('');
  const [nutrientPhase, setNutrientPhase] = useState('Veg');
  const [feedIntensity, setFeedIntensity] = useState('Medium');
  const [results, setResults] = useState(null);

  const ppmToEc = ppm => ppm / 500;
  const ecToPpm = ec => ec * 500;

  const feedChart = {
    Veg: { Light: 3.0, Medium: 4.0, Aggressive: 6.5 },
    'Early Flower': { Light: 2.5, Medium: 3.5, Aggressive: 5.5 },
    'Mid Flower': { Light: 2.5, Medium: 3.5, Aggressive: 5.5 },
    'Late Flower': { Light: 2.0, Medium: 3.0, Aggressive: 4.5 },
  };

  const koolBloomMultiplier = {
    'Mid Flower': 0.25,
    'Late Flower': 0.6,
  };

  const convert = () => {
    let targetEC = targetECInput.includes('.') ? parseFloat(targetECInput) : ppmToEc(parseInt(targetECInput));
    if (isNaN(targetEC)) return;

    let baseEC = startingEC ? parseFloat(startingEC) : 0;
    if (isNaN(baseEC)) baseEC = 0;

    const deltaEC = targetEC - baseEC;
    const chartEC = feedChart[nutrientPhase]?.[feedIntensity] || 1;

    const gramsPerEC = chartEC / 3; // We assume chartEC gives ~3.0 EC at full strength
    let maxibloomGrams = deltaEC * gramsPerEC;

    let koolbloomGrams = 0;
    if (nutrientPhase === 'Mid Flower' || nutrientPhase === 'Late Flower') {
      koolbloomGrams = maxibloomGrams * koolBloomMultiplier[nutrientPhase];
      maxibloomGrams -= koolbloomGrams;
    }

    setResults({
      ec: targetEC.toFixed(2),
      ppm: ecToPpm(targetEC),
      maxibloom: maxibloomGrams.toFixed(2),
      koolbloom: koolbloomGrams > 0 ? koolbloomGrams.toFixed(2) : null,
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Chronic Worm Farmer Nutrient Calculator</h1>

      <div>
        <label>
          Water Type (for your own reference):
          <select value={waterType} onChange={e => setWaterType(e.target.value)}>
            <option value="Tap">Tap</option>
            <option value="RO">RO</option>
            <option value="Well">Well</option>
            <option value="Rain">Rain</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Starting EC of Water (optional):
          <input value={startingEC} onChange={e => setStartingEC(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Target EC or PPM:
          <input value={targetECInput} onChange={e => setTargetECInput(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Nutrient Phase:
          <select value={nutrientPhase} onChange={e => setNutrientPhase(e.target.value)}>
            <option value="Veg">Veg (MaxiGrow only)</option>
            <option value="Early Flower">Early Flower (MaxiBloom only)</option>
            <option value="Mid Flower">Mid Flower (MaxiBloom + KoolBloom)</option>
            <option value="Late Flower">Late Flower (MaxiBloom + KoolBloom)</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Feed Chart Intensity:
          <select value={feedIntensity} onChange={e => setFeedIntensity(e.target.value)}>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="Aggressive">Aggressive</option>
          </select>
        </label>
      </div>

      <button onClick={convert}>Convert</button>

      {results && (
        <div style={{ marginTop: 20 }}>
          <h3>Results:</h3>
          <p><strong>EC:</strong> {results.ec}</p>
          <p><strong>PPM (500 scale):</strong> {results.ppm}</p>
          <p><strong>{nutrientPhase.includes('Veg') ? 'MaxiGrow' : 'MaxiBloom'}:</strong> {results.maxibloom} g/gal</p>
          {results.koolbloom && <p><strong>KoolBloom:</strong> {results.koolbloom} g/gal</p>}
        </div>
      )}
    </div>
  );
}

export default App;
