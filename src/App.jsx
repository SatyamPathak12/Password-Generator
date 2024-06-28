import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%&*()_+~`|}{[?><";
    }

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      password += str.charAt(index);
    }

    setPassword(password);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-8 my-12 bg-gray-900">
      <h1 className="text-white text-center mb-6 text-3xl font-extrabold">
        Password Generator
      </h1>
      <div className="flex shadow-md rounded-lg overflow-hidden mb-6 bg-gray-800">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-3 px-4 bg-gray-800 text-white"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-600 text-white px-6 py-3 shrink-0 hover:bg-blue-700 transition duration-300"
        >
          Copy
        </button>
      </div>
      <div className="text-white mb-4">
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-x-2">
            Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer w-full ml-4"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-6">
          <label className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            Number
          </label>
          <label className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
