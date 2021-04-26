import {
    ColDef,
    ColumnApi,
    ColumnState,
    GridApi,
    GridOptions
} from "@ag-grid-community/all-modules";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useStoredColumns } from "./useStoredColumns";

// import { localTime, relativeTime } from "../utils/utils";

const autoSizeColumns = ({ columnApi }: { api: GridApi; columnApi: ColumnApi }) => {
    const ids = columnApi.getAllColumns();
    console.log("ids: ", ids);
    // don't autosize last column
    if (ids) {
        ids?.pop();
        console.log("here");
        columnApi.autoSizeColumns(ids);
    }
};

// const processCellForClipboard = (params: any) => params.value;

export function useGridOptions(
    defaultColDef: Array<ColDef>,
    defaultColumnState: Array<ColumnState>
): [GridOptions, GridApi | undefined, number | undefined] {
    const [gridApi, setGridApi] = useState<GridApi>();
    const [columnApi, setColumnApi] = useState<ColumnApi>();
    const [filteredCount, setFilteredCount] = useState<number | undefined>(undefined);

    const gridApiRef = useRef<GridApi>();

    const [onColumnChanged] = useStoredColumns({
        tableName: "templates",
        defaultColumnState
    });

    const onFilterChanged = useCallback(
        ({ api }) => {
            setFilteredCount(api.getDisplayedRowCount());
        },
        [setFilteredCount]
    );

    useEffect(() => {
        if (gridApi) {
            gridApi.addEventListener("columnResized", onColumnChanged);
            gridApi.addEventListener("displayedColumnsChanged", onColumnChanged);
            gridApi.addEventListener("filterChanged", onFilterChanged);
            return () => {
                gridApi.removeEventListener("columnResized", onColumnChanged);
                gridApi.removeEventListener("displayedColumnsChanged", onColumnChanged);
                gridApi.removeEventListener("filterChanged", onFilterChanged);
            };
        }
    }, [gridApi, onColumnChanged, onFilterChanged]);

    // useEffect(() => {
    //     if (gridApi) {
    //         gridApi.addEventListener("sortChanged", onSortChanged);

    //         return () => {
    //             gridApi.removeEventListener("sortChanged", onSortChanged);
    //         };
    //     }
    // }, [gridApi, onSortChanged]);
    useEffect(() => {
        if (gridApi) {
            gridApi.setColumnDefs([...defaultColDef]);
        }
    }, [defaultColDef, gridApi]);

    return [
        useMemo<GridOptions>(
            () => ({
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    editable: false
                },
                columnTypes: {
                    dateColumn: { filter: "agDateColumnFilter" }
                },

                getRowNodeId: (data: { id: string }) => data.id,
                getRowClass: params => params.data.id,
                // rowClassRules: {
                //     "alarm-expired": (params) => {
                //         const expiration = params.data.expiration;
                //         const active = params.data.active;
                //         return (!!expiration && Date.now() > expiration) || !active;
                //     }
                // },

                allowContextMenuWithControlKey: true,
                enableBrowserTooltips: true,
                animateRows: true,
                rowSelection: "single",
                suppressAggFuncInHeader: true,
                onFirstDataRendered: e => autoSizeColumns(e),
                immutableData: true,
                popupParent: document.getElementById("root")!,
                // getContextMenuItems: getContextMenuItems,
                // processCellForClipboard: processCellForClipboard,
                onGridReady: e => {
                    setGridApi(e.api);
                    setColumnApi(e.columnApi);
                    gridApiRef.current = e.api;
                }
            }),
            []
        ),
        gridApi,
        filteredCount
    ];
}
