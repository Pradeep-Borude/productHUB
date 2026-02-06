import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <span className="logo" onClick={() => navigate("/")}>
        logo
      </span>

      <div className="nav-links">
        <span
          className="icons"
          title="Home"
          onClick={() => navigate("/")}
        >
          🏠
        </span>

        <span
          className="icons"
          title="Profile"
          onClick={() => navigate("/user/profile")}
        >
          🙍‍♂️
        </span>
      </div>
    </div>
  );
}
