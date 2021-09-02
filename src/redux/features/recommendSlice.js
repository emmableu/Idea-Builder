import { createSlice} from '@reduxjs/toolkit'
import {ProjectDataHandler} from "../../data/ProjectData";



export const recommendSlice = createSlice({
    name: 'recommendSlice',
    initialState: {
        value: {
            initial: [],
            selected: null,
            modified: null,
        },
    },
    reducers: {
        resetRecommend: (state) => {
            state.value.initial = []
        },

        addRecommend: (state, action) => {
            state.value.initial.push(action.payload);
        },

        setSelectedRecommend: (state, action) => {
            const selected = action.payload;
            state.value.selected = selected;
            state.value.modified = JSON.parse(JSON.stringify(selected));
        },

        setModifiedRecommend: (state, action) => {
            state.value.modified = action.payload
        },

        modifyRecommend: (state, action) => {
            const {actorId, stateId, newActorId, newStateId} = action.payload;
            ProjectDataHandler.swapCostume(state.value.modified, actorId, stateId, newActorId, newStateId);
            console.log("modified: ", state.value.modified);
        }
    },
})

export const { resetRecommend, addRecommend, setSelectedRecommend, setModifiedRecommend, modifyRecommend } = recommendSlice.actions
export default recommendSlice.reducer
