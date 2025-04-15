import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function App() {
  const [startingEC, setStartingEC] = useState(1.2);
  const [targetEC, setTargetEC] = useState(2.7);
  const [phase, setPhase] = useState("veg");

  const ecToGrams = (ec, ratio) => +(ec * ratio).toFixed(2);

  const adjustedEC = targetEC - startingEC;

  const getNutrients = () => {
    switch (phase) {
      case "veg":
        return {
          MaxiGrow: ecToGrams(adjustedEC, 1),
          MaxiBloom: 0,
          KoolBloom: 0,
        };
      case "early":
        return {
          MaxiGrow: 0,
          MaxiBloom: ecToGrams(adjustedEC, 1),
          KoolBloom: 0,
        };
      case "mid":
        return {
          MaxiGrow: 0,
          MaxiBloom: ecToGrams(adjustedEC, 0.75),
          KoolBloom: ecToGrams(adjustedEC, 0.25),
        };
      case "late":
        return {
          MaxiGrow: 0,
          MaxiBloom: ecToGrams(adjustedEC, 0.4),
          KoolBloom: ecToGrams(adjustedEC, 0.6),
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

      <Tabs defaultValue="veg" value={phase} onValueChange={setPhase} className="mb-4">
        <TabsList>
          <TabsTrigger value="veg">Veg</TabsTrigger>
          <TabsTrigger value="early">Early Flower</TabsTrigger>
          <TabsTrigger value="mid">Mid Flower</TabsTrigger>
          <TabsTrigger value="late">Late Flower</TabsTrigger>
          <TabsTrigger value="flush">Flush</TabsTrigger>
        </TabsList>
      </Tabs>

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
