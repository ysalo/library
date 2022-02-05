import { ColDef, AllCommunityModules, ColumnState } from "@ag-grid-community/all-modules";
import { AgGridReact } from "@ag-grid-community/react";
import { useGridOptions } from "src/hooks/useGridOptions";
import { useEffect, useContext } from "react";

import "./Grid.scss";
import { DarkThemeContext, SearchContext } from "src/utils/context";

import { useLoans } from "src/hooks/useLoans";
import { convertFromEpochTime, isPastDue } from "src/utils/utils";

export default function LoansPage() {
    const [gridOptions, gridApi] = useGridOptions(columnDefs, defaultColumnState);
    const dark = useContext(DarkThemeContext);
    const [search] = useContext(SearchContext);

    const [loans, loading] = useLoans();
    useEffect(() => {
        if (gridOptions) {
            gridOptions.getRowNodeId = (data: { Loan_Id: string }) => data.Loan_Id;
            gridOptions.getRowClass = params => params.data.Loan_Id;
        }
    }, [gridOptions]);

    useEffect(() => {
        if (gridApi) {
            if (loans) {
                gridApi.setRowData(loans);
            }
        }
    }, [loans, gridApi]);

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
    { colId: "Barcode", headerName: "Штрих-код", field: "Barcode", hide: true },

    {
        headerName: "Ім'я",
        field: "Member.First_Name",
        valueGetter: params =>
            `${params.data.Member.Last_Name} ${params.data.Member.First_Name} ${
                params.data.Member.Middle_Name || ""
            }`
    },
    {
        colId: "Title",
        headerName: "Книга",
        field: "Title",
        valueGetter: params => params.data.Item.BookToBarcode[0].Book.Title
    },
    {
        colId: "Returned",
        headerName: "Повернуто",
        field: "Returned",
        cellStyle: params =>
            isPastDue(params.data.Due, params.data.Returned)
                ? { background: "rgba(253, 57, 57, 0.5)", fontWeight: "bold" }
                : null,
        valueGetter: params => convertFromEpochTime(params.data.Returned)
    },
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
        valueGetter: params => convertFromEpochTime(params.data.Due),
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
    },
    {
        colId: "Title",
        hide: false
    }
];
