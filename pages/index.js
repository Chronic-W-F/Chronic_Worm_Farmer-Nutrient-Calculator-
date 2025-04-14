import React, { useState } from 'react';

export default function Home() { const [waterType, setWaterType] = useState('Tap'); const [baseEC, setBaseEC] = useState(''); const [targetEC, setTargetEC] = useState(''); const [phase, setPhase] = useState('Veg'); const [intensity, setIntensity] = useState('Light'); const [results, setResults] = useState(null);

const ecMultipliers = { Veg: { Light: 1.43, Medium: 1.83, Aggressive: 2.6 }, 'Early Flower': { Light: 1.95, Medium: 2.45, Aggressive: 3.3 }, 'Mid Flower': { Light: 2.0, Medium: 2.5, Aggressive: 3.4 }, 'Late Flower': { Light: 1.95, Medium: 2.45, Aggressive: 3.3 }, };

const koolbloomRatios = { 'Mid Flower': 0.25, 'Late Flower': 0.6, };

const handleConvert = () => { const base = parseFloat(baseEC); const target = parseFloat(targetEC); const ecGap = isNaN(base) ? target : target - base;

if (isNaN(target) || ecGap <= 0) {
  setResults({
    ec: isNaN(target) ? 0 : target.toFixed(2),
    ppm: isNaN(target) ? 0 : (target * 500).toFixed(0),
    nutrients: {},
  });
  return;
}

const multiplier = ecMultipliers[phase][intensity];
const totalGrams = ecGap * multiplier;
const nutrients = {};

if (phase === 'Veg') {
  nutrients.MaxiGrow = totalGrams.toFixed(2);
} else {
  const koolbloomRatio = koolbloomRatios[phase] || 0;
  const koolbloomGrams = totalGrams * koolbloomRatio;
  const maxibloomGrams = totalGrams - koolbloomGrams;
  nutrients.MaxiBloom = maxibloomGrams.toFixed(2);
  if (koolbloomGrams > 0) {
    nutrients.KoolBloom = koolbloomGrams.toFixed(2);
  }
}

setResults({
  ec: target.toFixed(2),
  ppm: (target * 500).toFixed(0),
  nutrients,
});

};

return ( <div style={{ padding: '20px', fontFamily: 'Arial' }}> <h1>Chronic Worm Farmer Nutrient Calculator</h1>

<label>
    Water Type (for your own reference):
    <select value={waterType} onChange={(e) => setWaterType(e.target.value)}>
      <option value="Tap">Tap</option>
      <option value="RO">RO</option>
      <option value="Rain">Rain</option>
      <option value="Well">Well</option>
    </select>
  </label>
  <br /><br />

  <label>
    Starting EC of Water (optional):
    <input type="number" step="0.01" value={baseEC} onChange={(e) => setBaseEC(e.target.value)} />
  </label>
  <br /><br />

  <label>
    Target EC or PPM:
    <input type="number" step="0.01" value={targetEC} onChange={(e) => setTargetEC(e.target.value)} />
  </label>
  <br /><br />

  <label>
    Nutrient Phase:
    <select value={phase} onChange={(e) => setPhase(e.target.value)}>
      <option value="Veg">Veg (MaxiGrow only)</option>
      <option value="Early Flower">Early Flower (MaxiBloom only)</option>
      <option value="Mid Flower">Mid Flower (MaxiBloom + KoolBloom)</option>
      <option value="Late Flower">Late Flower (MaxiBloom + KoolBloom)</option>
    </select>
  </label>
  <br /><br />

  <label>
    Feed Chart Intensity:
    <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
      <option value="Light">Light</option>
      <option value="Medium">Medium</option>
      <option value="Aggressive">Aggressive</

