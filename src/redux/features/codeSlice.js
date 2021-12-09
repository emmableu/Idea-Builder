import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import CodeAPI from "../../api/CodeAPI";
import {ProjectDataHandler} from "../../data/ProjectData";
import scratchblocks from "scratchblocks";


const getActorCodeList = createAsyncThunk(
    'code/getActorCodeList',
    async (storyboardId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const project = getState().project.value;
        const storyboardData = ProjectDataHandler.getStoryboard(project, storyboardId);
        const actorList = project.actorList;
        const backdropList = project.backdropList;
        const eventList = project.eventList;
        const response = await CodeAPI.getActorCodeList(
            storyboardData, actorList, backdropList, eventList
        );
        if (response.status === 200) {
            dispatch(setActorCodeList(response.data.actorCodeList))
            dispatch(setCodeModalOpen(true));
            setTimeout(() => {
                scratchblocks.renderMatching("pre.blocks", {
                style:     'scratch3',   // Optional, defaults to 'scratch2'.
                languages: ['en'], // Optional, defaults to ['en'].
                scale: 0.7,                // Optional, defaults to 1
            })}, 500);
        }
    }
)


export const codeSlice = createSlice({
    name: 'codeSlice',
    initialState: {
        actorCodeList: [],
        codeModalOpen: false,
    },
    reducers: {
        setActorCodeList: (state, action) => {
            state.actorCodeList = action.payload;
        },
        setCodeModalOpen: (state, action) => {
            state.codeModalOpen = action.payload;
        },
    },
})

export const { setActorCodeList, setCodeModalOpen } = codeSlice.actions
export {getActorCodeList};
export default codeSlice.reducer
