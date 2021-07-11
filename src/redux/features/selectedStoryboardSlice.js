import { createSlice } from '@reduxjs/toolkit'

export const selectedStoryboardSlice = createSlice({
    name: 'selectedStoryboard',
    initialState: {
        value: null,
    },
    reducers: {
        setSelectedStoryboard: (state, action) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSelectedStoryboard } = selectedStoryboardSlice.actions;

export default selectedStoryboardSlice.reducer;
