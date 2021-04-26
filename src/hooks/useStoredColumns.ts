// don't autosize last column
import { useMemo } from "react";
import { debounce } from "lodash";

import { ColumnState } from "@ag-grid-community/core/dist/cjs/columnController/columnController";

import { useStoredState } from "./useStoredState";

type Args = {
    tableName: string;
    defaultColumnState: ColumnState[];
};

export function useStoredColumns({ tableName, defaultColumnState }: Args): [(event: any) => void] {
    const [columnState, setColumnState] = useStoredState<Array<ColumnState>>(
        `${tableName}-ag-column-state`,
        defaultColumnState
    );
    const onColumnChanged = useMemo(
        () =>
            debounce((e: any) => {
                setColumnState(e.columnApi.getColumnState(), true);
            }, 500),
        [setColumnState]
    );
    return [onColumnChanged];
    // const [sortState, setSortState] = useStoredState<SortModel>(`${tableName}-ag-column-sort`, defaultSortModel);

    // useEffect(() => {
    //     if (columnState && columnApi) {
    //         columnApi.setColumnState(columnState);
    //     }
    // }, [columnState, columnApi]);

    // useEffect(() => {
    //     if (sortState && gridApi) {
    //         function setSort(e: FirstDataRenderedEvent) {
    //             e.api.setSortModel(sortState);
    //         }

    //         gridApi.addEventListener("firstDataRendered", setSort);
    //         return () => gridApi.removeEventListener("firstDataRendered", setSort);
    //     }
    // }, [sortState, gridApi]);

    // const onSortChanged = useCallback(
    //     (e: SortChangedEvent) => {
    //         setSortState(e.api.getSortModel() as SortModel, true);
    //     },
    //     [setSortState]
    // );
    //onSortChanged
}
