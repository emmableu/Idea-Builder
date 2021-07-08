import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import selectedStageReducer from './features/selectedStageSlice'
import projectReducer from './features/projectSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        selectedStage: selectedStageReducer,
        project: projectReducer
    },
})
