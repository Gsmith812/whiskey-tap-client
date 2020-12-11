import React from 'react';

const WhiskeyTapContext = React.createContext({
    isLoggedIn: null,
    setIsLoggedIn: () => {},
    currentUser: null,
    loginFunc: () => {},
})

export default WhiskeyTapContext;