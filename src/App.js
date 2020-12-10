import { useState, React } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import RecipesList from './components/RecipesList/RecipesList';
import LoginPage from './components/LoginPage/LoginPage';
import { Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage/SignUpPage';
import RecipePage from './components/RecipePage/RecipePage';
import WhiskeyTapContext from './context/WhiskeyTapContext';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleLogin = (userName, id) => {
    const user = { id, userName}
    setIsLoggedIn(true);
    setCurrentUser(user);
  }

  const contextValue = {
    isLoggedIn,
    currentUser,
    loginFunc: handleLogin
  }

  return (
    <section className='App'>
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
        </WhiskeyTapContext.Provider>
    </section>
  );
}

export default App;
