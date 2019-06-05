import React from 'react';
import './App.css';
import './Components/Forms/Forms'
import Forms from './Components/Forms/Forms';
import logo from './assert/Challenge(1).png'

function App() {

  const newDate = new Date ();
  const day = String (newDate.getDate()-1).padStart(2, '0');
  const month = String (newDate.getMonth()+1).padStart(2, '0');
  const year = String(newDate.getFullYear());
  const today= year + '-' + month + '-' + day;
 

  return (
    <div className="App">
        <img src={logo} className='logo' alt="logo" />
        <Forms date={today} />
        
    </div>
  );
}

export default App;
