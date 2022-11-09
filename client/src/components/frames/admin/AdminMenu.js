import '../../../css/frames/admin/admin-menu.css';
import React from "react";
import { Link } from "react-router-dom";

class AdminMenu extends React.Component {
  render() {
    return (
      <div className="admin-menu">
        <div>
          <Link to="/admin/dashboard">
            <button>Dashboard</button>
          </Link>
        </div>
        <div>
          <Link to="/admin/admin-home">
            <button>Home</button>
          </Link>
        </div>
        <div>
          <Link to="/admin/work/videos">
            <button>Work</button>
          </Link>
        </div>
        <div>
          <Link to="/admin/admin-resume">
            <button>Resume</button>
          </Link>
        </div>
        <div>
          <Link to="/admin/admin-contact">
            <button>Contact</button>
          </Link>
        </div>
        <div className="logout-button">
          <a href="/api/logout">
            <button>Logout</button>
          </a>
        </div>
      </div>
    );
  }
}

export default AdminMenu;
