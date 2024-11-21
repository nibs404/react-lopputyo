import { useState, useEffect } from 'react'
import './noteblox.css'

function Blox() {

const [notes, setNotes] = useState([]);

useEffect(() => {
    const fetchNotes = async () => {
    try {
        const response = await fetch(
        'https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes'
        );
        const data = await response.json();
        setNotes(data.notes || []);
    } 
    catch (error) {
        console.error('Failed to fetch notes:', error);
    }
    };

    fetchNotes();
}, []);

return ( 
<div className="notes-container">
    {notes.length === 0 ? (
        <p>No notes to display yet!</p>
    ) : (
        notes.map((note, index) => (
            <div className="note-box" key={index}>
                {note.content}
            </div>
        ))
    )}
</div>
)
}

export default Blox()