import { useState } from "react";

function PassStrength() {
  const [password, setPassword] = useState("");
  const [passStrength, setStrength] = useState("Vulnerable");

  function handlePassStrength(e) {
    const pass = e.target.value;

    setPassword(pass);

    const hasLowerCase = /[a-z]/.test(pass);
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSymbols = /[^A-Za-z0-9]/.test(pass);
    const characterTypes = [
      hasLowerCase,
      hasUpperCase,
      hasNumbers,
      hasSymbols,
    ].filter(Boolean).length;

    if (pass.length === 0) {
      setStrength("Vulnerable");
      return;
    }

    if (pass.length < 8) {
      if (characterTypes >= 4) {
        setStrength("Moderate Recommendation: Increase Characters!");
        return;
      }

      setStrength(
        "Weak! Recommendation: Increase Characters and add unique characters"
      );
      return;
    }

    if (characterTypes === 4) {
      setStrength("VERY Strong!");
      return;
    }

    if (characterTypes >= 2) {
      const missing = [];

      if (!hasUpperCase) missing.push("Uppercase");
      if (!hasNumbers) missing.push("Numbers");
      if (!hasSymbols) missing.push("Symbols");

      setStrength(`Moderate! Recommendation: Add ${missing.join(" and ")}`);
      return;
    }

    setStrength("Weak! Recommendation: Add unique characters");
  }

  return (
    <div className="parent">
      <h1>Password Strength Analyzer</h1>
      <br />
      <input
        type="text"
        value={password}
        onChange={handlePassStrength}
        placeholder="Enter password"
      />
      <p>Password: {password}</p>
      <p>Strength: {passStrength}</p>
    </div>
  );
}

export default PassStrength;
