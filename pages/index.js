import { useState } from "react";

const phases = ["Veg", "Early", "Mid", "Late", "Flush"]; const systems = [ "GH Maxi Series (Powder)", "GH 3-Part + KoolBloom (Liquid)", "MasterBlend 3-Part (Powder)", ];

export default function Home() { const [startingEC, setStartingEC] = useState(""); const [targetEC, setTargetEC] = useState(""); const [water, setWater] = useState(1); const [selectedPhase, setSelectedPhase] = useState("Veg"); const [system, setSystem] = useState(systems[0]); const [result, setResult] = useState(""); const [flushPhrase, setFlushPhrase] = useState("");

const flushPhrases = [ "Hydrated. High. Accomplished.", "No nutes. Just vibes.", "Time to coast to the finish line.", "This plant's been through enough.", "Flush it like your browser history.", "Clean roots, clean conscience.", "Nothing left but trichomes and dreams.", "If you’re reading this, you’re done feeding.", "All gas, no nutrients.", "Nute withdrawals initiated.", "Don’t be salty—flush it out.", "Riding the fade like a pro.", "Time to let go, she’s ready.", "No powder. No liquid. Only peace.", "Let her starve. She deserves it.", "Straight water diet begins now.", "Bye bye ppm.", "Let the fade games begin.", "Just water things.", "Water in. Wisdom out." ];

const handleCalculate = () => { if (selectedPhase === "Flush") { const pick = flushPhrases[Math.floor(Math.random() * flushPhrases.length)]; setResult(""); setFlushPhrase(pick); return; }

const ecStart = parseFloat(startingEC) || 0;
const ecTarget = parseFloat(targetEC) || 0;
const gallons = parseFloat(water) || 1;
const deltaEC = ecTarget - ecStart;
const baseEC = 2.8;
const ecMultiplier = deltaEC > 0 ? deltaEC / baseEC : 0;

let output = "";

if (system.includes("Maxi")) {
  let gramsPerGal =
    selectedPhase === "Veg" ? 1.8 :
    selectedPhase === "Early" ? 2.3 :
    selectedPhase === "Mid" ? 2.8 :
    selectedPhase === "Late" ? 3.0 : 0;

  gramsPerGal *= ecMultiplier;

  output = `MaxiGrow: ${(gramsPerGal * gallons).toFixed(2)}g total for ${gallons} gal`;

} else if (system.includes("MasterBlend")) {
  let mb = 0, cal = 0, epsom = 0;

  if (selectedPhase === "Veg") {
    mb = 2.4; cal = 2.4; epsom = 1.2;
  } else if (selectedPhase === "Early") {
    mb = 2.6; cal = 2.6; epsom = 1.2;
  } else if (selectedPhase === "Mid") {
    mb = 2.8; cal = 2.8; epsom = 1.2;
  } else if (selectedPhase === "Late") {
    mb = 3.0; cal = 2.6; epsom = 1.0;
  }

  mb *= ecMultiplier;
  cal *= ecMultiplier;
  epsom *= ecMultiplier;

  output = `MasterBlend: ${(mb * gallons).toFixed(2)}g total for ${gallons} gal\n`;
  output += `Calcium Nitrate: ${(cal * gallons).toFixed(2)}g total\n`;
  output += `Epsom Salt: ${(epsom * gallons).toFixed(2)}g total`;

} else {
  let micro = 0, gro = 0, bloom = 0, kool = 0;

  if (selectedPhase === "Veg") {
    micro = 5; gro = 10; bloom = 5;
  } else if (selectedPhase === "Early") {
    micro = 5; gro = 5; bloom = 10;
  } else if (selectedPhase === "Mid") {
    micro = 4; gro = 2; bloom = 10; kool = 2.5;
  } else if (selectedPhase === "Late") {
    micro = 2; gro = 0; bloom = 8; kool = 5;
  }

  micro *= ecMultiplier;
  gro *= ecMultiplier;
  bloom *= ecMultiplier;
  kool *= ecMultiplier;

  output = `Micro: ${(micro * gallons).toFixed(1)}mL total for ${gallons} gal\n`;
  output += `Gro: ${(gro * gallons).toFixed(1)}mL total for ${gallons} gal\n`;
  output += `Bloom: ${(bloom * gallons).toFixed(1)}mL total for ${gallons} gal`;
  if (kool > 0) {
    output += `\nKoolBloom: ${(kool * gallons).toFixed(1)}mL total for ${gallons} gal`;
  }
}

setFlushPhrase("");
setResult(output);

};

return ( <div className="p-6 max-w-xl mx-auto"> <h1 className="text-3xl font-bold mb-6 text-center"> Chronic Worm Farmer Nutrient Calculator </h1>

<div className="mb-4">
    <label className="block font-semibold mb-1">
      Starting EC <span className="text-gray-500 text-sm">(optional)</span>
    </label>
    <input
      type="number"
      value={startingEC}
      onChange={(e) => setStartingEC(e.target.value)}
      className="w-full border p-2 rounded"
      placeholder="e.g. 1.2"
    />
  </div>

  <div className="mb-4">
    <label className="block font-semibold mb-1">Target EC</label>
    <input
      type="number"
      value={targetEC}
      onChange={(e) => setTargetEC(e.target.value)}
      className="w-full border p-2 rounded"
      placeholder="e.g. 2.5"
    />
  </div>

  <div className="mb-4">
    <label className="block font-semibold mb-1">Total Water (Gallons)</label>
    <input
      type="number"
      value={water}
      onChange={(e) => setWater(e.target.value)}
      className="w-full border p-2 rounded"
      min={1}
      max={100}
    />
  </div>

  <div className="mb-4">
    <label className="block font-semibold mb-1">Nutrient System</label>
    <select
      value={system}
      onChange={(e) => setSystem(e.target.value)}
      className="w-full border p-2 rounded"
    >
      {systems.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-wrap gap-2 mb-4">
    {phases.map((p) => (
      <button
        key={p}
        onClick={() => setSelectedPhase(p)}
        className={`px-4 py-2 rounded-md border font-semibold transition duration-200 ${
          selectedPhase === p ? "selected-phase" : "unselected-phase"
        }`}
      >
        {p}
      </button>
    ))}
  </div>

  <button
    onClick={handleCalculate}
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    Calculate
  </button>

  <pre className="whitespace-pre-wrap mt-6 text-lg font-medium">
    {flushPhrase ? `${flushPhrase} 🥴` : result}
  </pre>
</div>

); }

