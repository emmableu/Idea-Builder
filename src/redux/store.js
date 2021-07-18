import { configureStore } from '@reduxjs/toolkit'
import selectedFrameReducer from './features/selectedFrameSlice'
import projectReducer from './features/projectSlice'
import dashboardReducer from './features/dashboardSlice'
import selectedStarReducer from './features/selectedStarSlice'
import frameThumbnailStateReducer from "./features/frameThumbnailStateSlice";

export default configureStore({
    reducer: {
        project: projectReducer,
        dashboard: dashboardReducer,
        frameThumbnailState: frameThumbnailStateReducer
    },
})
