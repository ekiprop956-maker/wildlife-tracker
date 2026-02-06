import { Link } from 'react-router-dom';

function Navbar (){
    return(
        <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
      <Link to="/register">Register</Link>
    </nav>
    )
}
export default Navbar;