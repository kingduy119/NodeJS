const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Booking {
        _id: ID!
        event: Event!
        user: User!
        createAt: String!
        updateAt: String!
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        creator: User!
    }

    type User {
        _id: ID!
        email: String!
        password: String!
        createEvent: [Event!]
    }

    type AuthData {
        userID: ID!
        token: String!
        tokenExpiration: Int!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        events: [Event!]!
        bookings: [Booking!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        createBooking(eventID: ID!): Booking!
        cancelBooking(bookingID: ID!): Event!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
