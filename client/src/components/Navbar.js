import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const narrowLinks = useRef(null);

    const handleToggle = () => {
        narrowLinks.current.classList.toggle("hidden");
    };

    return (
        <section className="topnav" id="myTopnav">
            <nav>
                <div className="navWide">
                    <div className="wideDiv">
                        <Link to="/">Home</Link>
                        {isLoggedIn && <Link to="/athletes">Athletes</Link>}
                        {!isLoggedIn && <Link to="/login">Login</Link>}
                        {!isLoggedIn && <Link to="/register">Register</Link>}
                        {isLoggedIn  && <Logout setIsLoggedIn={setIsLoggedIn} />}
                    </div>
                </div>
                <div className="navNarrow" onClick={handleToggle}>
                    <i className="fa fa-bars fa-2x"></i>
                    <div ref={narrowLinks} className="narrowLinks hidden">
                        <Link to="/">Home</Link>
                        <Link to="/athletes">Athletes</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Logout setIsLoggedIn={setIsLoggedIn} />
                    </div>
                </div>
            </nav>
        </section>
    )
};

export default Navbar;