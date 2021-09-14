import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AuthorData, AuthorDataHandler} from "../../data/AuthorData";
import Cookies from "js-cookie"
import {globalLog} from "../../globalConfig";
import {AuthorAPI} from "../../api/AuthorAPI";
import moment from "moment";
// import {AuthorAPIData} from "../../data/AuthorData/AuthorAPIData";




const loadAuthorData = createAsyncThunk(
    'author/loadAuthorData',
    async (payload, thunkAPI) => {
        console.log("tunk", thunkAPI);
        const {getState, dispatch, rejectWithValue} = thunkAPI;
        const state = getState();
        const projectId = state.project.value._id;
        const lastLoaded = state.author.value.lastLoaded;
        const authorRes = await AuthorAPI.loadAuthorData(projectId);
        const {lastModified, lastModifiedBy} = AuthorDataHandler.parse(authorRes.data)
        console.log("authordata", lastModified, lastModifiedBy, lastLoaded)
        if (lastModifiedBy !== Cookies.get("userId")
            && lastModified > lastLoaded
        ) {
            return rejectWithValue(`Modified by another user ${lastModifiedBy} at ${lastModified}, last loaded time ${lastLoaded}`)
        }
        else {
            return "OK"
        }
    }
)


const updateLastModified = createAsyncThunk(
    'author/updateLastModified',
    async (payload, thunkAPI) => {
        const {getState, dispatch, rejectWithValue} = thunkAPI;
        const state = getState();
        const _id = state.project.value._id;
        const lastModified = moment().format();
        const lastModifiedBy = Cookies.get("userId");
        const response = await AuthorAPI.updateLastModified({
            _id, lastModified, lastModifiedBy
        })
        return "OK";
    }
)




export const authorSlice = createSlice({
    name: 'author',
    initialState: {
        value: {
            lastLoaded: null,
            needReload: false,
        },
    },
    reducers: {
        setLastLoaded:
            (state, action) => {
                    state.value.lastLoaded = moment().format();
            },
        setNeedReload:
            (state, action) => {
                    state.value.lastLoaded = action.payload;
            },
    },

})


export const { setLastLoaded } = authorSlice.actions;
export {loadAuthorData, updateLastModified};
export default authorSlice.reducer;
