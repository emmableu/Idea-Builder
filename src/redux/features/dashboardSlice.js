import { createSlice } from '@reduxjs/toolkit'
import {DashboardData} from "../../data/DashboardData";
import Cookies from "js-cookie"

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        value: null,
    },
    reducers: {
        loadDashboardFromCookieUserID: {
            reducer: (state) => {
                const userID = Cookies.get("userID");
                if (userID === undefined){
                    return
                }
                state.value = new DashboardData(userID);
            },
        }
    },
})

// Action creators are generated for each case reducer function
export const { loadDashboardFromCookieUserID} = dashboardSlice.actions;

export default dashboardSlice.reducer;
