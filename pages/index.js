import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const flushQuotes = [
  "It’s flush time, baby. Let those roots sip that spa water.",
  "No nutes. No worries. Just vibes.",
  "The only thing we’re feeding now is your ego before harvest.",
  "You’ve entered the cleanse. Namaste, nutrient salts.",
  "She’s on a diet. Just water and compliments.",
  "The plants are fasting. Let them reflect.",
  "You did your part. Now let osmosis handle the rest.",
  "Nutrient rehab: Day 1. She’s gonna make it.",
  "No more powder. No more liquids. Just liquid vibes.",
  "The only ‘P’ she’s getting now is peace.",
  "This is the part where we ghost our nutrients.",
  "Flushing: because even queens need a reset.",
  "All gas, no nutes.",
  "T-minus 7 days until trim jail.",
  "This is her juice cleanse. Respect it.",
  "Hydrated. High. And ready to harvest.",
  "We’ve stopped feeding. She's still greedy.",
  "Flush it real good.",
  "Just vibes and H₂O now, my dude.",
  "No nutes. Just Newts. (Wait, why is there a newt in the tent?)"
];

export default function App() {
  const [startingEC, setStartingEC] = useState("");
  const [targetEC, setTargetEC] = useState("");
  const [gallons, setGallons] = useState(1);
  const [phase, setPhase] = useState("veg");
  const [system, setSystem] = useState("maxi");
  const [nutrients, setNutrients] = useState(null);
  const [flushQuote, setFlushQuote] = useState(null);

  const ratios = {
    maxi: {
      MaxiGrow: 1.8,
      MaxiBloom: 1.5,
      KoolBloom: 1.0,
    },
    gh3: {
      veg: { Micro: 5, Gro: 10, Bloom: 5, KoolBloom: 0 },
      early: { Micro: 5, Gro: 5, Bloom: 10, KoolBloom: 0 },
      mid: { Micro: 5, Gro: 2.5, Bloom: 12.5, KoolBloom: 2.5 },
      late: { Micro: 5, Gro: 0, Bloom: 15, KoolBloom: 5 },
      flush: { Micro: 0, Gro: 0, Bloom: 0, KoolBloom: 0 },
    },
  };

  const calculateNutrients = () => {
    const start = parseFloat(startingEC);
    const target = parseFloat(targetEC);
    if (isNaN(start) || isNaN(target) || target <= start) {
      setNutrients(null);
      return;
    }

    const adjustedEC = Math.max(0, target - start);
    const result = {};

    if (phase === "flush") {
      setFlushQuote(flushQuotes[Math.floor(Math.random() * flushQuotes.length)]);
      setNutrients(null);
      return;
    }

    setFlushQuote(null);

    if (system === "maxi") {
      switch (phase) {
        case "veg":
          result.MaxiGrow = +(adjustedEC * ratios.maxi.MaxiGrow * gallons).toFixed(2);
          break;
        case "early":
          result.MaxiBloom = +(adjustedEC * ratios.maxi.MaxiBloom * gallons).toFixed(2);
          break;
        case "mid":
          result.MaxiBloom = +(adjustedEC * 0.75 * ratios.maxi.MaxiBloom * gallons).toFixed(2);
          result.KoolBloom = +(adjustedEC * 0.25 * ratios.maxi.KoolBloom * gallons).toFixed(2);
          break;
        case "late":
          result.MaxiBloom = +(adjustedEC * 0.4 * ratios.maxi.MaxiBloom * gallons).toFixed(2);
          result.KoolBloom = +(adjustedEC * 0.6 * ratios.maxi.KoolBloom * gallons).toFixed(2);
          break;
        default:
          break;
      }
    } else if (system === "gh3") {
      const baseTotalEC = 1.5;
      const scale = adjustedEC / baseTotalEC;
      const base = ratios.gh3[phase] || {};
      for (const key in base) {
        const scaled = base[key] * scale * gallons;
        if (scaled > 0) {
          result[key] = +scaled.toFixed(1);
        }
      }
    }

    setNutrients(result);
  };

  const phaseColors = {
    veg: "bg-green-600",
    early: "bg-yellow-500",
    mid: "bg-orange-500",
    late: "bg-red-500",
    flush: "bg-blue-400",
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">Chronic Worm Farmer Nutrient Calculator</h1>

      <div className="mb-4">
        <Label>Starting EC</Label>
        <Input type="number" step="0.1" placeholder="e.g. 1.2" value={startingEC} onChange={(e) => setStartingEC(e.target.value)} />
      </div>

      <div className="mb-4">
        <Label>Target EC</Label>
        <Input type="number" step="0.1" placeholder="e.g. 2.7" value={targetEC} onChange={(e) => setTargetEC(e.target.value)} />
      </div>

      <div className="mb-4">
        <Label>Total Water (Gallons)</Label>
        <Input type="number" step="1" min="1" max="100" value={gallons} onChange={(e) => setGallons(Math.min(100, Math.max(1, parseInt(e.target.value))))} />
      </div>

      <div className="mb-4">
        <Label>Nutrient System</Label>
        <select value={system} onChange={(e) => setSystem(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
          <option value="maxi">GH Maxi Series (Powder)</option>
          <option value="gh3">GH 3-Part + KoolBloom (Liquid)</option>
        </select>
      </div>

      <div className="mb-4 space-x-2">
        {["veg", "early", "mid", "late", "flush"].map((p) => (
          <button
            key={p}
            onClick={() => setPhase(p)}
            className={`px-3 py-1 text-sm rounded-md border text-white ${
              phase === p ? `${phaseColors[p]}` : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={calculateNutrients}
        className="mb-4 w-full py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800"
      >
        Calculate
      </button>

      <Card>
        <CardContent className="p-6 space-y-4 text-center">
          {flushQuote ? (
            <>
              <p className="text-xl italic">“{flushQuote}”</p>
              <p className="text-3xl">{"\u{1F60C}"}</p> {/* stoned emoji */}
            </>
          ) : !nutrients ? (
            <p className="text-gray-500">Enter ECs and press calculate</p>
          ) : (
            Object.entries(nutrients).map(([key, value]) => (
              <p key={key} className="text-lg">
                {key}: {value}{system === "maxi" ? "g" : "mL"} total for {gallons} gal
              </p>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
