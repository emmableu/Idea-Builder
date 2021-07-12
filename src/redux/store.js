import { configureStore } from '@reduxjs/toolkit'
import frameActionReducer from './features/frameActionSlice'
import selectedFrameReducer from './features/selectedFrameSlice'
import projectReducer from './features/projectSlice'
import dashboardReducer from './features/dashboardSlice'
import selectedStoryboardReducer from './features/selectedStoryboardSlice'
import dragUrlReducer from './features/dragUrlSlice'

export default configureStore({
    reducer: {
        frameAction: frameActionReducer,
        selectedFrame: selectedFrameReducer,
        project: projectReducer,
        dashboard: dashboardReducer,
        selectedStoryboard: selectedStoryboardReducer,
        dragUrl: dragUrlReducer,
    },
})
