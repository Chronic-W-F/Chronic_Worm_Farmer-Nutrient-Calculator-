import React, { useState } from 'react';

export default function Home() { const [waterType, setWaterType] = useState('Tap'); const [baseEC, setBaseEC] = useState(''); const [target, setTarget] = useState(''); const [phase, setPhase] = useState('Veg'); const [intensity, setIntensity] = useState('Light'); const [results, setResults] = useState(null);

const ecMultipliers = { Veg: { Light: 1.43, Medium: 1.83, Aggressive: 2.59 }, 'Early Flower': { Light: 1.43, Medium: 1.83, Aggressive: 2.59 }, 'Mid Flower': { Light: 1.43, Medium: 1.83, Aggressive: 2.59 }, 'Late Flower': { Light: 1.43, Medium: 1.83, Aggressive: 2.59 }, };

const koolbloomRatios = { 'Mid Flower': 0.25, 'Late Flower': 0.60, };

const handleConvert = () => { const base = parseFloat(baseEC); const targetEC = parseFloat(target); const useBase = isNaN(base) ? 0 : base; const ecGap = targetEC - useBase;

if (isNaN(targetEC) || ecGap <= 0) {
  setResults({
    ec: isNaN(targetEC) ? '' : targetEC.toFixed(2),
    ppm: isNaN(targetEC) ? '' : Math.round(targetEC * 500),
    result: 'Enter valid target EC higher than base EC.',
  });
  return;
}

const multiplier = ecMultipliers[phase][intensity];
let koolbloom = 0;
let mainGrams = parseFloat((ecGap * multiplier).toFixed(2));

if (phase === 'Mid Flower' || phase === 'Late Flower') {
  const kbRatio = koolbloomRatios[phase];
  koolbloom = parseFloat((mainGrams * kbRatio).toFixed(2));
  mainGrams = parseFloat((mainGrams * (1 - kbRatio)).toFixed(2));
}

setResults({
  ec: targetEC.toFixed(2),
  ppm: Math.round(targetEC * 500),
  main: mainGrams,
  koolbloom,
});

};

return ( <div style={{ fontFamily: 'Arial', padding: '20px' }}> <h1>Chronic Worm Farmer Nutrient Calculator</h1> <label> Water Type (for your own reference): <select value={waterType} onChange={e => setWaterType(e.target.value)}> <option value="Tap">Tap</option> <option value="RO">RO</option> <option value="Distilled">Distilled</option> <option value="Spring">Spring</option> </select> </label> <br /><br /> <label> Starting EC of Water (optional): <input type="text" value={baseEC} onChange={e => setBaseEC(e.target.value)} /> </label> <br /><br /> <label> Target EC or PPM: <input type="text" value={target} onChange={e => setTarget(e.target.value)} /> </label> <br /><br /> <label> Nutrient Phase: <select value={phase} onChange={e => setPhase(e.target.value)}> <option value="Veg">Veg (MaxiGrow only)</option> <option value="Early Flower">Early Flower (MaxiBloom only)</option> <option value="Mid Flower">Mid Flower (MaxiBloom + KoolBloom)</option> <option value="Late Flower">Late Flower (MaxiBloom + KoolBloom)</option> </select> </label> <br /><br /> <label> Feed Chart Intensity: <select value={intensity} onChange={e => setIntensity(e.target.value)}> <option value="Light">Light</option> <option value="Medium">Medium</option> <option value="Aggressive">Aggressive</option> </select> </label> <br /><br /> <button onClick={handleConvert}>Convert</button> <br /><br /> {results && ( <div> <h2>Results:</h2> <p><strong>EC:</strong> {results.ec}</p> <p><strong>PPM (500 scale):</strong> {results.ppm}</p> {results.main && ( <p><strong>{phase.includes('Veg') ? 'MaxiGrow' : 'MaxiBloom'}:</strong> {results.main} g/gal</p> )} {results.koolbloom > 0 && ( <p><strong>KoolBloom:</strong> {results.koolbloom} g/gal</p> )} {results.result && <p>{results.result}</p>} </div> )} </div> ); }

