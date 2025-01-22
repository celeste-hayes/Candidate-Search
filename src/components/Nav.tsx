import { Link, useLocation } from 'react-router-dom';
import '../index.css';

const Nav = () => {
  const currentPage = useLocation().pathname;

  return (
    <nav className='nav'>
      <li className="nav-item">
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/SavedCandidates"
          className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}
        >
          Potential Candidates
        </Link>
      </li>
    </nav>
  );
};

export default Nav;