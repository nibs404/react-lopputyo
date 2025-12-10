import { useState, useEffect } from 'react';
import './courseblox.css';

function CBlox({ showDelete = false, courses: passedCourses, onCourseClick, selectedCourseId }) {
  const [courses, setCourse] = useState([]);
  // && passedCourses.length > 0)
  useEffect(() => {

    if (Array.isArray(passedCourses))  {
      setCourse(passedCourses);
      // return;
    }
  }, [passedCourses]);
  
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

  const handleDelete = (id) => {
    setCourse(prev => prev.filter(course => course.id !== id));
    const stored = JSON.parse(localStorage.getItem("courses") || "[]");
    const updated = stored.filter(c => c.id !== id);
    localStorage.setItem("courses", JSON.stringify(updated));
  };

  return (
    <div className="course-container">
      {courses.length === 0 ? (
        <p>No courses to display yet!</p>
      ) : (
        courses.map((course) => (
          <div className={`course-box ${selectedCourseId === course.id ? "selected-course" : ""}`} key={course.id} onClick={()=>onCourseClick && onCourseClick(course)}>
            <p>Course: {course.name}</p>
            {showDelete && (<button className="deletebtn" onClick={(e)=> {e.stopPropagation(); handleDelete(course.id)}}>
              X delete</button>)}
          </div>
        ))
      )}
    </div>
  );
}

export default CBlox;