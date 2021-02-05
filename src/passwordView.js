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
  const [copyText, updateCopyText] = useState("Click to copy");

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
        updateCopyText("Copied!");
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
    const symbols = "!#$%&'()*+,./:;<=>?@[]^_`{|}~".split("");

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
    shuffle(newPassword);
    newPassword.join("");
    handleGeneratePasswordClick(true);
    updatePassword(newPassword);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space") {
      generatePassword();
      updateCopyText("Click to copy");
    }
  };

  const copyPassword = () => {
    clipboardCopy(password.join(""));
  };

  useEffect(() => {
    document.title = "Password Generator";
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="App">
      <div id="notTheControlPanel" onClick={() => copyPassword()}>
        <div className="passwordView">
          {generatePasswordClicked ? password : null}
        </div>
        <div id="copyText">{copyText}</div>
      </div>
      <div id="theControlPanel">
        {/* <div className="rangeslider-horizontal"> */}
        <Slider
          min={10}
          max={100}
          value={sliderValue}
          onChange={handleChange}
        />
        {/* </div> */}
        <div className="value">{sliderValue} Characters</div>
        <form id="digitsSymbolsInput">
          <label>
            <input
              type="checkbox"
              defaultChecked="true"
              onChange={() => handleSymbolChange()}
            />
            Symbols
            <span class="label"></span>
          </label>
          <label>
            <input
              type="checkbox"
              defaultChecked="true"
              onChange={() => handleDigitChange()}
            />
            Numbers
            <span class="label"></span>
          </label>
        </form>
      </div>
    </div>
  );
};

export default PasswordView;
