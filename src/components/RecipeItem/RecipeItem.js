import React, { useContext } from 'react';
import './RecipeItem.css';
import whiskyIcon from '../../assets/whisky.png';
import { Link } from 'react-router-dom';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

function RecipeItem(props) {
    const { isLoggedIn, currentUser } = useContext(WhiskeyTapContext);

    const { cocktail_name, user, id } = props.recipe;

    const handleFavoriteClicked = () => {
        if(props.isFavorite === true) {
            props.handleDeleteFavorite(id);
        } else {
            async function addFavorite() {
                const newFavorite = { recipe_id: id, user_id: currentUser.id }
                const request = await axios.post(API_BASE_URL + `/favorites/${currentUser.id}`, newFavorite)
                props.handleAddFavorite(request.data);
            }
            addFavorite();
        }
    }

    return (
        <section className='RecipeItem'>
            {isLoggedIn && (
                props.isFavorite === true
                    ? <FontAwesomeIcon icon={faHeart} onClick={handleFavoriteClicked} className='favorite-icon' size='lg'/>
                    : <FontAwesomeIcon icon={faHeartRegular} onClick={handleFavoriteClicked} className='favorite-icon' size='lg' />
            )}<br />
            <Link to={`/recipes/${id}`} className='linked-recipe'>
                <img src={whiskyIcon} alt='Whiskey glass thumbnail' />
                <h3>{cocktail_name}</h3>
                <p>Created by: {user}</p>
            </Link>
        </section>
   
    )
}

export default RecipeItem;