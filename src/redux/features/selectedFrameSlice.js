import { createSlice } from '@reduxjs/toolkit'

export const selectedFrameSlice = createSlice({
    name: 'selectedFrame',
    initialState: {
        value: {
            _id: null,
            imgLoaded: false
        },
    },
    reducers: {
        setSelectedFrameId: (state, action) => {
            state.value._id = action.payload;
            state.value.imgLoaded = false;
        },
        setSelectedFrameImgAsLoaded: (state) => {
            state.value.imgLoaded = true;
        },

    },
})

// Action creators are generated for each case reducer function
export const { setSelectedFrameId, setSelectedFrameImgAsLoaded } = selectedFrameSlice.actions;

export default selectedFrameSlice.reducer;
