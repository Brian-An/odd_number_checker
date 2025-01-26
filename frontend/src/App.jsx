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
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-300">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <img src={logo} alt="logo" className="mx-auto mb-4" />
        <div className="p-4">
          <input
            type="text"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            placeholder="Enter a number"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="p-4 flex justify-center">
          <button
            onClick={handleCheckOdd}
            className="bg-yellow-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Check
          </button>
        </div>
        {result && <p className="text-center">{result}</p>}
      </div>
    </div>
  );
}

export default App;
