import { useState } from "react";
import logo from "../logo.svg";

function App() {
  const [numberInput, setNumberInput] = useState("");
  const [result, setResult] = useState("");

  const handleCheckOdd = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/check_odd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: numberInput }),
      });
      const data = await response.json();
      setResult(data.result || data.error || "Something went wrong.");
    } catch (error) {
      console.error(error);
      setResult("Error occurred.");
    }
  };

  return (
    <div className="container">
      <div>
        <img src={logo} alt="logo" />
        <input
          type="text"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value)}
          placeholder="Enter a number"
        />
        <button onClick={handleCheckOdd}>Check</button>
        {result && (
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
