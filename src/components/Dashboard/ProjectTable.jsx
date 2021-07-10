import React from "react";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {deleteProjectOnDashboard} from "../../redux/features/dashboardSlice";
import {useRouteMatch, useHistory} from "react-router-dom"
const { confirm } = Modal;

const ProjectTable = (props) => {
    const {projectList} = props;
    const dispatch = useDispatch();
    let history = useHistory();
    let match = useRouteMatch();

    const [tableData, setTableData] = React.useState([]);

    React.useEffect(() => {
        setTableData(projectList);
    }, [projectList])

    const redirectToProjectPage = (rowData) => {
        history.push(`${match.url}/${rowData._id}`)
    }

    const deleteProject = (rowData) => {
        const projectId = rowData._id;
        confirm({
            title: 'Are you sure you want to delete this project?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action is irreversible.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(deleteProjectOnDashboard(projectId));
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


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
            data={tableData}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit project',
                    onClick: (event, rowData) => redirectToProjectPage(rowData),
                },
                // {
                //     icon: 'library_add',
                //     tooltip: 'Duplicate project',
                //     onClick: (event, rowData) => alert("You copied " + rowData._id)
                // },
                {
                    icon: 'delete',
                    tooltip: 'Delete project',
                    onClick: (event, rowData) => deleteProject(rowData) ,
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
