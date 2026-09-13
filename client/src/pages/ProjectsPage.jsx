import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container-custom py-24">
      <h1 className="text-display-mobile lg:text-display-sm font-display mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <p className="text-text-secondary">Loading...</p> :
         projects.length === 0 ? <p className="text-text-secondary">No projects found.</p> :
         projects.map((project) => (
           <Link key={project._id} to={`/projects/${project.slug}`} className="card card-hover p-6">
             <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
             <p className="text-text-secondary text-sm">{project.description}</p>
           </Link>
         ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
