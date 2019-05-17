import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <ul className="nav">
            <li><NavLink to="/user">User</NavLink></li>
            <li><NavLink to="/cpanel">Cpanel</NavLink></li>
            <li><Link to="/">Home</Link></li>
        </ul>
    )
}

export default Navbar;