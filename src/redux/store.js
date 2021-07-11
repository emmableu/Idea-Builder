import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import selectedStageReducer from './features/selectedStageSlice'
import projectReducer from './features/projectSlice'
import dashboardReducer from './features/dashboardSlice'
import selectedStoryboardReducer from './features/selectedStoryboardSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        selectedStage: selectedStageReducer,
        project: projectReducer,
        dashboard: dashboardReducer,
        selectedStoryboard: selectedStoryboardReducer,
    },
})
