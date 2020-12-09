import React from 'react';
import './RecipePage.css';
import STORE from '../../dummy-store';
import cocktailImg from '../../assets/whisky.png';
import Comments from '../Comments/Comments';

function RecipePage(props) {
    const matchedRecipe = STORE.recipes.find(recipe => recipe.id === parseInt(props.match.params.recipe_id));
    const ingredientsList = STORE.ingredients.filter(ingredient => ingredient.recipe_id === matchedRecipe.id);
    const cocktailSteps = STORE.cocktail_steps.filter(step => step.recipe_id === matchedRecipe.id);
    if(!matchedRecipe) {
        return (
            <div className='notExist'>
                <h2>Recipe Doesn't Exist.</h2>
            </div>
        )
    }

    return (
        <section className='RecipePage'>
            <section className='recipe-details'>
                <img src={cocktailImg} alt='Rocks glass for whiskey' />
                <h2>{matchedRecipe.cocktail_name}</h2>
                <h3>Created by: {matchedRecipe.user}</h3>
                <h4>Cocktail-Type: {matchedRecipe.cocktail_type}</h4>
                {
                    matchedRecipe.description !== null && 
                    (
                        <div className='description'>
                            <h4>Description:</h4>
                            <p>{matchedRecipe.description}</p>
                        </div>

                    )
                }
                <ul>
                    {ingredientsList.map((ingredient, i) => {
                        return (
                            <li key={i}>- {ingredient.ingredient_string}</li>
                        )
                    })}
                </ul>
                <ol>
                    {cocktailSteps.map((step, i) => {
                        return <li key={i}>Step {i + 1} - {step.step_content}</li>
                    })}
                </ol>
                

            </section>
            <Comments recipe_id={matchedRecipe.id} />
        </section>
    )
}

export default RecipePage;