import { useQuery, ApolloError } from "@apollo/client";
import { GET_ALL_MEMBERS } from "src/graphql/Queries";

export function useMembers(): [any[], boolean, ApolloError | undefined] {
    const { data, loading, error } = useQuery(GET_ALL_MEMBERS, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all"
    });
    return [data ? data.getAllMembers : [], loading, error];
}
