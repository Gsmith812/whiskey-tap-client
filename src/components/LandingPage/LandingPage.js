import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage(props) {
    return (
        <section className='LandingPage'>
            <section className='landing-page-hero'>
                <div className='hero-content'>
                    <h1>
                        Welcome to Whiskey Tap
                    </h1>
                </div>
            </section>
            <section className='instructions'>
                <Link className='card-links' to='/recipes'>
                    <div className='instruction-card'>
                        <h2>Search Recipes</h2>
                        <p>Search numerous of user created recipes throughout our database and try your hand at crafting some of these exquisite cockatils.</p>
                    </div>
                </Link>
                <Link className='card-links' to='/sign-up'>
                    <div className='instruction-card'>
                        <h2>Create an Account</h2>
                        <p>Create your account and stir up some of your own personal creative cocktails, comment on other whiskey enthusiasts recipes, and keep tabs on your favorites cocktails.</p>
                    </div>
                </Link>
            </section>
        </section>
    )
}

export default LandingPage;