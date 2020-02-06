import {
    ChatState,
    ChatActionTypes,
    SEND_MESS,
    DELETE_MESS
} from './types-chat';

const initialState: ChatState = {
    messages: []
};

export function chatReducer(
    state = initialState,
    action: ChatActionTypes
): ChatState {
    switch(action.type) {
        case SEND_MESS:
            return {
                messages: [...state.messages, action.payload]
            };
        case DELETE_MESS:
            return {
                messages: state.messages.filter(
                    message => message.timestamp !== action.meta.timestamp
                )
            };
        default:
            return state;
    }
}




