import React from 'react';
import './RecipePage.css';
import STORE from '../../dummy-store';

function RecipePage(props) {
    const matchedRecipe = STORE.find(recipe => recipe.id === parseInt(props.match.params.recipe_id));
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
                
            </section>
        </section>
    )
}

export default RecipePage;