import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import './LandingPage.css';

function LandingPage(props) {

    const { isLoggedIn } = useContext(WhiskeyTapContext);

    return (
        <section className='LandingPage'>
            <section className='landing-page-hero'>
                <div className='hero-content'>
                    <h1>
                        <span className='hero-heading-1'>Search</span><br /><span className='hero-heading-2'>Sip</span><br /><span className='hero-heading-3'>Enjoy!</span>
                    </h1>
                    <section className='instructions'>                
                        <div className='instruction-card' id='card-1'>
                            <Link className='card-links' to='/recipes'>
                                <h2>Search Recipes</h2>
                            </Link>
                        </div>
                    {
                        !isLoggedIn && (
                            <div className='instruction-card' id='card-2'>
                                <Link className='card-links' to='/sign-up'>
                                    <h2>Create an Account</h2>
                                </Link>
                            </div>
                    )
                    
                    }
                    </section>
                </div>
            </section>
        </section>
    )
}

export default LandingPage;