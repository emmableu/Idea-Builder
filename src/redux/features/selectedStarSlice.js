import { createSlice } from '@reduxjs/toolkit'

export const selectedStarSlice = createSlice({
    name: 'selectedStar',
    initialState: {
        value: null,
    },
    reducers: {
        setSelectedStar: (state, action) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSelectedStar } = selectedStarSlice.actions;

export default selectedStarSlice.reducer;
