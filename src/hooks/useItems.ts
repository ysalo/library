import { useQuery, ApolloError } from "@apollo/client";
import { GET_ALL_ITEMS } from "src/graphql/Queries";

export function useItems(): [any[], boolean, ApolloError | undefined] {
    const { data, loading, error } = useQuery(GET_ALL_ITEMS, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all"
    });
    return [data ? data.getAllItems : [], loading, error];
}
