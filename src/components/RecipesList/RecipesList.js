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
    const [userFavorites, setUserFavorites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRecipes() {
            const request = await axios.get( API_BASE_URL + '/recipes');
            setRecipes(request.data);
        }
        const fetchUserFavorites = async () => {
            if(isLoggedIn) {
                const request = await axios.get( API_BASE_URL + `/favorites/${currentUser.id}`);
                setUserFavorites(request.data);
            }
        }
        fetchRecipes();
        fetchUserFavorites();
    }, [isLoggedIn, currentUser.id])

    const handleDeleteFavorite = recipeId => {
        async function deleteFavorite() {
            const favToRemove = userFavorites.find(fav => fav.recipe_id === recipeId && fav.user_id === currentUser.id)
            const request = await axios.delete(API_BASE_URL + `/favorites/${currentUser.id}/${favToRemove.id}`)
            if(!request) {
                setError(`Something went wrong`); 
            }
        }
        deleteFavorite();
        setUserFavorites(userFavorites.filter(fav => fav.recipe_id !== recipeId));
    }

    const handleAddFavorite = newFavorite => {
        setUserFavorites([...userFavorites, newFavorite ])
    }

    return (
        <section className='RecipesList'>
            <section className='recipes-container'>
                <h1>Welcome, {isLoggedIn ? currentUser.userName : `Guest`}!</h1>
                {error && (<div className='recipes-error'>{error}</div>)}
                <section className='recipes'>
                    {(recipes.length === 0) 
                    ? (
                            <div className='not-found'><h2>No matching recipes found.</h2></div>
                        )
                    : (
                        recipes.map((recipe, i) => {
                           return (
                                <RecipeItem 
                                    recipe={recipe}
                                    handleDeleteFavorite={handleDeleteFavorite}
                                    handleAddFavorite={handleAddFavorite}
                                    isFavorite={userFavorites.find(favorite => favorite.recipe_id === recipe.id) ? true : false} 
                                    key={i} 
                                />
                            )
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