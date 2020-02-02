import React ,{ Component }from 'react';
import { Provider } from 'react-redux'
import App from './App';
import AsyncApp from './AsyncApp';
import ConfigureStore from '../store/configure-store';

const store = ConfigureStore;

class Root extends Component {
    render() {
        return(
            <Provider store={store}>
                {/* <App/> */}
                <AsyncApp/>
            </Provider>
        );
    }
};

export default Root;