import { createSlice} from '@reduxjs/toolkit'
import {ProjectDataHandler} from "../../data/ProjectData";
import * as UUID from "uuid";



export const recommendSlice = createSlice({
    name: 'recommendSlice',
    initialState: {
        value: {
            initial: [],
            selected: null,
            modified: null,
            originalCostumes: [],
            // originalBackdrops: [],
            currentCostumes: [],
            // currentBackdrops: [],
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
            console.log("recommend: ", JSON.stringify(selected));
            const originalCostumes = [];
            for (const backdrop of selected.backdropList) {
                originalCostumes.push({
                    type: "backdrop",
                    ...backdrop
                })
            }
            for (const actor of selected.actorList) {
                for (const state of actor.stateList) {
                    originalCostumes.push(
                        {
                            actorId: actor._id,
                            actorName: actor.name,
                            ...state,
                            type: "state",
                        }
                    )
                }
            }
            state.value.originalCostumes = originalCostumes;
            // state.value.currentBackdrops = new Array(originalCostumes.length).fill(null);
            // state.value.originalBackdrops = selected.backdropList;
            // state.value.currentBackdrops = new Array(selected.backdropList.length).fill(null);
            state.value.currentCostumes = JSON.parse(JSON.stringify(originalCostumes));

            state.value.modified = JSON.parse(JSON.stringify(selected));
            if (state.value.modified !== null) {
                state.value.modified._id = UUID.v4();
            }
        },

        resetModifiedRecommend: (state) => {
            state.value.modified = JSON.parse(JSON.stringify(state.value.selected));
            const selected = state.value.selected;
            const originalCostumes = [];
            for (const backdrop of selected.backdropList) {
                originalCostumes.push({
                    type: "backdrop",
                    ...backdrop
                })
            }
            for (const actor of selected.actorList) {
                for (const state of actor.stateList) {
                    originalCostumes.push(
                        {
                            actorId: actor._id,
                            actorName: actor.name,
                            ...state,
                            type: "state",
                        }
                    )
                }
            }
            state.value.originalCostumes = originalCostumes;
            // state.value.currentBackdrops = new Array(originalCostumes.length).fill(null);
            // state.value.originalBackdrops = selected.backdropList;
            // state.value.currentBackdrops = new Array(selected.backdropList.length).fill(null);
            state.value.currentCostumes = JSON.parse(JSON.stringify(originalCostumes));

            if (state.value.modified !== null) {
                state.value.modified._id = UUID.v4();
            }
        },

        clearModifiedRecommend: (state) => {
            state.value.selected = null;
            state.value.modified = null;
            state.value.currentCostumes = [];
            state.value.originalCostumes = [];
        },

        setModifiedRecommend: (state, action) => {
            state.value.modified = action.payload
        },

        modifyRecommend: (state, action,) => {
            const {newActorId, newStateId, selected} = action.payload;
            const {actorId, _id, type} = state.value.currentCostumes[selected];
            if (type === "state") {
                ProjectDataHandler.swapCostume(state.value.modified, actorId, _id, newActorId, newStateId);
            }
            else if (type === "backdrop") {
                // ProjectDataHandler.swapCostume(state.value.modified, actorId, stateId, newActorId, newStateId);
                ProjectDataHandler.swapBackdrop(state.value.modified, _id, newStateId);
            }
            state.value.currentCostumes[selected] = {_id: newStateId, name: "untitled", type: type};
            // console.log("modified: ", state.value.modified);
        },


        // modifyRecommendBackdrop: (state, action) => {
        //     const {stateId, newStateId, currentCostumeStep} = action.payload;
        //     state.value.currentBackdrops[currentCostumeStep]= {_id: newStateId, name: "stage"};
        //     ProjectDataHandler.swapBackdrop(state.value.modified, stateId, newStateId);
        //     // console.log("modified: ", state.value.modified);
        // },

        // justModifyStateId: (state, action) => {
        //     const {idx, type} = action.payload;
        //     if (type === "backdrop") {
        //         state.value.currentBackdrops[idx] = state.value.originalBackdrops[idx];
        //     }
        //     else if (type === "state") {
        //         state.value.currentCostumes[idx] = state.value.originalCostumes[idx];
        //     }
        // }
    },
})

export const { resetRecommend, addRecommend, setSelectedRecommend, setModifiedRecommend,resetModifiedRecommend, clearModifiedRecommend,  modifyRecommend,
    modifyRecommendBackdrop, justModifyStateId } = recommendSlice.actions
export default recommendSlice.reducer
