import { Link } from 'react-router-dom';
import { Github, Linkedin, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Learn', path: '/courses' },
        { name: 'Projects', path: '/projects' },
        { name: 'Components', path: '/components' },
        { name: 'Events', path: '/events' },
        { name: 'Community', path: '/community' },
        { name: 'Articles', path: '/articles' },
        { name: 'Documentation', path: '/docs' },
        { name: 'Tools', path: '/tools' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Careers', path: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'GitHub', path: 'https://github.com', external: true },
        { name: 'Documentation', path: '/docs' },
        { name: 'Support', path: '/support' },
        { name: 'FAQ', path: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="bg-bg-base border-t border-border-thin mt-20">
      <div className="container-custom py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-display font-bold text-text-primary mb-4 block">
              TECHINS
            </Link>
            <p className="text-text-secondary text-sm mb-6">
              Build Hardware. Learn Electronics.
              <br />
              Create the Future.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-bg-surface border border-border-thin flex items-center justify-center hover:border-accent-primary hover:text-accent-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-text-primary font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-accent-primary text-sm transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-text-secondary hover:text-accent-primary text-sm transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-border-thin flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} TECHINS HARDWARE. All rights reserved.
          </p>
          <p className="text-text-muted text-sm">
            Built with React, Node.js, Express & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
