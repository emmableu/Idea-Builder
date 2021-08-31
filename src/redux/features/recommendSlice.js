import { createSlice} from '@reduxjs/toolkit'



export const recommendSlice = createSlice({
    name: 'recommendSlice',
    initialState: {
        value: {
            initial: [],
            selected: null,
        },
    },
    reducers: {
        addRecommend: (state, action) => {
            state.value.initial.push(action.payload);
        },

        setCacheValue: (state, action) => {
            state.value.selected = action.payload
        },
    },
})

export const { addRecommend, setCacheValue } = recommendSlice.actions
export default recommendSlice.reducer
