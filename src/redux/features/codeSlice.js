import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import CodeAPI from "../../api/CodeAPI";
import {ProjectDataHandler} from "../../data/ProjectData";
import Cookies from "js-cookie";


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
        CodeAPI.saveCurrentProgram({
            userId: Cookies.get('userId'),
            storyboardId, storyboardName: storyboardData.name, projectXml,
         }).then();
    }
)


export const codeSlice = createSlice({
    name: 'codeSlice',
    initialState: {
        snapXml: "",
        codeModalOpen: false,
        snapWindowLoaded: false,
        codeEvalOpen: false,
    },
    reducers: {
        setSnapXml: (state, action) => {
            state.snapXml = action.payload;
        },
        setCodeModalOpen: (state, action) => {
            state.codeModalOpen = action.payload;
        },
        setSnapWindowLoaded: (state, action) => {
            state.snapWindowLoaded = action.payload;
        },
        setCodeEvalOpen: (state, action) => {
            state.codeEvalOpen = action.payload;
        },
    },
})

export const { setSnapXml, setCodeModalOpen,setSnapWindowLoaded, setCodeEvalOpen} = codeSlice.actions
export {getProgram};
export default codeSlice.reducer
