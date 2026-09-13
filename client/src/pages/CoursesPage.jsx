import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesAPI } from '../services/api';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesAPI.getAll();
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container-custom py-24">
      <h1 className="text-display-mobile lg:text-display-sm font-display mb-8">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-text-secondary">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-text-secondary">No courses available yet.</p>
        ) : (
          courses.map((course) => (
            <Link key={course._id} to={`/courses/${course.slug}`} className="card card-hover p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-text-secondary text-sm">{course.description}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
