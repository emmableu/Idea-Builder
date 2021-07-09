import { createSlice } from '@reduxjs/toolkit'
import {DashboardData} from "../../data/DashboardData";
import Cookies from "js-cookie"

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        value: null,
    },
    reducers: {
        loadDashboardFromLoginUserID: {
            reducer: (state, action) => {
                state.value = new DashboardData(action.payload.userID);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return { payload: {
                        "userID": obj.userID,
                    }
                }
            },
        },

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
export const { loadDashboardFromLoginUserID,
    loadDashboardFromCookieUserID} = dashboardSlice.actions;

export default dashboardSlice.reducer;
