import React, { useState } from "react"; import ReactDOM from "react-dom";

const feedCharts = { Veg: { Light: 4.0, Medium: 5.2, Aggressive: 6.5, }, "Early Flower": { Light: 3.5, Medium: 4.5, Aggressive: 5.5, }, "Mid Flower": { Light: 3.5, Medium: 4.5, Aggressive: 5.5, }, "Late Flower": { Light: 3.0, Medium: 4.0, Aggressive: 5.0, }, };

function App() { const [waterType, setWaterType] = useState("Tap"); const [startEC, setStartEC] = useState(""); const [target, setTarget] = useState(""); const [phase, setPhase] = useState("Veg"); const [intensity, setIntensity] = useState("Medium"); const [results, setResults] = useState(null);

const convert = () => { const isPPM = !target.includes(".") && parseInt(target) >= 20; const targetEC = isPPM ? parseInt(target) / 500 : parseFloat(target); const baseEC = startEC ? parseFloat(startEC) : 0; const ecToAdd = Math.max(0, targetEC - baseEC);

const maxGrams = feedCharts[phase][intensity];
const gramsPerEC = maxGrams / 3.0;
const dose = gramsPerEC * ecToAdd;

const ppm = Math.round(targetEC * 500);

let result = {
  ec: targetEC.toFixed(2),
  ppm,
};

if (phase === "Veg") {
  result.maxigrow = dose.toFixed(2);
} else if (phase === "Early Flower") {
  result.maxibloom = dose.toFixed(2);
} else if (phase === "Mid Flower") {
  result.maxibloom = (dose * 0.75).toFixed(2);
  result.koolbloom = (dose * 0.25).toFixed(2);
} else if (phase === "Late Flower") {
  result.maxibloom = (dose * 0.4).toFixed(2);
  result.koolbloom = (dose * 0.6).toFixed(2);
}

setResults(result);

};

return ( <div style={{ padding: 20, fontFamily: "Arial" }}> <h1>Chronic Worm Farmer Nutrient Calculator</h1>

<label>
    Water Type (for your own reference):
    <select value={waterType} onChange={(e) => setWaterType(e.target.value)}>
      <option>Tap</option>
      <option>RO</option>
      <option>Distilled</option>
      <option>Spring</option>
    </select>
  </label>
  <br /><br />

  <label>
    Starting EC of Water (optional):
    <input
      type="text"
      value={startEC}
      onChange={(e) => setStartEC(e.target.value)}
      placeholder="e.g., 1.2"
    />
  </label>
  <br /><br />

  <label>
    Target EC or PPM:
    <input
      type="text"
      value={target}
      onChange={(e) => setTarget(e.target.value)}
      placeholder="e.g., 3 or 1500"
    />
  </label>
  <br /><br />

  <label>
    Nutrient Phase:
    <select value={phase} onChange={(e) => setPhase(e.target.value)}>
      <option>Veg</option>
      <option>Early Flower</option>
      <option>Mid Flower</option>
      <option>Late Flower</option>
    </select>
  </label>
  <br /><br />

  <label>
    Feed Chart Intensity:
    <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
      <option>Light</option>
      <option>Medium</option>
      <option>Aggressive</option>
    </select>
  </label>
  <br /><br />

  <button onClick={convert}>Convert</button>

  {results && (
    <div style={{ marginTop: 20 }}>
      <h2>Results:</h2>
      <p><strong>EC:</strong> {results.ec}</p>
      <p><strong>PPM (500 scale):</strong> {results.ppm}</p>
      {results.maxigrow && <p><strong>MaxiGrow:</strong> {results.maxigrow} g/gal</p>}
      {results.maxibloom && <p><strong>MaxiBloom:</strong> {results.maxibloom} g/gal</p>}
      {results.koolbloom && <p><strong>KoolBloom:</strong> {results.koolbloom} g/gal</p>}
    </div>
  )}
</div>

); }

ReactDOM.render(<App />, document.getElementById("root"));

