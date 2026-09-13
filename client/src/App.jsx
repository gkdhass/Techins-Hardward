import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ComponentsPage from './pages/ComponentsPage';
import ComponentDetailPage from './pages/ComponentDetailPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import CommunityPage from './pages/CommunityPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ToolsPage from './pages/ToolsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Main routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          
          {/* Courses */}
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route 
            path="/my-learning" 
            element={
              <ProtectedRoute>
                <CoursesPage myLearning />
              </ProtectedRoute>
            } 
          />
          
          {/* Projects */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route 
            path="/projects/create" 
            element={
              <ProtectedRoute>
                <ProjectsPage create />
              </ProtectedRoute>
            } 
          />
          
          {/* Components */}
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/components/:slug" element={<ComponentDetailPage />} />
          
          {/* Events */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="/hackathons" element={<EventsPage hackathons />} />
          <Route path="/workshops" element={<EventsPage workshops />} />
          
          {/* Community */}
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/questions/:id" element={<QuestionDetailPage />} />
          <Route 
            path="/ask" 
            element={
              <ProtectedRoute>
                <CommunityPage ask />
              </ProtectedRoute>
            } 
          />
          
          {/* Articles */}
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          
          {/* Tools */}
          <Route path="/tools" element={<ToolsPage />} />
          
          {/* Profile */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/users/:username" element={<ProfilePage />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
