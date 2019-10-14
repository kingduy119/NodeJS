const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Booking {
        _id: ID!
        user: User!
        event: Event!
        createAt: String!
        updateAt: String!
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }

    type User {
        _id: ID!
        email: String!
        password: String!
        createdEvents: [Event!]
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        events: [Event!]!
        booking: [Booking!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        bookEvent(eventID: ID!): Booking!
        cancelBooking(eventID: ID!): Event!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);






