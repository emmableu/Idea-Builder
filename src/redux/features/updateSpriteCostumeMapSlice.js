import { createSlice } from '@reduxjs/toolkit'

export const updateSpriteCostumeMapSlice = createSlice({
    name: 'updateSpriteCostumeMap',
    initialState: {
        value: {},
    },
    reducers: {
        addCostume: {
            reducer: (state, action) => {
                if (!state.value.hasOwnProperty(action.payload.spriteName)){
                    state.value[action.payload.spriteName] = {};
                }
                state.value[action.payload.spriteName][action.payload.costumeName] =
                    {
                        imgID: action.payload.imgID,
                        imgSrc: action.payload.imgSrc,
                    };
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return { payload: {
                            "imgID": obj.imgID,
                            "spriteName": obj.spriteName,
                            "costumeName": obj.costumeName,
                            "imgSrc": obj.imgSrc,
                        }
                }
            },
        },
    },
})

// Action creators are generated for each case reducer function
export const { addCostume } = updateSpriteCostumeMapSlice.actions;

export default updateSpriteCostumeMapSlice.reducer;
