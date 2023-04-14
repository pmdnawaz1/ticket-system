import { Link, Outlet } from "react-router-dom";

import "./index.css";

const Header = () => (
  <>
    <nav className="nav-header">
      <div className="blog-container">
        <h1 className="blog-title">Ticketing System</h1>
        <ul className="nav-menu">
          <li>
            <Link className="nav-link" to="/comment">
              Comment
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/loginform">
              LoginFor
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/ticketform">
              TicketForm
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/ticketlist">
              Ticketlist
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/userlist">
              UserList
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    <Outlet />
  </>
);

export default Header;
