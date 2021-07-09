import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {DashboardData} from "../../data/DashboardData";
import Cookies from "js-cookie"
import axios from "../../axiosConfig";
import {DashboardAPI} from "../../api/DashboardAPI";


const fetchDashboardByUserID = createAsyncThunk(
    'dashboard/fetchById',
    async (userID, thunkAPI) => {
        const response = await DashboardAPI.fetchDashboard(userID);
        return response
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
        [fetchDashboardByUserID.fulfilled]: (state, action) => {
                if (action.payload.status === 204) {
                    console.log("fetchDashboardByUserID fulfiled")
                    console.log("state: ", state);
                    console.log("action: ", action);
                    state.value = new DashboardData(action.meta.arg).toJSON();
                }
            }
    }
})


// export const fetchUserById = () => async (dispatch) => {
//     const userID = Cookies.get("userID");
//     const response = await axios({
//         method: 'get',
//         url: `/dashboard/${userID}`,
//     })
//     if (response.status === 204) {
//         dispatch(loadDashboardFromCookieUserID(userID));
//     }
// }


// Action creators are generated for each case reducer function
export const { } = dashboardSlice.actions;
export {fetchDashboardByUserID};
export default dashboardSlice.reducer;
