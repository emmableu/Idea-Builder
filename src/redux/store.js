import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './features/projectSlice'
import dashboardReducer from './features/dashboardSlice'
import frameThumbnailStateReducer from "./features/frameThumbnailStateSlice";
import modeReducer from "./features/modeSlice"

export default configureStore({
    reducer: {
        project: projectReducer,
        dashboard: dashboardReducer,
        frameThumbnailState: frameThumbnailStateReducer,
        mode: modeReducer,
    },
})
