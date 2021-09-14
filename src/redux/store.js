import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './features/projectSlice'
import dashboardReducer from './features/dashboardSlice'
import modeReducer from "./features/modeSlice"
import recommendReducer from "./features/recommendSlice"
import authorReducer from "./features/authorSlice"

export default configureStore({
    reducer: {
        project: projectReducer,
        dashboard: dashboardReducer,
        mode: modeReducer,
        recommend: recommendReducer,
        author: authorReducer,
    },
})
