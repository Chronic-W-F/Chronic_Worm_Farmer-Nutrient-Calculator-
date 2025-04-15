import { useState } from "react";

const phases = ["Veg", "Early", "Mid", "Late", "Flush"]; const systems = [ "GH Maxi Series (Powder)", "GH 3-Part + KoolBloom (Liquid)", ];

export default function Home() { const [startingEC, setStartingEC] = useState(""); const [targetEC, setTargetEC] = useState(""); const [water, setWater] = useState(1); const [selectedPhase, setSelectedPhase] = useState("Veg"); const [system, setSystem] = useState(systems[0]); const [result, setResult] = useState(""); const [flushPhrase, setFlushPhrase] = useState("");

const flushPhrases = [ "Hydrated. High. Accomplished.", "No nutes. Just vibes.", "Time to coast to the finish line.", "This plant's been through enough.", "Flush it like your browser history.", "Clean roots, clean conscience.", "Nothing left but trichomes and dreams.", "If you’re reading this, you’re done feeding.", "All gas, no nutrients.", "Nute withdrawals initiated.", "Don’t be salty—flush it out.", "Riding the fade like a pro.", "Time to let go, she’s ready.", "No powder. No liquid. Only peace.", "Let her starve. She deserves it.", "Straight water diet begins now.", "Bye bye ppm.", "Let the fade games begin.", "Just water things.", "Water in. Wisdom out." ];

const handleCalculate = () => { if (selectedPhase === "Flush") { const pick = flushPhrases[Math.floor(Math.random() * flushPhrases.length)]; setResult(""); setFlushPhrase(pick); return; }

const ecStart = parseFloat(startingEC) || 0;
const ecTarget = parseFloat(targetEC) || 0;
const gallons = parseFloat(water) || 1;
const delta = ecTarget - ecStart;

let output = "";

if (system.includes("Maxi")) {
  const gramsPerGal =
    selectedPhase === "Veg"
      ? 1.8
      : selectedPhase === "Early"
      ? 2.3
      : selectedPhase === "Mid"
      ? 2.8
      : selectedPhase === "Late"
      ? 3.0
      : 0;
  output = `MaxiGrow: ${(gramsPerGal * gallons).toFixed(2)}g total for ${gallons} gal`;
} else {
  let micro = 0,
    gro = 0,
    bloom = 0,
    kool = 0;

  if (selectedPhase === "Veg") {
    micro = 5;
    gro = 10;
    bloom = 5;
  } else if (selectedPhase === "Early") {
    micro = 5;
    gro = 5;
    bloom = 10;
  } else if (selectedPhase === "Mid") {
    micro = 4;
    gro = 2;
    bloom = 10;
    kool = 2.5;
  } else if (selectedPhase === "Late") {
    micro = 2;
    gro = 0;
    bloom = 8;
    kool = 5;
  }

  output = `Micro: ${(micro * gallons).toFixed(1)}mL total for ${gallons} gal\n`;
  output += `Gro: ${(gro * gallons).toFixed(1)}mL total for ${gallons} gal\n`;
  output += `Bloom: ${(bloom * gallons).toFixed(1)}mL total for ${gallons} gal`;
  if (kool) output += `\nKoolBloom: ${(kool * gallons).toFixed(1)}mL total for ${gallons} gal`;
}

setFlushPhrase("");
setResult(output);

};

return ( <div className="p-6 max-w-xl mx-auto"> <h1 className="text-3xl font-bold mb-6">Chronic Worm Farmer Nutrient Calculator</h1>

<label className="block mb-2 font-semibold">
    Starting EC <span className="text-gray-500 text-sm">(optional)</span>
  </label>
  <input
    type="number"
    value={startingEC}
    onChange={(e) => setStartingEC(e.target.value)}
    className="border p-2 w-full mb-4"
    placeholder="e.g. 1.2"
  />

  <label className="block mb-2 font-semibold">Target EC</label>
  <input
    type="number"
    value={targetEC}
    onChange={(e) => setTargetEC(e.target.value)}
    className="border p-2 w-full mb-4"
    placeholder="e.g. 2.5"
  />

  <label className="block mb-2 font-semibold">Total Water (Gallons)</label>
  <input
    type="number"
    value={water}
    onChange={(e) => setWater(e.target.value)}
    className="border p-2 w-full mb-4"
    min={1}
    max={100}
  />

  <label className="block mb-2 font-semibold">Nutrient System</label>
  <select
    value={system}
    onChange={(e) => setSystem(e.target.value)}
    className="border p-2 w-full mb-4"
  >
    {systems.map((s) => (
      <option key={s} value={s}>
        {s}
      </option>
    ))}
  </select>

  <div className="flex flex-wrap gap-2 mb-4">
    {phases.map((p) => (
      <button
        key={p}
        onClick={() => setSelectedPhase(p)}
        className={`px-4 py-2 rounded transition-colors duration-200 border font-semibold ${
          selectedPhase === p
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {p}
      </button>
    ))}
  </div>

  <button
    onClick={handleCalculate}
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
  >
    Calculate
  </button>

  <pre className="whitespace-pre-wrap mt-6 text-lg font-medium">
    {flushPhrase ? `${flushPhrase} 🥴` : result}
  </pre>
</div>

); }

