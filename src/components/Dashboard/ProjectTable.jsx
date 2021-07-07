import React from "react";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const ProjectTable = () => {
    return (
        <MaterialTable
            components={{
                Container: props => <Paper {...props} elevation={0}/>
            }}
            style={{backgroundColor: "inherit"}}
            title={null}
            columns={[
                { title: 'Name', field: 'name' }
            ]}
            data={[
                {   id: "abc",
                    name: 'build city'},
                {   id: "efg",
                    name: 'create your own world',  },
            ]}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit project',
                    onClick: (event, rowData) => alert("edit " + rowData.id)
                },
                {
                    icon: 'library_add',
                    tooltip: 'Duplicate project',
                    onClick: (event, rowData) => alert("You copied " + rowData.id)
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete project',
                    onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                },
            ]}
            options={{
                actionsColumnIndex: -1,
                headerStyle: {
                    backgroundColor: 'inherit',
                }
            }}
        />
    )
}

export  default ProjectTable;
