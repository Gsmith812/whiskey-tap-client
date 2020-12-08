import React from 'react';
import './RecipeItem.css';
import whiskyIcon from '../../assets/whisky.png';
import { Link } from 'react-router-dom';

function RecipeItem(props) {
    const { cocktail_name, user, id } = props.recipe;
    return (
        <Link to={`/recipes/${id}`} className='linked-recipe'>
            <section className='RecipeItem'>
                <img src={whiskyIcon} alt='Whiskey glass thumbnail' />
                <h3>{cocktail_name}</h3>
                <p>Created by: {user}</p>
            </section>
        </Link>   
    )
}

export default RecipeItem;