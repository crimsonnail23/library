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
        bookId: ID
        authors:[String]
        description: String
        title:String
        image: 
    }
`

//export typeDefs.