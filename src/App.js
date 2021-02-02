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

  const generatePassword = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
      ""
    );
    const digits = "0123456789".split("");
    const symbols = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~".split("");
    let passwordCharSet = [];
    if (includeDigit && includeSymbol) {
      passwordCharSet = alphabet.concat(digits.concat(symbols));
    } else if (includeDigit) {
      passwordCharSet = alphabet.concat(digits);
    } else if (includeSymbol) {
      passwordCharSet = alphabet.concat(symbols);
    } else if (!includeDigit && !includeSymbol) {
      passwordCharSet = alphabet;
    }
    let newPassword = [];
    for (let i = 0; i < sliderValue; i++) {
      newPassword.push(
        passwordCharSet[Math.floor(passwordCharSet.length * Math.random())]
      );
      newPassword.join("");
    }
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
          Include symbols
          <input
            type="checkbox"
            defaultChecked="true"
            onChange={() => handleSymbolChange()}
          />
        </label>
        <label>
          Include digits
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
      <header className="App-header">Secure Password Generator</header>
      <PasswordView />
    </div>
  );
};
export default App;
