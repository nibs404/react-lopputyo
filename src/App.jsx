import { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/ailimelogo.png'
//  import './Blox.jsx'


function App() {

  return (
    <>
      <header>
        <div className="titlecont">
        <h1>
          <img src={logo} alt="logo" id='limelogo' />
          Luentomuistiinpanosofta
        </h1>
        </div>

        <textarea name="muistiinpano_kenttä" id="note"></textarea>
        <button id='addbtn'>Save</button>
        </header>    

        {/* <div>
          <Blox />
        </div> */}
        
    </>

  )
}

export default App
