import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './features/projectSlice'
import dashboardReducer from './features/dashboardSlice'
import modeReducer from "./features/modeSlice"
import recommendReducer from "./features/recommendSlice"
import assetReducer from "./features/assetSlice";

export default configureStore({
    reducer: {
        project: projectReducer,
        dashboard: dashboardReducer,
        mode: modeReducer,
        recommend: recommendReducer,
        asset: assetReducer
    },
})
