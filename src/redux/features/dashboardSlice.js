import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {DashboardViewData} from "../../data/DashboardData/DashboardViewData";
import Cookies from "js-cookie"
import axios from "../../axiosConfig";
import {DashboardAPI} from "../../api/DashboardAPI";
import {DashboardAPIData} from "../../data/DashboardData/DashboardAPIData";


const fetchDashboardByUserID = createAsyncThunk(
    'dashboard/fetchById',
    async (userID, thunkAPI) => {
        const response = await DashboardAPI.fetchDashboard(userID);
        let dashboardData;
        if (response.status === 204) {
            dashboardData = new DashboardViewData(userID);
            await DashboardAPI.insertDashboard(dashboardData);
            return dashboardData.toJSON();
        }
        else if (response.status === 200) {
            return response.data;
        }
    }
)



export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        value: null,
    },
    reducers: {

    },
    extraReducers:  {
        [fetchDashboardByUserID.fulfilled]:
            (state, action) => {
                console.log("state, action: ", state, action);
                const obj = DashboardViewData.parse(action.payload);
                state.value = obj;
        },
    }
})


// Action creators are generated for each case reducer function
export const { } = dashboardSlice.actions;
export {fetchDashboardByUserID};
export default dashboardSlice.reducer;
