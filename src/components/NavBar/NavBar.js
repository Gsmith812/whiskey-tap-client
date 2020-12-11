import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import './NavBar.css';

function NavBar(props) {
    const { isLoggedIn, setIsLoggedIn } = useContext(WhiskeyTapContext);

    const handleLogout = e => {
        e.preventDefault();
        setIsLoggedIn(false);
    }

    return (
        <nav className='NavBar'>
            <div className='logo'>
                <NavLink className='homeButton' to='/'>
                    <h3>Whiskey Tap</h3>
                </NavLink>
            </div>
            <div className='navLinks'>
                {
                    (isLoggedIn === false)
                        ? (
                            <NavLink className='navButtons' to='/login'>
                                Login
                            </NavLink>
                        ) 
                        : (
                            <button className='logoutButton' onClick={handleLogout}>Logout</button>
                        )
                }
                
            </div>
        </nav>
    )
}

export default NavBar;