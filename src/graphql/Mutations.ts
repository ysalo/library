import { gql } from "@apollo/client";

export const CREATE_MEMBER = gql`
    mutation(
        $First_Name: String!
        $Last_Name: String!
        $Middle_Name: String
        $Email: String
        $Phone_Number: String
    ) {
        createMember(
            First_Name: $First_Name
            Last_Name: $Last_Name
            Middle_Name: $Middle_Name
            Email: $Email
            Phone_Number: $Phone_Number
        ) {
            Email
            Phone_Number
        }
    }
`;
