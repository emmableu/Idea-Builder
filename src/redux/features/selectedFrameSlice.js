import { createSlice } from '@reduxjs/toolkit'

export const selectedFrameSlice = createSlice({
    name: 'selectedFrame',
    initialState: {
        value: {
            _id: null,
            imgUpdated: 0
        },
    },
    reducers: {
        setSelectedFrameId: (state, action) => {
            state.value._id = action.payload;
        },
        setSelectedFrameImgAsUpdated: (state) => {
            state.value.imgUpdated = state.value.imgUpdated + 1;
        },

    },
})

// Action creators are generated for each case reducer function
export const { setSelectedFrameId, setSelectedFrameImgAsUpdated } = selectedFrameSlice.actions;

export default selectedFrameSlice.reducer;
