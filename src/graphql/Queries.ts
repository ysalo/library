import { gql } from "@apollo/client";

export const GET_ALL_MEMBERS = gql`
    query {
        getAllMembers {
            Member_Id
            Last_Name
            Middle_Name
            First_Name
            Email
            Phone_Number
        }
    }
`;

export const GET_ALL_BOOKS = gql`
    query {
        getAllBooks {
            Book_Id
            Genre_Id
            Title
            ISBN
            Language
            Publication_Year
            Series_Id
            In_Series_Number
            BookAuthoredBy {
                Author {
                    First_Name
                    Last_Name
                }
            }
        }
    }
`;

export const GET_ALL_LOANS = gql`
    query {
        getAllLoans {
            Loan_Id
            Barcode
            Checkout
            Due
            Returned
            Member {
                First_Name
                Last_Name
                Middle_Name
            }
            Item {
                BookToBarcode {
                    Book {
                        Title
                    }
                }
            }
        }
    }
`;

export const GET_ALL_ITEMS = gql`
    query {
        getAllItems {
            Barcode
            Type_Id
            Status
        }
    }
`;

// export const GET_MEMBER_BY_EMAIL = gql`
//     query {
//         getMemberByEmail {
//             Member_Id
//             Last_Name
//             Middle_Name
//             First_Name
//             Email
//             Phone_Number
//         }
//     }
// `;
