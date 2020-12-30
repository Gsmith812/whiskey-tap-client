import React, { useContext, useEffect, useState } from 'react';
import './RecipePage.css';
import cocktailImg from '../../assets/whisky.png';
import Comments from '../Comments/Comments';
import axios from 'axios';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../../config';

function RecipePage(props) {

    const { isLoggedIn, currentUser } = useContext(WhiskeyTapContext);
    
    const [recipe, setRecipe] = useState({});
    const [error, setError] = useState(null);

    const { recipe_id } = props.match.params;

    useEffect(() => {
        async function fetchRecipe() {
            const recipe = await axios.get(API_BASE_URL + `/recipes/${recipe_id}`)
            setRecipe(recipe.data);
        }
        fetchRecipe();

    }, [recipe_id]);

    const { ingredients, cocktail_steps } = recipe;

    const handleEditRecipe = recipe => {
        props.history.push(`/edit-recipe/${recipe.id}`)
    }

    const handleDeleteRecipe = recipe => {
        setError(null)
        if(!isLoggedIn) {
            setError({message: `Must be logged in to delete recipes`});
        }
        if(currentUser.id !== recipe.created_by) {
            setError({message: `Only the author of this article can delete it`})
        }
        else {
            async function deleteRecipe() {
                const request = await axios.delete(API_BASE_URL + `/recipes/${recipe_id}`)
                if(request.status !== 204) {
                    setError({message: request.statusText})
                }
                else {
                    setError(null);
                    props.history.push('/recipes');
                }
            }
            deleteRecipe();
        }
    }



    if(recipe === null) {
        return (
            <div className='notExist'>
                <h2>Recipe Doesn't Exist.</h2>
                <button className='back-button' onClick={() => props.history.goBack()}>Back</button>
            </div>
        )
    }
    return (
        <section className='RecipePage'>
            <section className='recipe-details'>
                <button className='back-button' onClick={() => props.history.goBack()}>Back</button>
                {
                    (isLoggedIn && currentUser.id === recipe.created_by)
                        && (
                            <div className='edit-recipe-container'>
                                <FontAwesomeIcon icon={faPencilAlt} className='edit-recipe-icon' onClick={() => handleEditRecipe(recipe)} />
                                <FontAwesomeIcon icon={faMinus} className='delete-recipe-icon' onClick={() => handleDeleteRecipe(recipe)} />
                            </div>
                        )
                }
                {error && <div className='recipe-page-error'>{error.message}</div>}
                <img src={cocktailImg} alt='Rocks glass for whiskey'/>
                <h1>{recipe.cocktail_name}</h1>
                <h2>Created by: {recipe.user}</h2>
                <h3>Cocktail-Type: {recipe.cocktail_type}</h3>
                {
                    recipe.description !== null && 
                    (
                        <div className='description'>
                            <h4>Description:</h4>
                            <p>{recipe.description}</p>
                        </div>

                    )
                }
                <h4>Ingredients</h4>
                <ul>
                    {
                        ingredients
                            ? ingredients.map((ingredient, i) => {
                                return <li key={i}>{ingredient.ingredient_string}</li>
                            })
                            : <div className='notExist'>No Ingredients Found</div>
                    }
                </ul>
                <h4>Cocktail Steps</h4>
                <ol>
                    {
                        cocktail_steps
                            ? cocktail_steps.map((step, i) => {
                                return <li key={i}>Step {i + 1} - {step.step_content}</li>
                            })
                            : <div className='notExist'>No Steps Found</div>
                    }
                </ol>
                

            </section>
            <Comments recipe_id={parseInt(recipe_id)} />
        </section>
    )
}

export default RecipePage;