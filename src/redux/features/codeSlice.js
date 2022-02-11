import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import CodeAPI from "../../api/CodeAPI";
import {ProjectDataHandler} from "../../data/ProjectData";
import scratchblocks from "scratchblocks";


const getProgram = createAsyncThunk(
    'code/getProgram',
    async (storyboardId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const project = getState().project.value;
        const storyboardData = ProjectDataHandler.getStoryboard(project, storyboardId);
        const actorList = project.actorList;
        const backdropList = project.backdropList;
        const eventList = project.eventList;
        const projectXml = await CodeAPI.getProgram(
            storyboardData, actorList, backdropList, eventList
        );
        dispatch(setSnapXml(projectXml));
    }
)


export const codeSlice = createSlice({
    name: 'codeSlice',
    initialState: {
        snapXml: "",
        codeModalOpen: false,
    },
    reducers: {
        setSnapXml: (state, action) => {
            state.snapXml = action.payload;
        },
        setCodeModalOpen: (state, action) => {
            state.codeModalOpen = action.payload;
        },
    },
})

export const { setSnapXml, setCodeModalOpen } = codeSlice.actions
export {getProgram};
export default codeSlice.reducer
