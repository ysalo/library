import { ColDef, AllCommunityModules, ColumnState } from "@ag-grid-community/all-modules";
import { AgGridReact } from "@ag-grid-community/react";
import { useGridOptions } from "src/hooks/useGridOptions";
import { useEffect, useContext } from "react";

import "./Grid.scss";
import { DarkThemeContext, SearchContext } from "src/utils/context";

import { useLoans } from "src/hooks/useLoans";
import { convertFromEpochTime } from "src/utils/utils";

export default function LoansPage() {
    const [gridOptions, gridApi] = useGridOptions(columnDefs, defaultColumnState);
    const dark = useContext(DarkThemeContext);
    const [search] = useContext(SearchContext);

    const [data, loading] = useLoans();

    useEffect(() => {
        if (gridOptions) {
            gridOptions.getRowNodeId = (data: { Loan_Id: string }) => data.Loan_Id;
            gridOptions.getRowClass = params => params.data.Loan_Id;
        }
    }, [gridOptions]);

    useEffect(() => {
        if (gridApi) {
            if (data) {
                gridApi.setRowData(data);
            }
        }
    }, [data, gridApi]);

    useEffect(() => {
        if (gridApi) {
            if (loading) {
                gridApi.showLoadingOverlay();
            } else {
                gridApi.hideOverlay();
            }
        }
    }, [gridApi, loading]);

    useEffect(() => {
        if (gridApi) {
            gridApi.setQuickFilter(search);
        }
    }, [gridApi, search]);

    return (
        <div id="grid">
            <div className={`ag-theme-balham${dark ? "-dark" : ""} ag`}>
                <AgGridReact modules={AllCommunityModules} gridOptions={gridOptions} />
            </div>
        </div>
    );
}
const columnDefs: ColDef[] = [
    { colId: "Loan_Id", headerName: "Loan_Id", field: "Loan_Id", hide: true },
    { colId: "Barcode", headerName: "Штрих-код", field: "Barcode" },
    { colId: "Member_Id", headerName: "ID", field: "Member_Id" },
    {
        colId: "Checkout",
        headerName: "Взято",
        field: "Checkout",
        valueGetter: params => convertFromEpochTime(params.data.Checkout)
    },
    {
        colId: "Due",
        headerName: "Повернути До",
        field: "Due",
        valueGetter: params => convertFromEpochTime(params.data.Due)
    },
    {
        colId: "Returned",
        headerName: "Повернуто",
        field: "Returned",
        valueGetter: params => convertFromEpochTime(params.data.Returned),
        flex: 1
    }
];

export const defaultColumnState: ColumnState[] = [
    {
        colId: "Loan_Id",
        hide: true
    },
    {
        colId: "Barcode",
        hide: false
    },
    // {
    //     colId: "Member_Id",
    //     hide: false
    // },
    {
        colId: "Checkout",
        hide: false
    },
    {
        colId: "Due",
        hide: false
    },
    {
        colId: "Returned",
        hide: false
    }
];
