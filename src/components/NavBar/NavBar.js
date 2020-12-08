import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar(props) {
    return (
        <nav className='NavBar'>
            <div className='logo'>
                <NavLink className='homeButton' to='/'>
                    <h3>Whiskey Tap</h3>
                </NavLink>
            </div>
            <div className='navLinks'>
                <NavLink className='navButtons' to='/login'>
                    Login
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBar;