import { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/ailimelogo.png'
import AddNote from './addNotes.jsx'
import AddCourse from './addCourse.jsx'
import AllNotes from './allNotes.jsx'


function App() {
  const [activeComponent, setActiveComponent] = useState('');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'addNote':
        return <AddNote />;
      case 'addCourse':
        return <AddCourse />;
      case 'allNotes':
        return <AllNotes />;

    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("notes");
    localStorage.removeItem("courses");
    alert("Local storage cleared!");
    window.location.reload();
  };

  return (
    <>
    <header>
      <div className="titlecont">
        <h1>
          <img src={logo} alt="logo" id="limelogo" />
          Luentomuistiinpanosofta
        </h1>
      </div>
      <div className="menucont">
        <button onClick={() => setActiveComponent('addNote')}>Add Note</button>
        <button onClick={() => setActiveComponent('addCourse')}>Add Course</button>
        <button onClick={() => setActiveComponent('allNotes')}>All Notes</button>
        <button onClick={clearLocalStorage} style={{ backgroundColor: "red", border: "2px solid black" }} >!clear local storage!</button>
      </div>
    </header>
    <main>{renderComponent()}</main>
  </>
);
}
  

export default App
