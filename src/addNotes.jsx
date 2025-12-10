import Blox from './noteBlox.jsx'
import { useState, useEffect } from 'react';
import CBlox from './courseBlox.jsx'


function AddNote() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
  
      const res = await fetch(
        'https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses'
      );
      const apiData = await res.json();
  
      const stored = JSON.parse(localStorage.getItem("courses") || "[]");
  

      setCourses([...apiData, ...stored]);
    };
  
    fetchCourses();
  }, []);

  const saveNote = () => {
    if (!selectedCourse || !noteText.trim()) return;
  
    const newNote = {
      id: crypto.randomUUID(),
      courseId: selectedCourse.id,
      text: noteText,
      timestamp: new Date().toLocaleString()
    };
  
    const existingNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    localStorage.setItem("notes", JSON.stringify([...existingNotes, newNote]));
  
    setNoteText("");
    alert("Note saved succesfully :)");
  };
  // const newNote = {
  //   id: crypto.randomUUID(),
  //   courseId: selectedCourse.id,
  //   text: noteText,
  //   timestamp: new Date().toLocaleString()
  // };
  // const existingNotes=JSON.parse(localStorage.getItem("notes")||"[]");
  // localStorage.setItem("notes", JSON.stringify([existingNotes, newNote]));
  // setNoteText("");
  // alert("Note saved succesfully?")


  return (
    <>
      
        <CBlox 
        showDelete={false}
        courses={courses}
        selectedCourseId={selectedCourse?.id}
        onCourseClick={(course)=> setSelectedCourse(course)}
        />
        <br />
        <textarea
        name="muistiinpano_kenttä"
        id="note"
        value={noteText}
        onChange={(e)=>setNoteText(e.target.value)}
        />
        <button id='addbtn' onClick={saveNote}>Save</button>
        
    </>

  )
}

export default AddNote