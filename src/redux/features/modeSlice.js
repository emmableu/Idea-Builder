import { createSlice} from '@reduxjs/toolkit'




export const modeSlice = createSlice({
    name: 'modeSlice',
    initialState: {
        value: "edit"
    },
    reducers: {
        updateMode: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export default modeSlice.reducer
