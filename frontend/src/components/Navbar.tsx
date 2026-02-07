import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem",
        backgroundColor: "#ddd",
        display: "flex",
        gap: "2rem",
        fontSize: "18px",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Register</Link>
    </nav>
  );
}

export default Navbar;
