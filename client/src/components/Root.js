import React ,{ Component }from 'react';
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
                <App/>
            </Provider>
        );
    }
};

export default Root;