import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { coursesAPI } from '../services/api';

const CourseDetailPage = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await coursesAPI.getBySlug(slug);
        setCourse(response.data.course);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) return <div className="container-custom py-24">Loading...</div>;
  if (!course) return <div className="container-custom py-24">Course not found</div>;

  return (
    <div className="container-custom py-24">
      <h1 className="text-display-mobile lg:text-display-sm font-display mb-4">{course.title}</h1>
      <p className="text-xl text-text-secondary mb-8">{course.description}</p>
      <div className="card p-8">
        <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
        <p>Level: {course.level}</p>
        <p>Duration: {course.duration}</p>
      </div>
    </div>
  );
};

export default CourseDetailPage;
