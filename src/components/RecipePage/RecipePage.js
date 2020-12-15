import React, { useEffect, useState } from 'react';
import './RecipePage.css';
import cocktailImg from '../../assets/whisky.png';
import Comments from '../Comments/Comments';
import axios from 'axios';

function RecipePage(props) {
    
    const [recipe, setRecipe] = useState({});

    const { recipe_id } = props.match.params;

    useEffect(() => {
        async function fetchRecipe() {
            const recipe = await axios.get(`http://localhost:8000/api/recipes/${recipe_id}`)
            setRecipe(recipe.data);
        }
        fetchRecipe();

    }, [recipe_id]);

    const { ingredients, cocktail_steps } = recipe;

    if(recipe.length === 0) {
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
                <img src={cocktailImg} alt='Rocks glass for whiskey'/>
                <h2>{recipe.cocktail_name}</h2>
                <h3>Created by: {recipe.user}</h3>
                <h4>Cocktail-Type: {recipe.cocktail_type}</h4>
                {
                    recipe.description !== null && 
                    (
                        <div className='description'>
                            <h4>Description:</h4>
                            <p>{recipe.description}</p>
                        </div>

                    )
                }
                <ul>
                    {
                        ingredients
                            ? ingredients.map((ingredient, i) => {
                                return <li key={i}>{ingredient.ingredient_string}</li>
                            })
                            : <div className='notExist'>No Ingredients Found</div>
                    }
                </ul>
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