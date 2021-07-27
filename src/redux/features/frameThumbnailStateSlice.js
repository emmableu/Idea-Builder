import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ProjectAPI} from "../../api/ProjectAPI";
import {loadProjectFromDatabase, updateStarListInMemory} from "./projectSlice";
import {ProjectData} from "../../data/ProjectData";


const sendFrameImg = createAsyncThunk(
    'frameThumbnailState/sendFrameImg',
    async (payload, thunkAPI) => {
        const {_id, img} = payload;
        const response = await ProjectAPI.sendFrameImg({_id, img});
        return response.status;
    }
)

const sendEmptyFrameImg = createAsyncThunk(
    'frameThumbnailState/sendTransparentFrameImg',
    async (newId, thunkAPI) => {
        const response = await ProjectAPI.sendFrameImg({
            _id: newId,
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=",
        });
        return response.status;
    }
)

const copyPreviousFrameImg = createAsyncThunk(
    'frameThumbnailState/sendTransparentFrameImg',
    async (payload, thunkAPI) => {
        const {prevId, newId} = payload;
        const response = await ProjectAPI.requestCopyFrameImg(
            {
                fromId: prevId,
                toId: newId
            }
        )
        return response.status;
    }
)


export const frameThumbnailStateSlice = createSlice({
    name: 'frameThumbnailState',
    initialState: {
        value: {
            counter: 0,
            userActionCounter: `${Date.now()}-${0}`,
            serverActionCounter: `${Date.now()}-${0}`,
        }
    },
    reducers: {
        updateUserActionCounter: (state, action) => {
            state.value.counter = state.value.counter + 1;
            state.value.userActionCounter = `${Date.now()}-${state.value.counter}`;
        },
        resetUserActionCounter: (state, action) => {
            //must have a prefix, otherwise, resetting does not trigger an automatic update.
            state.value.counter =  0;
            state.value.userActionCounter = `${Date.now()}-${state.value.counter}`;
        }
    },
    extraReducers: {
        [sendFrameImg.fulfilled]: (state, action) => {
            state.value.serverActionCounter = state.value.userActionCounter;
        },
        [sendEmptyFrameImg.fulfilled]: (state, action) => {
            state.value.serverActionCounter = state.value.userActionCounter;
        },
        [copyPreviousFrameImg.fulfilled]: (state, action) => {
            state.value.serverActionCounter = state.value.userActionCounter;
        },
    }
})

// Action creators are generated for each case reducer function
export const { updateUserActionCounter, resetUserActionCounter} = frameThumbnailStateSlice.actions
export {sendFrameImg, sendEmptyFrameImg, copyPreviousFrameImg}
export default frameThumbnailStateSlice.reducer
