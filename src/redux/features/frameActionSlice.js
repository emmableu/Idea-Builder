import { createSlice } from '@reduxjs/toolkit'

export const frameActionSlice = createSlice({
    name: 'frameAction',
    initialState: {
        value: 0,
    },
    reducers: {
        updateFrameAction: (state) => {
            state.value = state.value + 1;
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateFrameAction } = frameActionSlice.actions

export default frameActionSlice.reducer
