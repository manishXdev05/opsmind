import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {

  return (

    <div className="navbar">

      <button
        className="menu-btn"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      <div className="navbar-title">
        OPSMIND AI
      </div>

    </div>
  );
};

export default Navbar;