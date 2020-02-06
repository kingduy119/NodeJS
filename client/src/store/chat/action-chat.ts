import {
    SEND_MESS,
    DELETE_MESS,
    Message,
    ChatActionTypes
} from './types-chat';

export function sendMessage(newMessage: Message) :
ChatActionTypes {
    return {
        type: SEND_MESS,
        payload: newMessage
    }
}

export function deleteMessage(timestamp: number) :
ChatActionTypes {
    return {
        type: DELETE_MESS,
        meta: { timestamp }
    }
}






