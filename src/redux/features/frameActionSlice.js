import { createSlice } from '@reduxjs/toolkit'

export const frameActionSlice = createSlice({
    name: 'frameAction',
    initialState: {
        value: false,
    },
    reducers: {
        updateFrameAction: (state) => {
            state.value = !state.value;
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateFrameAction } = frameActionSlice.actions

export default frameActionSlice.reducer
