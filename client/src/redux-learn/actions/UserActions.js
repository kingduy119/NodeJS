export function setName(username) {
    return {
        type: "SET_NAME",
        payload: username
    };
}

export function setAge(age) {
    return {
        type: "SET_AGE",
        payload: age
    };
}