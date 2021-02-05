import "./App.css";
import React, { useState, useEffect } from "react";
import Slider from "react-rangeslider";

const PasswordView = () => {
  const [password, updatePassword] = useState("");
  const [generatePasswordClicked, handleGeneratePasswordClick] = useState(
    false
  );
  const [sliderValue, updateValue] = useState(10);
  const [includeDigit, updateDigitChange] = useState(true);
  const [includeSymbol, updateSymbolChange] = useState(true);
  useEffect(() => generatePassword(), [
    sliderValue,
    includeDigit,
    includeSymbol,
  ]);

  const handleChange = (value) => {
    if (sliderValue !== value) {
      updateValue(value);
    }
  };

  const clipboardCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(
      function () {
        /* clipboard success message/action*/
      },
      function () {
        /* clipboard failure message/action*/
      }
    );
  };

  const handleSymbolChange = () => {
    updateSymbolChange(!includeSymbol);
  };

  const handleDigitChange = () => {
    updateDigitChange(!includeDigit);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const generatePassword = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
      ""
    );
    const digits = "0123456789".split("");
    const symbols = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~".split("");

    let newPassword = [];
    let numberOfDigits = 0;
    let numberOfSymbols = 0;
    if (includeDigit) {
      numberOfDigits = randomInt(1, sliderValue / 3);
    }
    if (includeSymbol) {
      numberOfSymbols = randomInt(1, sliderValue / 3);
    }

    for (let i = 0; i < numberOfDigits; i++) {
      newPassword.push(digits[Math.floor(digits.length * Math.random())]);
    }
    for (let j = 0; j < numberOfSymbols; j++) {
      newPassword.push(symbols[Math.floor(symbols.length * Math.random())]);
    }
    for (let k = 0; k < sliderValue - numberOfDigits - numberOfSymbols; k++) {
      newPassword.push(alphabet[Math.floor(alphabet.length * Math.random())]);
    }
    newPassword.join("");
    handleGeneratePasswordClick(true);
    updatePassword(newPassword);
  };

  return (
    <div>
      <div className="rangeslider-horizontal">
        <Slider
          min={10}
          max={100}
          value={sliderValue}
          onChange={handleChange}
        />
      </div>
      <div className="value">{sliderValue} Characters</div>
      <button onClick={() => generatePassword(sliderValue)}>
        Generate password
      </button>
      <button onClick={() => clipboardCopy(password.join(""))}>
        Copy to Clipboard
      </button>
      <div className="passwordView">
        {generatePasswordClicked ? password : null}
      </div>
      <form>
        <label>
          Allow symbols
          <input
            type="checkbox"
            defaultChecked="true"
            onChange={() => handleSymbolChange()}
          />
        </label>
        <label>
          Allow digits
          <input
            type="checkbox"
            defaultChecked="true"
            onChange={() => handleDigitChange()}
          />
        </label>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Password Generator</header>
      <PasswordView />
    </div>
  );
};
export default App;
