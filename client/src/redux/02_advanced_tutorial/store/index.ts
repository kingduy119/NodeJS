import { combineReducers } from 'redux';
import { systemReducer }  from './system/reducer-system';
import { chatReducer } from './chat/reducer-chat';

const rootReducer = combineReducers({
    system: systemReducer,
    chat: chatReducer
});

export type RootState = ReturnType<typeof rootReducer>;
