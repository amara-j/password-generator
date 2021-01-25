import './App.css';
import React, { useState } from 'react';
import Slider from 'react-rangeslider'
// import 'react-rangeslider/lib/index.css'


const CharacterLengthSlider = () => {
  const [password, updatePassword] = useState("");
  const [generatePasswordClicked, handleGeneratePasswordClick] = useState(false);
  const [sliderValue, updateValue] = useState(10);

  const handleChange = (value) => {
    sliderValue === value ? console.log('hi') :
      updateValue(value)
    generatePassword(value)
  };


  const generatePassword = (length) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let newPassword = []
    for (let i = 0; i < length; i++) {
      newPassword.push(alphabet[Math.floor(26 * Math.random())])
      newPassword.join("");
    }
    handleGeneratePasswordClick(true);
    updatePassword(newPassword);
  }

  return (
    <div>
    <div className='rangeslider-horizontal'>
      <Slider
        min={10}
        max={100}
        value={sliderValue}
        onChange={handleChange}
      />
          </div>
      <div className='value'>{sliderValue} Characters</div>
      <button onClick={() => generatePassword(sliderValue)}>Click to generate password</button>
      <div className="passwordView">
        {generatePasswordClicked ? password : null}
      </div>
</div>
  )
}


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Secure Password Generator
      </header>
      <CharacterLengthSlider />
    </div>
  )
}
export default App;
