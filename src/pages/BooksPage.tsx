import { ColDef, AllCommunityModules, ColumnState } from "@ag-grid-community/all-modules";
import { AgGridReact } from "@ag-grid-community/react";
import { useGridOptions } from "src/hooks/useGridOptions";
import { useEffect, useContext } from "react";

import "./Grid.scss";
import { DarkThemeContext, SearchContext } from "src/utils/context";
import { useBooks } from "src/hooks/useBooks";

export default function BooksPage() {
    const [gridOptions, gridApi] = useGridOptions(columnDefs, defaultColumnState);
    const dark = useContext(DarkThemeContext);
    const [search] = useContext(SearchContext);
    const [data, loading] = useBooks();

    // const onGridReady = (params: any) => {
    //     params.api.sizeColumnsToFit();
    // };

    // /**
    //  * Auto-size all columns once the initial data is rendered.
    //  */
    // const autoSizeColumns = (params: any) => {
    //     const colIds = params.columnApi.getAllDisplayedColumns().map((col: any) => col.getColId());

    //     params.columnApi.autoSizeColumns(colIds);
    // };

    useEffect(() => {
        if (gridOptions) {
            gridOptions.getRowNodeId = (data: { Book_Id: string }) => data.Book_Id;
            gridOptions.getRowClass = params => params.data.Book_Id;
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
    { colId: "Book_Id", headerName: "Book_Id", field: "Book_Id", hide: true },
    { colId: "Genre_Id", headerName: "Genre_Id", field: "Genre_Id", hide: true },
    { colId: "Series_Id", headerName: "Series_Id", field: "Series_Id", hide: true },
    {
        colId: "In_Series_Number",
        headerName: "In_Series_Number",
        field: "In_Series_Number",
        hide: true
    },
    { colId: "ISBN", headerName: "ISBN", field: "ISBN", hide: true },
    {
        colId: "Title",
        headerName: "Назва",
        field: "Title"
    },
    {
        colId: "Language",
        headerName: "Мова",
        field: "Language",
        valueGetter: params => formatLanguageField(params.data.Language)
    },

    {
        colId: "Publication_Year",
        headerName: "Рік Видання",
        field: "Publication_Year",
        valueGetter: params => formatPublicationYearField(params.data.Publication_Year),
        flex: 1
    }
];

export const defaultColumnState: ColumnState[] = [
    { colId: "Book_Id", hide: true },
    { colId: "Genre_Id", hide: true },
    { colId: "Series_Id", hide: true },
    { colId: "In_Series_Number", hide: true },
    { colId: "Title", hide: false },
    { colId: "ISBN", hide: false },
    { colId: "Publication_Year", hide: false },
    { colId: "Language", hide: false }
];

const formatLanguageField = (language: string) => {
    switch (language.toLowerCase()) {
        case "en":
            return "Англійська";
        case "ru":
            return "Російська";
        case "ua":
            return "Українська";
        default:
            return "Unknown Language";
    }
};

const formatPublicationYearField = (year: number) => {
    if (year === 0) return null;
    return year;
};
