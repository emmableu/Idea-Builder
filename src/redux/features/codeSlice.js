import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import CodeAPI from "../../api/CodeAPI";
import {ProjectDataHandler} from "../../data/ProjectData";
import Cookies from "js-cookie";
import { saveAs } from 'file-saver';



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


const downloadCode = createAsyncThunk(
    'code/downloadCode',
    async (payload, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const project = getState().project.value;
        let longestStoryboardData = {};
        let maxFrameLen = 0
        for  (const s of project.storyboardList){
            if (s.frameList.length > maxFrameLen) {
                longestStoryboardData = s;
                maxFrameLen = s.frameList.length;
            }
        }
        const storyboardData = longestStoryboardData;
        console.log("storyboardData: ", JSON.stringify(storyboardData))
        const actorList = project.actorList;
        const backdropList = project.backdropList;
        const eventList = project.eventList;
        const projectXml = await CodeAPI.getProgram(
            storyboardData, actorList, backdropList, eventList
        );
        console.log("projectXml: ", JSON.stringify(projectXml));
        const blob = new Blob([projectXml], {type: 'application/xml'});
        saveAs(blob, project.name + ".xml");
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
export {getProgram, downloadCode};
export default codeSlice.reducer
