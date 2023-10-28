import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, symbolAllowed]);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (symbolAllowed) str += "!@#$%^&*()_)";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="w-full border-2 border-white max-w-md mx-auto shadow-lg text-2xl rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Passwored Generator</h1>
      <div className="flex shadow-md border-white rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="text-sm outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
        />
        <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-700 text-white text-sm px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center justify-around gap-x-6 ">
          <div className="flex gap-x-2 ">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
              name=""
              id=""
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex gap-x-2 ">
            <input
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="rounded-md"
              type="checkbox"
            />
            <label>Numbers</label>
          </div>
          <div className="flex gap-x-2 ">
            <input
              type="checkbox"
              defaultChecked={symbolAllowed}
              onChange={() => setSymbolAllowed((prev) => !prev)}
              className="rounded-md"
            />
            <label>Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
