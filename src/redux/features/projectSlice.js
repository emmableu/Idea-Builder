import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ProjectData} from "../../data/ProjectData";
import {DashboardAPI} from "../../api/DashboardAPI";
import {DashboardAPIData} from "../../data/DashboardData/DashboardAPIData";
import {ProjectAPI} from "../../api/ProjectAPI";
import Cookies from "js-cookie";
import * as UUID from "uuid";
import {ActorData} from "../../data/ActorData";

const insertEmptyProjectToDatabase = createAsyncThunk(
    'project/insertNewProjectToDatabase',
    async (text, thunkAPI) => {
        const {newProjectId, newProjectName} = JSON.parse(text);
        const projectData = new ProjectData(newProjectId, newProjectName);
        console.log('projectData: ', projectData);
        const response = await ProjectAPI.insertProject(Cookies.get("userId"), projectData);
        return response.status;
    }
)


const addActor = createAsyncThunk(
    'project/addActor',
    async (text, thunkAPI) => {
        const {dispatch, getState}  = thunkAPI;
        const actorId = UUID.v4();
        console.log("actorId: ", actorId);
        const actorDataJSON = new ActorData(actorId).toJSON();
        const state = getState();
        const projectId = state.project.value._id;
        const payload =  JSON.stringify({
            projectId,
            actorDataJSON
        });
        dispatch(addActorInMemory(payload));
        const response = await ProjectAPI.addActor(payload);
        return response.status;
    }
)


const loadProjectFromDatabase = createAsyncThunk(
    'project/loadProjectFromDatabase',
    async (_id, thunkAPI) => {
        const response = await ProjectAPI.loadProject(_id);
        return response.data;
    }
)

//
const deleteActor = createAsyncThunk(
    'project/deleteActor',
    async (actorId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(deleteActorInMemory(actorId));
        const state = getState();
        const projectId = state.project.value._id;
        const actorIdList = state.project.value.actorList.map(a=>a._id);
        const response = await ProjectAPI.replaceActorIdListInDatabase({
            projectId, actorIdList
        });
        return response.status;
    }
);

const updateActorOrder = createAsyncThunk(
    'project/updateActorOrder',
    async (text, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(updateActorOrderInMemory(text));
        const state = getState();
        const projectId = state.project.value._id;
        const actorIdList = state.project.value.actorList.map(a=>a._id);
        const response = await ProjectAPI.replaceActorIdListInDatabase({
            projectId, actorIdList
        });
        return response.status;
    }
);

const updateName = createAsyncThunk(
    'project/updateName',
    async (name, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(updateNameInMemory(name));
        const projectId = getState().project.value._id;
        const response = await ProjectAPI.updateName({
            projectId, name
        });
        return response.status;
    }
);

const updateActorName = createAsyncThunk(
    'project/updateActorName',
    async (payload, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(updateActorNameInMemory(JSON.stringify(payload)));
        const response = await ProjectAPI.updateActorName(payload);
        return response.status;
    }
);
const addState = createAsyncThunk(
    'project/addState',
    async (payload, thunkAPI) => {
        const {actorId} = payload
        const {dispatch, getState} = thunkAPI;
        dispatch(addStateInMemory(JSON.stringify(payload)));
        const stateList = getState().project.value.stateListJSON(actorId);
        const response = await ProjectAPI.replaceStateListInDatabase({
            actorId,
            stateList
        });
        return response.status;
    }
);

const updateStateName = createAsyncThunk(
    'project/updateStateName',
    async (payload, thunkAPI) => {
        const {actorId} = payload
        const {dispatch, getState} = thunkAPI;
        dispatch(updateStateNameInMemory(JSON.stringify(payload)));
        const stateList = getState().project.value.stateListJSON(actorId);
        const response = await ProjectAPI.replaceStateListInDatabase({
            actorId,
            stateList
        });
        return response.status;
    }
);

const deleteActorState = createAsyncThunk(
    'project/deleteActorState',
    async (payload, thunkAPI) => {
        const {actorId} = payload
        const {dispatch, getState} = thunkAPI;
        dispatch(deleteActorStateInMemory(JSON.stringify(payload)));
        const stateList = getState().project.value.stateListJSON(actorId);
        const response = await ProjectAPI.replaceStateListInDatabase({
            actorId,
            stateList
        });
        return response.status;
    }
);


export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        value: null,
    },
    reducers: {
        addActorInMemory: {
            reducer: (state, action) => {
                const {actorDataJSON} = JSON.parse(action.payload);
                state.value.addActor(actorDataJSON);
            }
        },

        deleteActorInMemory: {
            reducer: (state, action) => {
                state.value.actorList.splice(action.payload, 1)
            }
        },

        updateNameInMemory: {
            reducer: (state, action) => {
                state.value.name = action.payload;
            }
        },

        updateActorNameInMemory: {
            reducer: (state, action) => {
                state.value.actorList.find(
                    a => a._id === action.payload._id
                ).name = action.payload.name;
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "_id": obj._id,
                        "name": obj.name,
                    }
                }
            },
        },

        updateStateNameInMemory: {
            reducer: (state, action) => {
                const actor = state.value.actorList.find(
                    a => a._id === action.payload.actorId
                )
                const actorState = actor.stateList.find(s => s._id === action.payload.stateId)
                actorState.name = action.payload.stateName;
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "actorId": obj.actorId,
                        "stateId": obj.stateId,
                        "stateName": obj.stateName
                    }
                }
            },
        },

        addStateInMemory: {
            reducer: (state, action) => {
                const actor = state.value.actorList.find(a => a._id === action.payload.actorId);
                actor.addState(
                    action.payload.stateId
                )
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "actorId": obj.actorId,
                        "stateId": obj.stateId,
                    }
                }
            },
        },

        updateActorOrderInMemory: {
            reducer: (state, action) => {
                state.value.updateActorOrder(action.payload.beginOrder, action.payload.endOrder);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "beginOrder": obj.beginOrder,
                        "endOrder": obj.endOrder,
                    }
                }
            },
        },

        deleteActorStateInMemory: {
            reducer: (state, action) => {
                state.value.deleteActorState(action.payload.actorId, action.payload.stateId);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "actorId": obj.actorId,
                        "stateId": obj.stateId,
                    }
                }
            },
        },

        download: {
            reducer: (state) => {
                state.value.download();
            }
        }
    },
    extraReducers: {
        [loadProjectFromDatabase.fulfilled]: (state, action) => {
            state.value = ProjectData.parse(action.payload);
            console.log("parsed project: ", state.value);
        },
    }
});

// Action creators are generated for each case reducer function
export const { addActorInMemory, importProject, updateNameInMemory, updateActorNameInMemory, updateActorOrderInMemory,deleteActorInMemory,
      deleteActorStateInMemory, addStateInMemory, updateStateNameInMemory, download} = projectSlice.actions;
export {insertEmptyProjectToDatabase, loadProjectFromDatabase, addActor, updateActorName, updateName, deleteActor,
        deleteActorState, updateStateName, addState, updateActorOrder,
            };
export default projectSlice.reducer;
