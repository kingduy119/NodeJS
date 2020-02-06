
import { combineReducers } from 'redux';
import { chatReducer } from './chat/reducer-chat';

const rootReducer = combineReducers({
    chat: chatReducer
});

export type RootState = ReturnType<typeof rootReducer>;
