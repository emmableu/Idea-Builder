import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import selectedStageReducer from './features/selectedStageSlice'
import updateSpriteCostumeMapReducer from './features/updateSpriteCostumeMapSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        selectedStage: selectedStageReducer,
        spriteCostumeMap: updateSpriteCostumeMapReducer
    },
})
