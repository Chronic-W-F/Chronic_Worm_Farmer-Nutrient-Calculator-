import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function App() {
  const [startingEC, setStartingEC] = useState(1.2);
  const [targetEC, setTargetEC] = useState(2.7);
  const [phase, setPhase] = useState("veg");

  // Real conversion ratios: grams per EC per gallon
  const ratios = {
    MaxiGrow: 1.8,    // ~1.8g = 1.0 EC
    MaxiBloom: 1.5,   // ~1.5g = 1.0 EC
    KoolBloom: 1.0    // ~1.0g = 1.0 EC
  };

  const adjustedEC = Math.max(0, targetEC - startingEC);

  const ecToGrams = (ec, strength) => +(ec * strength).toFixed(2);

  const getNutrients = () => {
    switch (phase) {
      case "veg":
        return {
          MaxiGrow: ecToGrams(adjustedEC, ratios.MaxiGrow),
          MaxiBloom: 0,
          KoolBloom: 0,
        };
      case "early":
        return {
          MaxiGrow: 0,
          MaxiBloom: ecToGrams(adjustedEC, ratios.MaxiBloom),
          KoolBloom: 0,
        };
      case "mid":
        return {
          MaxiGrow: 0,
          MaxiBloom: ecToGrams(adjustedEC * 0.75, ratios.MaxiBloom),
          KoolBloom: ecToGrams(adjustedEC * 0.25, ratios.KoolBloom),
        };
      case "late":
        return {
          MaxiGrow: 0,
          MaxiBloom: ecToGrams(adjustedEC * 0.4, ratios.MaxiBloom),
          KoolBloom: ecToGrams(adjustedEC * 0.6, ratios.KoolBloom),
        };
      case "flush":
        return {
          MaxiGrow: 0,
          MaxiBloom: 0,
          KoolBloom: 0,
        };
      default:
        return {};
    }
  };

  const nutrients = getNutrients();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chronic Worm Farmer Nutrient Calculator</h1>

      <div className="mb-4">
        <Label>Starting EC (e.g. tap = 1.2)</Label>
        <Input type="number" step="0.1" value={startingEC} onChange={(e) => setStartingEC(parseFloat(e.target.value))} />
      </div>

      <div className="mb-4">
        <Label>Target EC</Label>
        <Input type="number" step="0.1" value={targetEC} onChange={(e) => setTargetEC(parseFloat(e.target.value))} />
      </div>

      <div className="mb-4 space-x-2">
        <button onClick={() => setPhase("veg")} className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">
          Veg
        </button>
        <button onClick={() => setPhase("early")} className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">
          Early Flower
        </button>
        <button onClick={() => setPhase("mid")} className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">
          Mid Flower
        </button>
        <button onClick={() => setPhase("late")} className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">
          Late Flower
        </button>
        <button onClick={() => setPhase("flush")} className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">
          Flush
        </button>
      </div>

      <Card>
        <CardContent className="p-4 space-y-2">
          {phase === "flush" ? (
            <p className="text-center">No nutrients – Flush phase</p>
          ) : (
            <>
              {nutrients.MaxiGrow > 0 && <p>MaxiGrow: {nutrients.MaxiGrow}g per gallon</p>}
              {nutrients.MaxiBloom > 0 && <p>MaxiBloom: {nutrients.MaxiBloom}g per gallon</p>}
              {nutrients.KoolBloom > 0 && <p>KoolBloom: {nutrients.KoolBloom}g per gallon</p>}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
              }
