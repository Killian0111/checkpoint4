import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <ul className="link-nav">
          <li>
            <Link className="nav-item" to="/">
              Event Horizon
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/add-event">
              Ajouter un événement
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
