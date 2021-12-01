import { createSlice} from '@reduxjs/toolkit'
import Cookies from "js-cookie";



export const modeSlice = createSlice({
    name: 'modeSlice',
    initialState: {
        view: false,
        permanentViewMode: false,
    },
    reducers: {
        setViewMode: (state, action) => {
            if (Cookies.get('userId') === 'wwang33') {
                return;
            }
            if (!state.permanentViewMode) {
                state.view = action.payload
            }
        },
        setPermanentViewMode: (state, action) => {
            if (Cookies.get('userId') === 'wwang33') {
                return;
            }
            state.permanentViewMode = action.payload
            state.view = action.payload
        },
    },
})

export const { setViewMode, setPermanentViewMode } = modeSlice.actions
export default modeSlice.reducer
