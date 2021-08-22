import { useQuery, ApolloError } from "@apollo/client";
import { GET_ALL_BOOKS } from "src/graphql/Queries";

export function useBooks(): [any[], boolean, ApolloError | undefined] {
    const { data, loading, error } = useQuery(GET_ALL_BOOKS, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all"
    });

    return [data ? data.getAllBooks : [], loading, error];
}
