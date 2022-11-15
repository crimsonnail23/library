import {gql} from '@apollo/client';

//will check login credentials.
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user{
                _id
                username 
            }
        }
    }
    `
//following code will create a new user.    
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password){
         token
         user{
                _id
                username
            }
        }
    }
`
//following code will save a book to the user's book list.
export const SAVE_BOOK=gql`
    mutation saveBook($bookInput: BookInput){
        # if there are errors try and change $BookInput to $bookInput
        saveBook(bookInput: $BookInput){
            _id
        username
        email
        bookCount
        savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
        }
    }
`
//following code will delete a book from the user's book list.
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId){
        _id
        username
        email
        bookCount
        savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`