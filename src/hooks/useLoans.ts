import { useQuery, ApolloError } from "@apollo/client";
import { GET_ALL_LOANS } from "src/graphql/Queries";

export function useLoans(): [any[], boolean, ApolloError | undefined] {
    const { data, loading, error } = useQuery(GET_ALL_LOANS, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all"
    });
    return [data ? data.getAllLoans : [], loading, error];
}
