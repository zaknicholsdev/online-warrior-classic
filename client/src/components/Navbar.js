import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                        <Link to="athletes">Athletes</Link>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
                <div className="navNarrow" onClick={handleToggle}>
                    <i className="fa fa-bars fa-2x"></i>
                    <div ref={narrowLinks} className="narrowLinks hidden">
                        <Link to="/">Home</Link>
                        <Link to="/athletes">Athletes</Link>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </nav>
        </section>
    )
};

export default Navbar;