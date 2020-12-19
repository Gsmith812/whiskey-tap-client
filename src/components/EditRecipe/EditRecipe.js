import React, { useContext, useEffect, useState } from 'react';
import './EditRecipe.css';
import STORE from '../../dummy-store';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import axios from 'axios';
import { API_BASE_URL } from '../../config';


function EditRecipe(props) {

    const { isLoggedIn, currentUser } = useContext(WhiskeyTapContext) 
    const [cocktail_name, setCocktailName] = useState('');
    const [cocktail_type, setCocktailType] = useState('Martini');
    const [whiskey_type, setWhiskeyType] = useState('Irish Whiskey');
    const [description, setDescription] = useState(null);
    const [ingredients, setIngredients] = useState([{ingredient_string: ''}]);
    const [cocktail_steps, setCocktailSteps] = useState([{step_number: 1, step_content: ''}]);
    const [error, setError] = useState(null);
    const [initialIngredientIds, setInitialIngredientIds] = useState();
    const [initialCocktailStepIds, setInitialCocktailStepIds] = useState();
    const { recipe_id } = props.match.params;

    useEffect(() => {
        async function fetchRecipe() {
            const request = await axios.get(API_BASE_URL + `/recipes/${recipe_id}`);
            const { cocktail_name, cocktail_type, whiskey_type, description, ingredients, cocktail_steps } = request.data;
            setCocktailName(cocktail_name);
            setCocktailType(cocktail_type);
            setWhiskeyType(whiskey_type);
            setDescription(description);
            setIngredients(ingredients);
            setCocktailSteps(cocktail_steps);
            setInitialIngredientIds(ingredients.map(ingredient => ingredient.id))
            setInitialCocktailStepIds(cocktail_steps.map(step => step.id))
        }
        fetchRecipe();
    }, [recipe_id]);

    const handleSubmit = e => {
        setError(null);
        e.preventDefault();
        const updatedRecipe = { cocktail_name, whiskey_type, cocktail_type, ingredients, cocktail_steps, created_by: currentUser.id };
        updatedRecipe.description = description;
        const ingredientIdsToRemove = initialIngredientIds.filter(id => !ingredients.find(ingredient => ingredient.id === id));
        const cocktailStepIdsToRemove = initialCocktailStepIds.filter(id => !cocktail_steps.find(step => step.id === id));
        if(ingredientIdsToRemove.length > 0) {
            updatedRecipe.ingredientIdsToRemove = ingredientIdsToRemove
        }
        if(cocktailStepIdsToRemove.length > 0) {
            updatedRecipe.cocktailStepIdsToRemove = cocktailStepIdsToRemove
        }
        //run conditional statement to see if any existing ingredient fields were removed
        async function updateRecipe() {
            const request = await axios.patch(API_BASE_URL + `/recipes/${recipe_id}`, updatedRecipe)
            if(request.status !== 204) {
                setError({message: `Something went wrong`})
            }
            else{
                props.history.goBack();
            }
        }
        updateRecipe();
    }

    const handleAddIngredient = e => {
        e.preventDefault();
        setIngredients([...ingredients, { ingredient_string: '', recipe_id: parseInt(recipe_id) }])
    }

    const handleDeleteIngredient = (e, i) => {
        e.preventDefault();
        setIngredients(ingredients.filter((_, index) => index !== i));
    }

    const handleAddStep = e => {
        e.preventDefault();
        setCocktailSteps([...cocktail_steps, { step_content: '', recipe_id: parseInt(recipe_id)}])
    }
    
    const handleDeleteStep = (e, i) => {
        e.preventDefault();
        setCocktailSteps(cocktail_steps.filter((_, index) => index !== i));
    }

    const handleCancel = e => {
        e.preventDefault();
        props.history.goBack();
    }

    const handleInputChange = e => {
        //Setting all input changes besides ingredients and cocktail steps in state with one function
        e.target.name === 'cocktailName' && setCocktailName(e.target.value)
        e.target.name === 'whiskeyType' && setWhiskeyType(e.target.value)
        e.target.name === 'cocktailType' && setCocktailType(e.target.value)
        e.target.name === 'description' && setDescription(e.target.value)
    }

    const handleIngredientChanged = (e, index) => {
       ingredients[index] = {...ingredients[index] ,ingredient_string: e.target.value }
       setIngredients([...ingredients])
    }

    const handleStepChanged = (e, index) => {
        cocktail_steps[index] = {...cocktail_steps[index], step_content: e.target.value}
        setCocktailSteps([...cocktail_steps])
    }

    if(!isLoggedIn) {
        props.history.push('/login')
    }

    return (
        <section className='AddRecipe'>
            <section className='recipe-form'>
                <h2>Edit Recipe Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input-fields'>
                        <label htmlFor='cocktail-name'>Cocktail Name</label>
                        <input type='text' id='cocktail-name' name='cocktailName' defaultValue={cocktail_name} onChange={handleInputChange} required />
                        <label htmlFor='whiskey-type'>Type of Whiskey</label>
                        <select id='whiskey-type' name='whiskeyType' defaultValue={whiskey_type} onChange={handleInputChange}>{STORE.whiskey_types.map((type, i) => {
                            return <option value={type} key={i} selected={(type === whiskey_type) ? true : false}>{type}</option>
                        })}</select>
                        <label htmlFor='cocktail-type'>Type of Cocktail Glass</label>
                        <select id='cocktail-type' name='cocktailType' defaultValue={cocktail_type} onChange={handleInputChange}>{STORE.cocktail_types.map((type, i) => {
                            return <option value={type} key={i} selected={(type === cocktail_type) ? true : false}>{type}</option>
                        })}</select>
                        <label htmlFor='description'>Description</label>
                        <textarea id='description' name='description' onChange={handleInputChange} />
                        <h4>Ingredients</h4>
                        {ingredients.map((ingredient, i) => {
                            return (
                                <div className='ingredients' key={i}>
                                    <input type='text' name={'ingredient-' + (i + 1)} value={ingredient.ingredient_string} onChange={(e) => handleIngredientChanged(e, i)} required />
                                    <button className='item-buttons' onClick={handleAddIngredient}>+</button>
                                    {(ingredients.length > 1) && <button className='item-buttons' onClick={(e) => handleDeleteIngredient(e, i)}>-</button>}
                                </div>
                            )
                        })}
                        <h4>Cocktail Steps</h4>
                        {cocktail_steps.map((step, i) => {
                            cocktail_steps[i].step_number = i +1;
                            return (
                                <div className='cocktail-steps' key={i}>
                                    <label htmlFor={'step-' + (i + 1)}>Step {i + 1}: </label><br/>
                                    <input type='text' id={'step-' + (i + 1)} name='step_content' value={step.step_content} onChange={(e) => handleStepChanged(e, i)} required/>
                                    <button className='item-buttons' onClick={handleAddStep}>+</button>
                                    {(cocktail_steps.length > 1) && <button className='item-buttons' onClick={(e) => handleDeleteStep(e, i)}>-</button>}
                                </div>
                            )
                        })}
                    </div>
                    {error !== null && <div className='add-recipe-error'>{error.message}</div>}
                    <div className='form-buttons'>
                        <button type='submit'>Edit Recipe</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </section>
        </section>
    )
}

export default EditRecipe;