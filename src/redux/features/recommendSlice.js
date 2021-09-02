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
        resetRecommend: (state) => {
            state.value.initial = []
        },

        addRecommend: (state, action) => {
            state.value.initial.push(action.payload);
        },

        setSelectedRecommend: (state, action) => {
            state.value.selected = action.payload
        },

        setModifiedRecommend: (state, action) => {
            state.value.selected = action.payload
        },
    },
})

export const { resetRecommend, addRecommend, setSelectedRecommend, setModifiedRecommend } = recommendSlice.actions
export default recommendSlice.reducer
