import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
    const username = sessionStorage.getItem("username");
    const navigate = useNavigate(); // Initialize navigate function

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Home</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/vinyls">Vinyls</Link></li>
                <li><Link to="/antiqueFurniture">Antique Furniture</Link></li>
                <li><Link to="/gpsSportWatches">GPS Sport Watches</Link></li>
                <li><Link to="/runningShoes">Running Shoes</Link></li>
                <li className="navbar-user">
                    {username ? (
                        <div className="navbar-username">
                            <Link to={`/user/${username}`} className="username-text">
                                {username}
                            </Link>
                            <button
                                className="logout-button"
                                onClick={() => {
                                    sessionStorage.removeItem("username");
                                    sessionStorage.removeItem("isAdmin");
                                    navigate("/");
                                    window.location.reload();
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <FaUserCircle size={30} color="white" />
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
