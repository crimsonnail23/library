import { gql } from '@apollo/client';


//following code will make query for a user that's logged in.
export const GET_ME= gql`
    {
        me{
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