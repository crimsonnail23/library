//import gql tagged template.
const{gql} = require('apollo-server-express')

//define the typeDefs
const typeDefs=gql`
    # defines the user.
    type User{
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    # defines the book. 
    type Book{
        bookId: ID!
        authors:[String]
        description: String
        title:String
        image: String
        link: String
    }
    # used for authentication.
    type Auth{
        token: ID!
        user: User
    }
    input BookInput {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }
    #defines the different types of queries, though only one is currently there.
    #the one query is for logged in users.
    type Query{
        me: User
        
    }
    #defines the different types of mutations that will be used.
    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        # if there are issues try and change bookInput to book?
        saveBook(bookInput: BookInput): User
        removeBook(bookId: String): User
    }
` 

//export typeDefs.
module.exports = typeDefs