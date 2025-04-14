import { useState } from 'react';

export default function NutrientCalculator() {
  const [inputEC, setInputEC] = useState(0);
  const [ppm, setPPM] = useState(0);
  const [grams, setGrams] = useState({ maxigrow: 0, maxibloom: 0, koolbloom: 0 });

  const calculateFromEC = () => {
    const ppmValue = Math.round(inputEC * 500);
    setPPM(ppmValue);
    setGrams({
      maxigrow: +(inputEC * 1.5).toFixed(2),
      maxibloom: +(inputEC * 1.3).toFixed(2),
      koolbloom: +(inputEC * 0.6).toFixed(2),
    });
  };

  const calculateFromPPM = () => {
    const ecValue = +(ppm / 500).toFixed(2);
    setInputEC(ecValue);
    setGrams({
      maxigrow: +(ecValue * 1.5).toFixed(2),
      maxibloom: +(ecValue * 1.3).toFixed(2),
      koolbloom: +(ecValue * 0.6).toFixed(2),
    });
  };

  return (
    <div>
      <h1>Chronic Worm Farmer Nutrient Calculator</h1>
      <div>
        <input
          type=\"number\"
          value={inputEC}
          onChange={(e) => setInputEC(parseFloat(e.target.value))}
          placeholder=\"Enter EC\"
        />
        <button onClick={calculateFromEC}>Convert from EC</button>
      </div>
      <div>
        <input
          type=\"number\"
          value={ppm}
          onChange={(e) => setPPM(parseInt(e.target.value))}
          placeholder=\"Enter PPM\"
        />
        <button onClick={calculateFromPPM}>Convert from PPM</button>
      </div>
      <div>
        <p>MaxiGrow: {grams.maxigrow} g/gal</p>
        <p>MaxiBloom: {grams.maxibloom} g/gal</p>
        <p>KoolBloom: {grams.koolbloom} g/gal</p>
      </div>
    </div>
  );
}
