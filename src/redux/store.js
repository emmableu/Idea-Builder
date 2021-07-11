import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import selectedFrameReducer from './features/selectedFrameSlice'
import projectReducer from './features/projectSlice'
import dashboardReducer from './features/dashboardSlice'
import selectedStoryboardReducer from './features/selectedStoryboardSlice'
import dragUrlReducer from './features/dragUrlSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        selectedFrame: selectedFrameReducer,
        project: projectReducer,
        dashboard: dashboardReducer,
        selectedStoryboard: selectedStoryboardReducer,
        dragUrl: dragUrlReducer,
    },
})
