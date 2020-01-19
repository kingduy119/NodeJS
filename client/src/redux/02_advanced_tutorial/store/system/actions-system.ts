// src/system/actions-system.ts

import {
    SystemState, UPDATE_SESSION, SystemActionTypes
} from './types-system';

export function updateSession(newSession: SystemState): SystemActionTypes {
    return {
        type: UPDATE_SESSION,
        payload: newSession
    };
}


