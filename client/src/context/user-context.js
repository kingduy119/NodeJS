import React from 'react';

export default React.createContext({
    token: null,
    userID: null,
    login: (userID, token, tokenExpiration) => {},
    logout: () => {}
});