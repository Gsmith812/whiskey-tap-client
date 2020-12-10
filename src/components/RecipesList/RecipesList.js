import React, { useContext } from 'react';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import STORE from '../../dummy-store';
import RecipeItem from '../RecipeItem/RecipeItem';
import './RecipesList.css';

function RecipesList(props) {
    const { currentUser, isLoggedIn } = useContext(WhiskeyTapContext);

    console.log(currentUser, isLoggedIn)

    return (
        <section className='RecipesList'>
            <section className='recipes-container'>
                <h2>Welcome, {isLoggedIn ? currentUser.userName : `Guest`}!</h2>
                <h2>List of Whiskey Cocktails:</h2>
                <section className='recipes'>
                    {!STORE 
                    ? (
                            <div className='not-found'><h2>No matching recipes found.</h2></div>
                        )
                    : (
                        STORE.recipes.map((recipe, i) => {
                           return <RecipeItem recipe={recipe} key={i} />
                        })
                    )
                }
                </section>
            </section>
        </section>
    )
}

export default RecipesList;