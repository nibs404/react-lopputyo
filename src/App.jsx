import { useState } from 'react'
import './App.css'
import logo from './assets/ailimelogo.png';

function App() {
  
  return (
    <>
      <header>
        
        <h1><img src={logo} alt="logo" id='limelogo' />Luentomuistiinpanosofta</h1>
        <textarea name="muistiinpano_kenttä" id="note"></textarea>
        <button id='addbtn'>Save</button>
        </header>    
    </>
  )
}

export default App
