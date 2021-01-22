import './App.css';
import React, { useState } from 'react';
import CharacterLengthSlider from './slider.js'

const PasswordView = () => {
  const [password, updatePassword] = useState("");

  const generatePassword = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let newPassword = []
    for (let i = 0; i < 10; i++) {
      newPassword.push(alphabet[Math.floor(26 * Math.random())])
      newPassword.join("");
    }
    updatePassword(newPassword);
  }
  return (
    <div>
      <button onClick={() => generatePassword()}>Click to generate password</button>
      <div className="passwordView">
        {password}
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
      <PasswordView />
      <CharacterLengthSlider />
    </div>
  )
}
export default App;
