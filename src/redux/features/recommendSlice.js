import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ProjectDataHandler} from "../../data/ProjectData";
import * as UUID from "uuid";
import axios from "../../axiosConfig";


const loadAllRecommend = createAsyncThunk(
    'project/loadAllRecommend',
    async (payload, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const rawNameList = getState().recommend.value.nameList;
        for (const rawName of rawNameList) {
            const projectName = rawName.split(' ').join('%20');
            const url = `/static/week2project/${projectName}/recommend.json`;
            await axios({
                method: 'get',
                url: url,
            }).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
                .then( res =>
                dispatch(addRecommend({
                    name: rawName,
                    data:res.data,
                }))
            )
        }
        dispatch(resetDisplayRecommend());
        return "OK";
    }
)

export const recommendSlice = createSlice({
    name: 'recommendSlice',
    initialState: {
        value: {
            projectMap: {},
            displayList: [],
            selected: null,
            modified: null,
            originalCostumes: [],
            // originalBackdrops: [],
            currentCostumes: [],
            nameList:
                ['Bounce Around the Stage',
                    'Paw Prints',
                    'Select a Button in a List',
                    'Move When Key Is Pressed',
                    'Boat Race',
                    'Snake Eating Apples',
                    'Create Many Actors',
                    'Click Icon to Show and Hide Calendar',
                    'Increases Score When Explode',
                    'Move With the Mouse',
                    'Browse Through Carousel',
                    'Helicopter Dropping Water',
                    'Snake Turning',
                    'Game Timer',
                    'Flower Grows When Water Dropped',
                    'Bounce on paddle',
                    'Actor Moves Randomly to the Right',
                    'Initialize Actors to Random Positions',
                    'Move Between Points',
                    'Jump',
                    'Catching Fruit'],
        },
    },
    reducers: {
        resetRecommend: (state) => {
            state.value.displayList = []
        },

        addRecommend: (state, action) => {
            const {name, data} = action.payload;
            state.value.projectMap[name] = data;
        },

        resetDisplayRecommend: (state, action) => {
            state.value.displayList = []
            const shuffled = state.value.nameList
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
            for (const ele of shuffled) {
                if (state.value.projectMap[ele]) {
                    state.value.displayList.push(
                        state.value.projectMap[ele]
                    )
                }

            }
        },

        setSelectedRecommend: (state, action) => {
            const selected = action.payload;
            state.value.selected = selected;
            // console.log("recommend: ", JSON.stringify(selected));
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

export const { resetRecommend, addRecommend, setSelectedRecommend,resetDisplayRecommend,  setModifiedRecommend,resetModifiedRecommend, clearModifiedRecommend,  modifyRecommend,
    modifyRecommendBackdrop, justModifyStateId } = recommendSlice.actions
export {loadAllRecommend};
export default recommendSlice.reducer
