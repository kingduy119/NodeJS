import { createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./Reducers";

export default function configureStore(preloadState) {
    return createStore(
        reducers,
        preloadState
    );
};

