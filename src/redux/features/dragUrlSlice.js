import { createSlice } from '@reduxjs/toolkit'

export const dragUrlSlice = createSlice({
    name: 'dragUrl',
    initialState: {
        value: null,
    },
    reducers: {
        setDragUrl: (state, action) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDragUrl } = dragUrlSlice.actions;

export default dragUrlSlice.reducer;
