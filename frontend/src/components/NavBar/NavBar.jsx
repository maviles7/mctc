import { Link } from "react-router-dom";
import * as authService from "../../services/authService";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    authService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      <Link to="/">mctc</Link>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <Link to="/posts"> mi closet</Link>
          &nbsp; | &nbsp;
          <Link to="/posts/new">post</Link>
          &nbsp; | &nbsp;
          <Link to="/amigos"> find amigos</Link>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>
            log out
          </Link>
          &nbsp; | &nbsp;
          <span>hola, {user.username}</span>
        </>
      ) : (
        <>
          <Link to="/login">log in</Link>
          &nbsp; | &nbsp;
          <Link to="/signup">sign up</Link>
        </>
      )}
    </nav>
  );
}
