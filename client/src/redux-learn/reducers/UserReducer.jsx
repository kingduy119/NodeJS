

function UserReducer(state = [], action){
    switch(action.type) {
        case "SET_NAME":
            state = {
                username: action.payload
            };
            break;
    }
    return state;
};

export default UserReducer;
