import { useState } from 'react';
import Select from 'react-select';

export default function Home() {
  const [inputEC, setInputEC] = useState('');
  const [startingEC, setStartingEC] = useState('');
  const [ppm, setPPM] = useState('');
  const [results, setResults] = useState(null);
  const [waterType, setWaterType] = useState(null);

  const calculate = () => {
    const ec = parseFloat(inputEC);
    const baseEC = parseFloat(startingEC) || 0;
    const adjustedEC = ec - baseEC;
    const ppmValue = Math.round(adjustedEC * 500);
    const maxigrow = +(adjustedEC * 1.5).toFixed(2);
    const maxibloom = +(adjustedEC * 1.3).toFixed(2);
    const koolbloom = +(adjustedEC * 0.6).toFixed(2);
    setPPM(ppmValue);
    setResults({ maxigrow, maxibloom, koolbloom });
  };

  const waterOptions = [
    { value: 'Distilled', label: 'Distilled' },
    { value
