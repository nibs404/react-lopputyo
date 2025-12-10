import CBlox from './courseBlox.jsx'
import { useState, useEffect } from 'react';

function AddCourse() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");

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

  const handleAddCourse = () => {
    if (!newCourseName.trim()) return;

    const newCourse = {
      id: crypto.randomUUID(),
      name: newCourseName,
    };

    setCourses(prev => [...prev, newCourse]);
    const stored = JSON.parse(localStorage.getItem("courses") || "[]");
    localStorage.setItem("courses", JSON.stringify([...stored, newCourse]));
    setNewCourseName("");
    setShowForm(false);
  };

  return (
    <>
      <CBlox
        showDelete={true}
        courses={courses}
      />

      <br />
      <button onClick={() => setShowForm(v => !v)}>
        Add A Course +
      </button>

      {showForm && (
        <div className="add-course-form">
          <input
            type="text"
            placeholder="Course name…"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
          />

          <button onClick={handleAddCourse}>Save Course</button>
        </div>
      )}
    </>
  );
}

export default AddCourse;