import './App.css';
import React, { useState } from 'react';

const PasswordView = () => {
const [password, updatePassword] = useState("");

const generatePassword = () => {
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let newPassword = []
for (let i = 0; i< 10; i++){
  newPassword.push(alphabet[Math.floor(26*Math.random())])
newPassword.join("");
}
updatePassword(newPassword);
  }

  return(
    <div className = "passwordView">
    {password}
     <button onClick={ () => generatePassword()}>Click to generate password</button>
    </div>
   
  )
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
          Secure Password Generator
      </header>
      <PasswordView/>
     </div>
  );
}
export default App;
