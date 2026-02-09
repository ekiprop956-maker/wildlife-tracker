import { Link } from 'react-router-dom';

function Navbar (){
    return(
        <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
     
      <Link to="/addobservation" style={{ marginLeft: '1rem' }}>Add Observation</Link>
      <Link to="/contactus" style={{ marginLeft: '1rem' }}>Contact us</Link>
      <Link to="/aboutus" style={{ marginLeft: '1rem' }}>About us</Link>
    </nav>
    )
}
export default Navbar;