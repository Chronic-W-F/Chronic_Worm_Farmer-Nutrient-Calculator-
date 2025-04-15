import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function App() {
  const [startingEC, setStartingEC] = useState("");
  const [targetEC, setTargetEC] = useState("");
  const [gallons, setGallons] = useState(1);
  const [phase, setPhase] = useState("veg");
  const [system, setSystem] = useState("maxi");
  const [nutrients, setNutrients] = useState(null);

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
      const baseTotalEC = 1.5; // Base GH medium schedule assumes 1.5 EC
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

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chronic Worm Farmer Nutrient Calculator</h1>

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
        <button onClick={() => setPhase("veg")} className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">Veg</button>
        <button onClick={() => setPhase("early")} className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">Early Flower</button>
        <button onClick={() => setPhase("mid")} className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">Mid Flower</button>
        <button onClick={() => setPhase("late")} className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">Late Flower</button>
        <button onClick={() => setPhase("flush")} className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">Flush</button>
      </div>

      <button onClick={calculateNutrients} className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Calculate</button>

      <Card>
        <CardContent className="p-4 space-y-2">
          {!nutrients ? (
            <p className="text-center text-gray-500">Enter ECs and press calculate</p>
          ) : (
            Object.entries(nutrients).map(([key, value]) => (
              <p key={key}>{key}: {value}{system === "maxi" ? "g" : "mL"} total for {gallons} gal</p>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
