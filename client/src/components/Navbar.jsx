import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, LogOut, ChevronDown } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
  }, [location]);

  // Primary links shown directly in navbar
  const primaryNavLinks = [
    { name: 'Explore', path: '/' },
    { name: 'Learn', path: '/courses' },
    { name: 'Projects', path: '/projects' },
    { name: 'Components', path: '/components' },
    { name: 'Community', path: '/community' },
  ];

  // Secondary links in "More" dropdown
  const moreNavLinks = [
    { name: 'Workshops', path: '/events' },
    { name: 'Hackathons', path: '/events' },
    { name: 'Articles', path: '/articles' },
    { name: 'Tools', path: '/tools' },
  ];

  // All links for mobile menu
  const allNavLinks = [...primaryNavLinks, ...moreNavLinks];

  return (
    <>
      {/* Floating Pill Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-8 pt-4 md:pt-6">
        <div
          className={`max-w-[95%] lg:max-w-[90%] mx-auto rounded-full bg-bg-surface/85 backdrop-blur-lg border border-border-thin shadow-lg transition-all duration-200 ${
            isScrolled ? 'py-3' : 'py-4'
          }`}
        >
          <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
            {/* Logo - Left */}
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <Logo />
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-1">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02] rounded-full ${
                    location.pathname === link.path
                      ? 'text-text-primary bg-bg-surface-alt'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-all duration-200 hover:scale-[1.02] rounded-full"
                >
                  More
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMoreDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsMoreDropdownOpen(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 w-48 bg-bg-surface border border-border-thin rounded-2xl shadow-xl overflow-hidden z-20">
                      {moreNavLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-surface-alt transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right side controls - Desktop */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <button className="w-10 h-10 rounded-full bg-transparent border border-border-thin flex items-center justify-center hover:border-accent-primary transition-colors">
                <Search className="w-4 h-4 text-text-secondary" />
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-thin text-sm font-medium text-text-primary hover:border-accent-primary transition-colors">
                      <User className="w-4 h-4" />
                      {user?.name}
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-bg-surface border border-border-thin rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm hover:bg-bg-surface-alt transition-colors"
                      >
                        Profile
                      </Link>
                      {user?.role !== 'user' && (
                        <Link
                          to="/my-learning"
                          className="block px-4 py-3 text-sm hover:bg-bg-surface-alt transition-colors"
                        >
                          My Learning
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-bg-surface-alt transition-colors flex items-center gap-2 text-accent-error"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full border border-border-thin text-sm font-medium text-text-primary hover:border-accent-primary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 rounded-full bg-accent-primary text-bg-base text-sm font-medium hover:shadow-[0_0_20px_rgba(212,151,30,0.35)] transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-transparent border border-border-thin flex items-center justify-center hover:border-accent-primary transition-colors flex-shrink-0"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-bg-base/95 backdrop-blur-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative h-full flex flex-col items-center justify-center gap-6 p-8 pt-24">
            {allNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-3xl md:text-4xl font-display transition-colors ${
                  location.pathname === link.path
                    ? 'text-accent-primary'
                    : 'text-text-primary hover:text-accent-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="w-full text-center px-6 py-3 rounded-full border border-border-thin text-sm font-medium text-text-primary hover:border-accent-primary transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-center px-6 py-3 rounded-full border border-border-thin text-sm font-medium text-accent-error hover:border-accent-error transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center px-6 py-3 rounded-full border border-border-thin text-sm font-medium text-text-primary hover:border-accent-primary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center px-6 py-3 rounded-full bg-accent-primary text-bg-base text-sm font-medium hover:shadow-[0_0_20px_rgba(212,151,30,0.35)] transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
