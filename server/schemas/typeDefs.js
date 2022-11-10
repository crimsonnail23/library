//import gql tagged template.
const{gql} = require('apollo-server-express')

//define the typeDefs
const typeDefs=gql`
    type User{
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book{
        bookId: ID #i don't know if this is right.
        authors:[String]
        description: String
        title:String
        image: url #i don't know if is right.
        link: url
    }
    type Auth{
        token: ID!
        user: User
    }
`

//export typeDefs.