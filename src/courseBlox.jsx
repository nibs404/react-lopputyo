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