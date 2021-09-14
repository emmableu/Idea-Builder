import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {DashboardData, DashboardDataHandler} from "../../data/DashboardData/DashboardData";
import Cookies from "js-cookie"
import {globalLog} from "../../globalConfig";
import {DashboardAPI} from "../../api/DashboardAPI";
// import {DashboardAPIData} from "../../data/DashboardData/DashboardAPIData";


const fetchDashboardByUserID = createAsyncThunk(
    'dashboard/fetchById',
    async (authorId, thunkAPI) => {
        const response = await DashboardAPI.fetchDashboard(authorId);
        let dashboardData;
        if (response.status === 204) {
            // const dashboardAPIData = new DashboardAPIData(userId);
            const dashboardAPIData = DashboardDataHandler.initializeDashboardAPI({authorId});
            await DashboardAPI.insertDashboard(dashboardAPIData);
            dashboardData = DashboardDataHandler.initializeDashboard({authorId});
            return dashboardData;
        }
        else if (response.status === 200) {
            return response.data;
        }
    }
)


const deleteProjectOnDashboard = createAsyncThunk(
    'dashboard/deleteProjectOnDashboard',
    async (projectId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(deleteProjectOnDashboardInMemory(projectId));
        const projectIdList = getState().dashboard.value.projectList.map(p => (p._id));
        const authorId = Cookies.get("userId");
        const response = await DashboardAPI.replaceProjectIdListInDatabase({
            authorId, projectIdList
        });
        return response.status;
    }
)




export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        value: null,
    },
    reducers: {
        deleteProjectOnDashboardInMemory:
            (state, action) => {
            globalLog("state.value.projectList, action: ", state.value.projectList, action);
                const toRemoveIndex = state.value.projectList.findIndex(p => p._id === action.payload);
                state.value.projectList.splice(toRemoveIndex, 1);
            }
    },
    extraReducers:  {
        [fetchDashboardByUserID.fulfilled]:
            (state, action) => {
                const obj = action.payload;
                state.value = obj;
        },
    }
})


export const { deleteProjectOnDashboardInMemory } = dashboardSlice.actions;
export {fetchDashboardByUserID, deleteProjectOnDashboard};
export default dashboardSlice.reducer;
