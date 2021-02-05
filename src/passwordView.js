import React, { useState, useEffect } from "react";
import Slider from "react-rangeslider";

const PasswordView = () => {
  const [password, updatePassword] = useState("");
  const [generatePasswordClicked, handleGeneratePasswordClick] = useState(
    false
  );
  const [sliderValue, updateValue] = useState(22);
  const [includeDigit, updateDigitChange] = useState(true);
  const [includeSymbol, updateSymbolChange] = useState(true);
  const [copyText, updateCopyText] = useState(
    "Press the space bar to generate a new password.  Press enter to copy."
  );

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
    navigator.clipboard.writeText(textToCopy).then(function () {
      updateCopyText("Copied!");
    });
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

  const copyPassword = () => {
    clipboardCopy(password.join(""));
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space") {
      generatePassword();
      updateCopyText("Press enter to copy");
    }
    if (e.code === "Enter") {
      copyPassword();
      updateCopyText("Copied!");
    }
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
      </div>
      <div id="theControlPanel">
        <div id="copyText">{copyText}</div>
        <div className="value">{sliderValue} Characters</div>
        <Slider
          min={10}
          max={100}
          value={sliderValue}
          onChange={handleChange}
        />
        <div className="checkboxesContainer">
          <label className="container">
            Symbols
            <input
              type="checkbox"
              defaultChecked="true"
              onChange={() => handleSymbolChange()}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Numbers
            <input
              type="checkbox"
              defaultChecked="true"
              onChange={() => handleDigitChange()}
            />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordView;
