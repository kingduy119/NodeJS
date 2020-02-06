
export const SEND_MESS = 'SEND_MESS';
export const DELETE_MESS = 'DELETE_MESS';

export interface Message {
    user: string
    message: string
    timestamp: number
}

export interface ChatState {
    messages: Message[]
}

interface SendMessageAction {
    type: typeof SEND_MESS
    payload: Message
}
  
interface DeleteMessageAction {
    type: typeof DELETE_MESS,
    meta: { timestamp: number }
}

export type ChatActionTypes =
    SendMessageAction | DeleteMessageAction;

