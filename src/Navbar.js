import { Link } from "react-router-dom";

const Navbar = (props) => {
    return ( 
        <nav className="navbar">
            <h1> <Link to="/">IBRAHIM BADAMASI BABANGIDA UNIVERSITY</Link> </h1>
            <div className="links">
                <Link to="/">HOME</Link>
                <Link to="/Signup">SIGN-UP</Link>
                

            </div>
        </nav>
    );
}

 export default Navbar;