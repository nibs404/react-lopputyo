import { useState, useEffect } from 'react';
import './noteblox.css';

function Blox() {
  const [notes, setNotes] = useState([]);

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

  return (
    <div className="notes-container">
      {notes.length === 0 ? (
        <p>No notes to display yet!</p>
      ) : (
        notes.map((note) => (
          <div className="note-box" key={note.id}>
            <p>Course: {note.course.name}</p>
            <p>Text: {note.text}</p>
            <p>Time: {note.timestamp}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Blox;