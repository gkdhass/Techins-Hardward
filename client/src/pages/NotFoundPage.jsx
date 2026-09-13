import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-display-sm font-display text-accent-primary mb-4">404</h1>
        <p className="text-2xl text-text-primary mb-2">Page Not Found</p>
        <p className="text-text-secondary mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-pill-accent inline-flex items-center gap-2">
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
