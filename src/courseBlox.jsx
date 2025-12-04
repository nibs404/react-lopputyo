import { useState, useEffect } from 'react';
import './courseblox.css';

function CBlox({ showDelete = false }) {
  const [courses, setCourse] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          'https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses'
        );
        const data = await response.json();

        setCourse(data || []);
      } 
      catch (error) {
        console.error("Error finding courses:", error);
      }
    };

    fetchCourse();
  }, []);

  const handleDelete = (id) => {
    setCourse(prev => prev.filter(course => course.id !== id));
  };

  return (
    <div className="course-container">
      {courses.length === 0 ? (
        <p>No courses to display yet!</p>
      ) : (
        courses.map((course) => (
          <div className="course-box" key={course.id}>
            <p>Course: {course.name}</p>
            {showDelete && (<button className="deletebtn" onClick={()=>handleDelete(course.id)}>
              X delete</button>)}
          </div>
        ))
      )}
    </div>
  );
}

export default CBlox;