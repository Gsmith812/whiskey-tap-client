import React from 'react';

const WhiskeyTapContext = React.createContext({
    isLoggedIn: null,
    currentUser: null,
    loginFunc: () => {},
})

export default WhiskeyTapContext;