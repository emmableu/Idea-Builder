import { createSlice} from '@reduxjs/toolkit'



export const modeSlice = createSlice({
    name: 'modeSlice',
    initialState: {
        view: false,
        permanentViewMode: false,
    },
    reducers: {
        setViewMode: (state, action) => {
            if (!state.permanentViewMode) {
                state.view = action.payload
            }
        },
        setPermanentViewMode: (state, action) => {
            state.permanentViewMode = action.payload
            state.view = action.payload
        },
    },
})

export const { setViewMode, setPermanentViewMode } = modeSlice.actions
export default modeSlice.reducer
