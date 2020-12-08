import React from 'react';
import './RecipeItem.css';
import whiskyIcon from '../../assets/whisky.png';

function RecipeItem(props) {
    const { cocktail_name, user } = props.recipe;
    return (
        <section className='RecipeItem'>
            <img src={whiskyIcon} alt='Whiskey glass thumbnail' />
            <h3>{cocktail_name}</h3>
            <p>Created by: {user}</p>
        </section>
    )
}

export default RecipeItem;