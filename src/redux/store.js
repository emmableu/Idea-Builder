import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import selectedStageReducer from './features/selectedStageSlice'
import updateActorStateMapReducer from './features/updateActorStateMapSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        selectedStage: selectedStageReducer,
        actorStateMap: updateActorStateMapReducer
    },
})
