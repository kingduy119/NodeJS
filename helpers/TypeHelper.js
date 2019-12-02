
// AuthenticationModle to AuthenticationType
exports.toAuthType = type => {
    return {
        id:type.id,
        username:type.username,
        password:type.password,
        email:type.email
    }
}

// EventMole to EventType
exports.toEventType = type => {
    return {
        id: type.id,
        title: type.title,
        description: type.description
    }
};



