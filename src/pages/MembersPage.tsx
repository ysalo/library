import { ColDef, AllCommunityModules, ColumnState } from "@ag-grid-community/all-modules";
import { AgGridReact } from "@ag-grid-community/react";
import { useGridOptions } from "src/hooks/useGridOptions";
import { useEffect, useContext } from "react";

import "./Grid.scss";
import { DarkThemeContext, SearchContext } from "src/utils/context";
import { useMembers } from "src/hooks/useMembers";

export default function MembersPage() {
    const [gridOptions, gridApi] = useGridOptions(columnDefs, defaultColumnState);
    const dark = useContext(DarkThemeContext);
    const [search] = useContext(SearchContext);

    const [data, loading] = useMembers();
    useEffect(() => {
        if (gridOptions) {
            gridOptions.getRowNodeId = (data: { Member_Id: string }) => data.Member_Id;
            gridOptions.getRowClass = params => params.data.Member_Id;
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
    { colId: "Member_Id", headerName: "Member_Id", field: "Member_Id", hide: true },
    { colId: "First_Name", headerName: "Ім'я", field: "First_Name" },
    { colId: "Last_Name", headerName: "Прізвище", field: "Last_Name" },
    { colId: "Middle_Name", headerName: "По Батькові", field: "Middle_Name" },
    { colId: "Phone_Number", headerName: "Номер Телефону", field: "Phone_Number", valueFormatter: (p) => {
        console.log(p.value)
        return normalize(p.value)} },
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
    {
        colId: "Last_Name",
        hide: false
    },
    {
        colId: "Phone_Number",
        hide: false
    },
    {
        colId: "Email",
        hide: false
    }
];

const  normalize = (phone:string | null) =>  {
    if(!phone) {
        return "";
    }
    return phone.replace(/\D+/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}