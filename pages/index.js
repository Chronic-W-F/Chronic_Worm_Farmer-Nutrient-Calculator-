import { useState } from "react";

const phases = ["Veg", "Early", "Mid", "Late", "Flush"]; const systems = [ "GH Maxi Series (Powder)", "GH 3-Part + KoolBloom (Liquid)", "MasterBlend 3-Part (Powder)", "Jacks 3-2-1 (Powder)" ];

export default function Home() { const [startingEC, setStartingEC] = useState(""); const [targetEC, setTargetEC] = useState(""); const [water, setWater] = useState(1); const [selectedPhase, setSelectedPhase] = useState("Veg"); const [system, setSystem] = useState(systems[0]); const [result, setResult] = useState(""); const [flushPhrase, setFlushPhrase] = useState("");

const flushPhrases = [ "Hydrated. High. Accomplished.", "No nutes. Just vibes.", "Time to coast to the finish line.", "Flush it like your browser history.", "Let the fade games begin." ];

const parseEC = (value) => { const num = parseFloat(value); if (isNaN(num)) return 0; return num >= 100 ? num / 500 : num; };

const handleCalculate = () => { if (selectedPhase === "Flush") { const pick = flushPhrases[Math.floor(Math.random() * flushPhrases.length)]; setResult(""); setFlushPhrase(pick); return; }

const ecStart = parseEC(startingEC);
const ecTarget = parseEC(targetEC);
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

  let kool = 0;
  if (selectedPhase === "Mid") kool = 0.6;
  if (selectedPhase === "Late") kool = 1.2;

  gramsPerGal *= ecMultiplier;
  kool *= ecMultiplier;

  const label = selectedPhase === "Veg" ? "MaxiGrow" : "MaxiBloom";
  output = `${label}: ${(gramsPerGal * gallons).toFixed(2)}g total for ${gallons} gal`;
  if (kool > 0) {
    output += `\nKoolBloom: ${(kool * gallons).toFixed(2)}g total`;
  }
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
  output = `MasterBlend: ${(mb * gallons).toFixed(2)}g total\nCalcium Nitrate: ${(cal * gallons).toFixed(2)}g\nEpsom Salt: ${(epsom * gallons).toFixed(2)}g`;
} else if (system.includes("Jacks")) {
  let jack = 3.6, cal = 2.4, epsom = 1.2;
  jack *= ecMultiplier;
  cal *= ecMultiplier;
  epsom *= ecMultiplier;
  output = `Jacks Part A: ${(jack * gallons).toFixed(2)}g\nCalcium Nitrate: ${(cal * gallons).toFixed(2)}g\nEpsom Salt: ${(epsom * gallons).toFixed(2)}g`;
} else if (system.includes("GH 3-Part")) {
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
  output = `Micro: ${(micro * gallons).toFixed(1)}mL\nGro: ${(gro * gallons).toFixed(1)}mL\nBloom: ${(bloom * gallons).toFixed(1)}mL`;
  if (kool > 0) {
    output += `\nKoolBloom: ${(kool * gallons).toFixed(1)}mL`;
  }
}

setFlushPhrase("");
setResult(output);

};

return ( <div className="p-6 max-w-xl mx-auto"> <h1 className="text-3xl font-bold mb-6 text-center"> Chronic Worm Farmer Nutrient Calculator </h1>

<div className="mb-6">
    <div className="flex items-center gap-4 mb-4">
      <label className="font-semibold whitespace-nowrap">Starting EC / PPM</label>
      <input
        type="number"
        value={startingEC}
        onChange={(e) => setStartingEC(e.target.value)}
        className="flex-grow border p-2 rounded"
        placeholder="e.g. 1.2 or 600"
      />
    </div>

    <div className="w-full h-1 bg-black mb-4"></div>

    <div className="flex items-center gap-4 mb-4">
      <label className="font-semibold whitespace-nowrap">Target EC / PPM</label>
      <input
        type="number"
        value={targetEC}
        onChange={(e) => setTargetEC(e.target.value)}
        className="flex-grow border p-2 rounded"
        placeholder="e.g. 2.5 or 1250"
      />
    </div>

    <div className="w-full h-1 bg-black mb-4"></div>

    <div className="flex items-center gap-4 mb-4">
      <label className="font-semibold whitespace-nowrap">Total Water (Gallons)</label>
      <input
        type="number"
        value={water}
        onChange={(e) => setWater(e.target.value)}
        className="flex-grow border p-2 rounded"
      />
    </div>

    <div className="w-full h-1 bg-black mb-4"></div>

    <div className="mb-4">
      <label className="font-semibold">Nutrient System</label>
      <select
        value={system}
        onChange={(e) => setSystem(e.target.value)}
        className="w-full border p-2 rounded"
      >
        {systems.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>

    <div className="w-full h-1 bg-black mb-4"></div>

    <div className="flex flex-wrap gap-2 mb-6">
      {phases.map((p) => (
        <button
          key={p}
          onClick={() => setSelectedPhase(p)}
          className={`px-4 py-2 rounded-md border font-semibold transition duration-200 ${selectedPhase === p ? "selected-phase" : "unselected-phase"}`}
        >
          {p}
        </button>
      ))}
    </div>

    <div className="w-full h-1 bg-black mb-4"></div>

    <div className="flex gap-2 mb-6">
      <button
        onClick={handleCalculate}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>
      <button
        onClick={() => {
          const confirmClear = window.confirm("Clear all fields?");
          if (confirmClear) {
            setStartingEC("");
            setTargetEC("");
            setWater(1);
            setSelectedPhase("Veg");
            setSystem(systems[0]);
            setResult("");
            setFlushPhrase("");
          }
        }}
        className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
      >
        Clear
      </button>
    </div>

    {system && result && (
      <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 bg-gray-200">
        {system}
      </div>
    )}

    <pre className="whitespace-pre-wrap mt-2 text-lg font-medium">
      {flushPhrase ? `${flushPhrase} 🥴` : result}
    </pre>
  </div>
</div>

); }

