import { useState, useEffect } from 'react';
import './noteblox.css';

function Blox() {
  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          'https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes'
        );
        const data = await response.json();

        setNotes(data || []);
      } 
      catch (error) {
        console.error("Error finding notes:", error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const localNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  
    if (localNotes.length > 0) {
      setNotes(previous => [...previous, ...localNotes]);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch(
        'https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses'
      );
      const data = await res.json();
      const stored = JSON.parse(localStorage.getItem("courses")||"[]");
      setCourses([...data, ...stored]);
    };
    fetchCourses();
  }, []);

  const findCourseName = (id) => {
    const course = courses.find(c => c.id === id);
    return course ? course.name : "Unknown course";
  };

  return (
    <div className="notes-container">
      {notes.length === 0 ? (
        <p>No notes to display yet!</p>
      ) : (
        notes.map((note) => (
          <div className="note-box" key={note.id}>
            <p>
              Course:{" "}
              {note.course
                ? note.course.name             // API:n formatointi
                : findCourseName(note.courseId) // LocalStorage formatointi
              }
            </p>
            <p>Text: {note.text}</p>
            <p>Time: {note.timestamp}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Blox;