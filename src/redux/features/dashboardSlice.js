import { createSlice } from '@reduxjs/toolkit'
import {DashboardData} from "../../data/DashboardData";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        value: null,
    },
    reducers: {
        createDashboard: {
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

    },
})

// Action creators are generated for each case reducer function
export const { createDashboard} = dashboardSlice.actions;

export default dashboardSlice.reducer;
