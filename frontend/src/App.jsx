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
    <div className="min-h-screen bg-gray-700 items-center justify-center p-4">
      <div className="bg-transparent flex-col justify-center mb-6">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="p-7"/>
          <div className="p-4">
            <input
              type="text"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="Enter a number"
              className="border-2 rounded-xl justify-center"
            />
          </div>
          
          <div className="p-4">
            <button onClick={handleCheckOdd} className="border-2 rounded-xl justify-center">Check</button>
          </div>
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
    </div>
  );
}

export default App;
