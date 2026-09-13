import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Cpu, Wifi, CircuitBoard } from 'lucide-react';
import HeroScene from '../components/HeroScene';
import { categoriesAPI, coursesAPI, projectsAPI, eventsAPI, questionsAPI, articlesAPI } from '../services/api';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [categoriesRes, coursesRes, projectsRes, eventsRes, questionsRes, articlesRes] = await Promise.all([
          categoriesAPI.getAll(),
          coursesAPI.getAll({ limit: 6 }),
          projectsAPI.getAll({ featured: true, limit: 6 }),
          eventsAPI.getAll({ featured: true, limit: 3 }),
          questionsAPI.getAll({ limit: 5 }),
          articlesAPI.getAll({ featured: true, limit: 4 }),
        ]);

        setCategories(categoriesRes.data.categories || []);
        setCourses(coursesRes.data.courses || []);
        setProjects(projectsRes.data.projects || []);
        setEvents(eventsRes.data.events || []);
        setQuestions(questionsRes.data.questions || []);
        setArticles(articlesRes.data.articles || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Extra padding for floating navbar */}
      <section className="container-custom pt-40 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <h1 className="text-display-sm lg:text-display-md font-display mb-6 leading-tight">
            Build the Hardware
            <br />
            <span className="text-gradient-amber">Behind Tomorrow</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Learn electronics, build embedded systems, design PCBs, explore IoT and turn your ideas into real-world hardware.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/projects/create" className="btn-pill-accent">
              Start Building
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/projects" className="btn-pill-ghost">
              Explore Projects
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeroScene />
        </motion.div>
      </section>

      {/* Hardware Categories */}
      <Section title="Hardware Categories" eyebrow="EXPLORE">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {loading ? (
            [...Array(10)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            categories.slice(0, 10).map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.slug}`}
                className="card card-hover p-6 group"
              >
                <div className="w-12 h-12 rounded-lg bg-bg-surface-alt flex items-center justify-center mb-4 group-hover:bg-accent-primary/10 transition-colors">
                  <CategoryIcon name={category.icon} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{category.name}</h3>
                <p className="text-sm text-text-muted line-clamp-2">{category.description}</p>
              </Link>
            ))
          )}
        </div>
      </Section>

      {/* Featured Courses */}
      <Section title="Featured Courses" eyebrow="LEARN" link="/courses">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} height="h-80" />)
          ) : (
            courses.map((course) => (
              <Link
                key={course._id}
                to={`/courses/${course.slug}`}
                className="card card-hover overflow-hidden group"
              >
                <div className="h-48 bg-bg-surface-alt overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Cpu className="w-16 h-16 text-accent-primary/20" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-amber">{course.level}</span>
                    <span className="text-xs text-text-muted">{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{course.description}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </Section>

      {/* Featured Projects */}
      <Section title="Featured Projects" eyebrow="BUILD" link="/projects">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} height="h-80" />)
          ) : (
            projects.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project.slug}`}
                className="card card-hover overflow-hidden group"
              >
                <div className="h-48 bg-bg-surface-alt overflow-hidden">
                  {project.images?.[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CircuitBoard className="w-16 h-16 text-accent-primary/20" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-amber">{project.difficulty}</span>
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      ❤️ {project.likesCount || 0}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{project.description}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section title="Upcoming Events" eyebrow="COMPETE" link="/events">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            [...Array(3)].map((_, i) => <SkeletonCard key={i} height="h-64" />)
          ) : (
            events.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event.slug}`}
                className="card card-hover p-6 group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge-amber">{event.type}</span>
                  {event.online && <span className="badge-gray">Online</span>}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-3 mb-4">{event.description}</p>
                <div className="text-xs text-text-muted">
                  📅 {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </Link>
            ))
          )}
        </div>
      </Section>

      {/* Community Questions */}
      <Section title="Community Questions" eyebrow="DISCUSS" link="/community">
        <div className="space-y-4">
          {loading ? (
            [...Array(5)].map((_, i) => <SkeletonCard key={i} height="h-24" />)
          ) : (
            questions.map((question) => (
              <Link
                key={question._id}
                to={`/questions/${question._id}`}
                className="card card-hover p-6 flex items-start gap-4 group"
              >
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <span className="text-xl font-semibold text-text-primary">{question.votes || 0}</span>
                  <span className="text-xs text-text-muted">votes</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                    {question.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {question.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="badge-gray text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-text-muted whitespace-nowrap">
                  {question.answerCount || 0} answers
                </div>
              </Link>
            ))
          )}
        </div>
      </Section>

      {/* Latest Articles */}
      <Section title="Latest Articles" eyebrow="READ" link="/articles">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            [...Array(4)].map((_, i) => <SkeletonCard key={i} height="h-80" />)
          ) : (
            articles.map((article) => (
              <Link
                key={article._id}
                to={`/articles/${article.slug}`}
                className="card card-hover overflow-hidden group"
              >
                <div className="h-40 bg-bg-surface-alt overflow-hidden">
                  {article.thumbnail ? (
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Zap className="w-12 h-12 text-accent-primary/20" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-amber text-xs">{article.category}</span>
                    <span className="text-xs text-text-muted">{article.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="container-custom py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="card p-12 text-center"
        >
          <h2 className="text-display-mobile lg:text-display-sm font-display mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Join thousands of hardware enthusiasts learning, building, and sharing innovative projects.
          </p>
          <Link to="/register" className="btn-pill-accent text-lg">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

// Section wrapper component
const Section = ({ title, eyebrow, link, children }) => (
  <section className="container-custom py-16">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
    >
      <div className="flex items-end justify-between mb-8">
        <div className="relative">
          {/* Rotating ring accent */}
          <div className="absolute -left-8 -top-8 w-24 h-24 opacity-20">
            <svg className="rotating-ring" viewBox="0 0 100 100" fill="none">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#D4971E"
                strokeWidth="2"
                strokeDasharray="70 213"
              />
            </svg>
          </div>
          <p className="eyebrow mb-2">{eyebrow}</p>
          <h2 className="text-4xl lg:text-5xl font-display">{title}</h2>
        </div>
        {link && (
          <Link to={link} className="link flex items-center gap-2 text-sm font-medium">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      {children}
    </motion.div>
  </section>
);

// Skeleton loader
const SkeletonCard = ({ height = 'h-64' }) => (
  <div className={`card ${height} animate-pulse bg-bg-surface`}>
    <div className="h-full bg-bg-surface-alt rounded-lg" />
  </div>
);

// Category icon mapper
const CategoryIcon = ({ name }) => {
  const icons = {
    Zap: Zap,
    Cpu: Cpu,
    Wifi: Wifi,
    CircuitBoard: CircuitBoard,
  };
  const Icon = icons[name] || Cpu;
  return <Icon className="w-6 h-6 text-accent-primary" />;
};

export default HomePage;
