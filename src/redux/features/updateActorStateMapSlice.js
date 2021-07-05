import { createSlice } from '@reduxjs/toolkit'

export const updateActorStateMapSlice = createSlice({
    name: 'updateActorStateMap',
    initialState: {
        value: {},
    },
    reducers: {
        addState: {
            reducer: (state, action) => {
                if (!state.value.hasOwnProperty(action.payload.actorName)){
                    state.value[action.payload.actorName] = {};
                }
                state.value[action.payload.actorName][action.payload.stateName] =
                    {
                        imgID: action.payload.imgID,
                        imgSrc: action.payload.imgSrc,
                    };
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return { payload: {
                            "imgID": obj.imgID,
                            "actorName": obj.actorName,
                            "stateName": obj.stateName,
                            "imgSrc": obj.imgSrc,
                        }
                }
            },
        },
    },
})

// Action creators are generated for each case reducer function
export const { addState } = updateActorStateMapSlice.actions;

export default updateActorStateMapSlice.reducer;
