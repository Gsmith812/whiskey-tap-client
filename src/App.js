import { useState, React } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import RecipesList from './components/RecipesList/RecipesList';
import LoginPage from './components/LoginPage/LoginPage';
import { Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage/SignUpPage';
import RecipePage from './components/RecipePage/RecipePage';
import WhiskeyTapContext from './context/WhiskeyTapContext';
import AddRecipe from './components/AddRecipe/AddRecipe';
import EditRecipe from './components/EditRecipe/EditRecipe';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleLogin = (userName, id) => {
    const user = { id, userName}
    setCurrentUser(user);
    setIsLoggedIn(true);
  }

  const contextValue = {
    isLoggedIn,
    currentUser,
    loginFunc: handleLogin,
    setIsLoggedIn
  }

  return (
    <main className='App'>
        <WhiskeyTapContext.Provider value={contextValue}>
          <NavBar />
          <Route
            exact path='/'
            component={LandingPage}
          />
          <Route
            exact path='/recipes'
            component={RecipesList}
          />
          <Route
            path='/login'
            component={LoginPage}
          />
          <Route
            path='/sign-up'
            component={SignUpPage}
          />
          <Route
            path='/recipes/:recipe_id'
            component={RecipePage}
          />
          <Route
            path='/add-recipe'
            component={AddRecipe}
          />
          <Route
            path='/edit-recipe/:recipe_id'
            component={EditRecipe}
          />
        </WhiskeyTapContext.Provider>
    </main>
  );
}

export default App;
