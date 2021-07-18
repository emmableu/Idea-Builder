import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {DashboardViewData} from "../../data/DashboardData/DashboardViewData";
import Cookies from "js-cookie"
import axios from "../../axiosConfig";
import {DashboardAPI} from "../../api/DashboardAPI";
import {DashboardAPIData} from "../../data/DashboardData/DashboardAPIData";
import {ProjectAPI} from "../../api/ProjectAPI";
import {deleteActorInMemory} from "./projectSlice";


const fetchDashboardByUserID = createAsyncThunk(
    'dashboard/fetchById',
    async (userId, thunkAPI) => {
        const response = await DashboardAPI.fetchDashboard(userId);
        let dashboardData;
        if (response.status === 204) {
            const dashboardAPIData = new DashboardAPIData(userId);
            await DashboardAPI.insertDashboard(dashboardAPIData);
            dashboardData = dashboardAPIData.toEmptyDashboardViewData();
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
        console.log("getState().dashboard.value: ", getState().dashboard.value);
        const projectIdList = getState().dashboard.value.projectList.map(p => (p._id));
        const userId = Cookies.get("userId");
        const response = await DashboardAPI.replaceProjectIdListInDatabase({
            userId, projectIdList
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
            console.log("state.value.projectList, action: ", state.value.projectList, action);
                const toRemoveIndex = state.value.projectList.findIndex(p => p._id === action.payload);
                state.value.projectList.splice(toRemoveIndex, 1);
            }
    },
    extraReducers:  {
        [fetchDashboardByUserID.fulfilled]:
            (state, action) => {
                const obj = DashboardViewData.parse(action.payload);
                state.value = obj;
        },
    }
})


// Action creators are generated for each case reducer function
export const { deleteProjectOnDashboardInMemory } = dashboardSlice.actions;
export {fetchDashboardByUserID, deleteProjectOnDashboard};
export default dashboardSlice.reducer;
