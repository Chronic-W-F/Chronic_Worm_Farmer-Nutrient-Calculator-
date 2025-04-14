import React, { useState } from "react"; import { createRoot } from "react-dom/client"; import "./styles.css";

const feedChart = { Veg: { Light: 3.8, Medium: 4.8, Aggressive: 6.5, }, "Early Flower": { Light: 3.2, Medium: 4.0, Aggressive: 5.5, }, "Mid Flower": { Light: 3.2, Medium: 4.0, Aggressive: 5.5, }, "Late Flower": { Light: 2.6, Medium: 3.3, Aggressive: 4.5, }, };

const koolBloomRatios = { "Mid Flower": 0.25, "Late Flower": 0.6, };

function App() { const [waterType, setWaterType] = useState("Tap"); const [startingEC, setStartingEC] = useState(""); const [targetEC, setTargetEC] = useState(""); const [phase, setPhase] = useState("Veg"); const [intensity, setIntensity] = useState("Medium"); const [results, setResults] = useState(null);

const handleConvert = () => { const ecValue = parseFloat(targetEC); if (isNaN(ecValue)) return;

const ppm = Math.round(ecValue * 500);
const defaultGramsPerGal = feedChart[phase][intensity];

let adjustedGrams = defaultGramsPerGal;
let koolBloomGrams = 0;

if (startingEC !== "") {
  const ecStart = parseFloat(startingEC);
  const deltaEC = Math.max(0, ecValue - ecStart);
  adjustedGrams = parseFloat(
    (defaultGramsPerGal * (deltaEC / ecValue)).toFixed(2)
  );
}

if (phase === "Mid Flower" || phase === "Late Flower") {
  koolBloomGrams = parseFloat(
    (adjustedGrams * koolBloomRatios[phase]).toFixed(2)
  );
  adjustedGrams = parseFloat(
    (adjustedGrams - koolBloomGrams).toFixed(2)
  );
}

setResults({
  ec: ecValue,
  ppm,
  maxiGrams: adjustedGrams,
  koolBloom: koolBloomGrams,
});

};

return ( <div className="App"> <h1>Chronic Worm Farmer Nutrient Calculator</h1>

<label>
    Water Type (for your own reference):
    <select value={waterType} onChange={(e) => setWaterType(e.target.value)}>
      <option>Tap</option>
      <option>RO</option>
      <option>Distilled</option>
      <option>Well</option>
    </select>
  </label>

  <br />

  <label>
    Starting EC of Water (optional):
    <input
      type="number"
      value={startingEC}
      onChange={(e) => setStartingEC(e.target.value)}
    />
  </label>

  <br />

  <label>
    Target EC or PPM:
    <input
      type="text"
      value={targetEC}
      onChange={(e) => setTargetEC(e.target.value)}
    />
  </label>

  <br />

  <label>
    Nutrient Phase:
    <select value={phase} onChange={(e) => setPhase(e.target.value)}>
      <option value="Veg">Veg</option>
      <option value="Early Flower">Early Flower (MaxiBloom only)</option>
      <option value="Mid Flower">Mid Flower (MaxiBloom + KoolBloom)</option>
      <option value="Late Flower">Late Flower (MaxiBloom + KoolBloom)</option>
    </select>
  </label>

  <br />

  <label>
    Feed Chart Intensity:
    <select
      value={intensity}
      onChange={(e) => setIntensity(e.target.value)}
    >
      <option>Light</option>
      <option>Medium</option>
      <option>Aggressive</option>
    </select>
  </label>

  <br />

  <button onClick={handleConvert}>Convert</button>

  {results && (
    <div>
      <h2>Results:</h2>
      <p><strong>EC:</strong> {results.ec}</p>
      <p><strong>PPM (500 scale):</strong> {results.ppm}</p>
      <p><strong>MaxiGrow/MaxiBloom:</strong> {results.maxiGrams} g/gal</p>
      {results.koolBloom > 0 && (
        <p><strong>KoolBloom:</strong> {results.koolBloom} g/gal</p>
      )}
    </div>
  )}
</div>

); }

const container = document.getElementById("root"); const root = createRoot(container); root.render(<App />);

