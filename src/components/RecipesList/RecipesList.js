import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import RecipeItem from '../RecipeItem/RecipeItem';
import './RecipesList.css';
import axios from 'axios';

const { API_BASE_URL } = require('../../config');

function RecipesList(props) {
    const { currentUser, isLoggedIn } = useContext(WhiskeyTapContext);

    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        async function fetchRecipes() {
            const request = await axios.get( API_BASE_URL + '/recipes');
            setRecipes(request.data);
        }
        fetchRecipes();

    }, [])

    return (
        <section className='RecipesList'>
            <section className='recipes-container'>
                <h2>Welcome, {isLoggedIn ? currentUser.userName : `Guest`}!</h2>
                <h2>List of Whiskey Cocktails:</h2>
                <section className='recipes'>
                    {(recipes.length === 0) 
                    ? (
                            <div className='not-found'><h2>No matching recipes found.</h2></div>
                        )
                    : (
                        recipes.map((recipe, i) => {
                           return <RecipeItem recipe={recipe} key={i} />
                        })
                    )
                }
                </section>
                {isLoggedIn 
                    && (
                        <Link to='/add-recipe'>
                            <button className='add-recipe'>Add Recipe</button>
                        </Link>  
                    )
                }
                
            </section>
        </section>
    )
}

export default RecipesList;