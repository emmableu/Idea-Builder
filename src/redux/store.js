import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './features/projectSlice'
import dashboardReducer from './features/dashboardSlice'
import modeReducer from "./features/modeSlice"

export default configureStore({
    reducer: {
        project: projectReducer,
        dashboard: dashboardReducer,
        mode: modeReducer,
    },
})
