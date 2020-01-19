import React from 'react';
import { render } from 'react-dom'
import Root from './containers/Root';

const renderApp = () => {
    render(<Root/>, document.getElementById('root'));
}

// // !--- Hot reloading
// if(process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./components/App', renderApp)
// } // end ---!

renderApp();
