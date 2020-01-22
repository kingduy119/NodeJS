import {
    Message, SEND_MESSAGE, DELETE_MESSAGE, ChatActionTypes
} from './types-chat'

// TypeScript infers that this function is returing
// SendMessageAction
export function sendMessage(newMessage: Message): ChatActionTypes {
    return {
        type: SEND_MESSAGE,
        payload: newMessage
    }
}

// DeleteMessageAction
export function deleteMesaage(timestamp: number): ChatActionTypes {
    return{
        type: DELETE_MESSAGE,
        meta: {
            timestamp
        }
    };
}



