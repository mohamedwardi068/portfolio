import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import astronautHelmet from '../assets/astronaut-helmet.png';
import deadEye from '../assets/dead-eye.png';
import stack from '../assets/stack.png';
import envelope from '../assets/envelope.png';
import '../styles/nav.css';

export default function Nav() {
  const location = useLocation();

  const getNavPositionClass = () => {
    switch (location.pathname) {
      case '/':
        return 'Nav-about';
      case '/skills':
        return 'Nav-skills';
      case '/projects':
        return 'Nav-projects';
      case '/contact':  // Fixed typo here
        return 'Nav-contact';
      default:
        return '';
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'ABOUT';
      case '/skills':
        return 'SKILLS';
      case '/projects':
        return 'PROJECTS';
      case '/contact':  // Fixed typo here
        return 'CONTACT';
      default:
        return '';
    }
  };

  const navPositionClass = getNavPositionClass();
  const pageTitle = getPageTitle();

  const isCurrentPage = (navClass) => navClass === navPositionClass;

  const renderNavLink = (to, imgsrc, altText, navClass) => {
    const isCurrent = isCurrentPage(navClass);
    const linkClass = isCurrent ? 'nav-link-current' : 'nav-link';

    return (
      <Link to={to} className={linkClass}>
        <img src={imgsrc} alt={altText} />
        {isCurrent && <h1 className="page-title">{pageTitle}</h1>}
      </Link>
    );
  };

  return (
    <nav className={`nav ${navPositionClass}`}>
      {renderNavLink('/', astronautHelmet, 'astronaut helmet icon', 'Nav-about')}
      {renderNavLink('/skills', deadEye, 'dead eye icon', 'Nav-skills')}
      {renderNavLink('/projects', stack, 'stack icon', 'Nav-projects')}
      {renderNavLink('/contact', envelope, 'envelope icon', 'Nav-contact')}
    </nav>
  );
}
