import { ColDef, AllCommunityModules, ColumnState } from "@ag-grid-community/all-modules";
import { AgGridReact } from "@ag-grid-community/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_MEMBERS } from "src/graphql/Queries";
import { useGridOptions } from "src/hooks/useGridOptions";
import { useEffect, useContext } from "react";

import "./Grid.scss";
import { DarkThemeContext } from "src/utils/context";

export default function MembersPage() {
    const { data, error, loading } = useQuery(GET_ALL_MEMBERS);
    const [gridOptions, gridApi] = useGridOptions(columnDefs, defaultColumnState);
    const dark = useContext(DarkThemeContext);

    useEffect(() => {
        if (gridApi) {
            if (data) {
                gridApi.setRowData(data.getAllMembers);
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

    return (
        <div id="grid">
            <div className={`ag-theme-balham${dark ? "-dark" : ""} ag`}>
                <AgGridReact modules={AllCommunityModules} gridOptions={gridOptions} />
            </div>
        </div>
    );
}
const columnDefs: ColDef[] = [
    { colId: "Member_Id", headerName: "id", field: "Member_Id", hide: true },
    { colId: "First_Name", headerName: "Ім'я", field: "First_Name" },
    { colId: "Last_Name", headerName: "Прізвище", field: "Last_Name" },
    { colId: "Phone_Number", headerName: "Номер Телефону", field: "Phone_Number" },
    { colId: "Email", headerName: "Імейл", field: "Email", flex: 1 }
];

export const defaultColumnState: ColumnState[] = [
    {
        colId: "Member_Id",
        hide: true
    },
    {
        colId: "First_Name",
        hide: false
    },
    { colId: "Last_Name", hide: false },
    { colId: "Phone_Number", hide: false },
    { colId: "Email", hide: false }
];
