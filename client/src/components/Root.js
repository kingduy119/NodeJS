import React ,{ Component }from 'react';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';
import { Provider } from 'react-redux'

import App from './App';
import AsyncApp from './AsyncApp';
import ConfigureStore from '../store/configure-store';
// import ConfigureStore from '../store/configure-async-store';

const store = ConfigureStore();

class Root extends Component {
    render() {
        return(
            <Provider store={store}>
                <Router>
                    <Route path="/" component={App} />
                </Router>
            </Provider>
        );
    }
};

export default Root;