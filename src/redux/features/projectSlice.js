import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ProjectData} from "../../data/ProjectData";
import {DashboardAPI} from "../../api/DashboardAPI";
import {DashboardAPIData} from "../../data/DashboardData/DashboardAPIData";
import {ProjectAPI} from "../../api/ProjectAPI";
import Cookies from "js-cookie";

const insertEmptyProjectToDatabase = createAsyncThunk(
    'project/insertNewProjectToDatabase',
    async (text, thunkAPI) => {
        const {newProjectId, newProjectName} = JSON.parse(text);
        const projectData = new ProjectData(newProjectId, newProjectName);
        console.log('projectData: ', projectData);
        const response = await ProjectAPI.insertProject(Cookies.get("userID"), projectData);
        return response.status;
    }
)


const addNewActorToDatabase = createAsyncThunk(
    'project/addNewActorToDatabase',
    async (text, thunkAPI) => {
        const response = await ProjectAPI.addNewActorToDatabase(text);
        return response.status;
    }
)


const loadProjectFromDatabase = createAsyncThunk(
    'project/loadProjectFromDatabase',
    async (uuid, thunkAPI) => {
        const response = await ProjectAPI.loadProject(uuid);
        return response.data;
    }
)


export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        value: null,
    },
    reducers: {


        addNewActor: {
            reducer: (state, action) => {
                const {actorDataJSON} = JSON.parse(action.payload)
                state.value.addNewActor(actorDataJSON);
            }
        },

        deleteActor: {
            reducer: (state, action) => {
                delete state.value.actorDataMap[action.payload.uuid];
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return { payload: {
                        "uuid": obj.uuid,
                    }
                }
            },
        },

        updateActorName: {
            reducer: (state, action) => {
                state.value.actorList.find(
                    a => a._id===action.payload._id
                ).name = action.payload.name;
            },
            prepare: (text) => {
              const obj = JSON.parse(text);
              return { payload: {
                          "_id": obj._id,
                          "name": obj.name,
                      }
              }
            },
        },

        addStateToActorStateList: {
            reducer: (state, action) => {
                state.value.actorDataMap[action.payload.actorId].addNewState(
                    action.payload.stateId
                )
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return { payload: {
                        "actorId": obj.actorId,
                        "stateId": obj.stateId,
                    }
                }
            },
        },

        updateActorOrder: {
            reducer: (state, action) => {
                state.value.updateActorOrder(action.payload.beginOrder, action.payload.endOrder);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return { payload: {
                        "beginOrder": obj.beginOrder,
                        "endOrder": obj.endOrder,
                    }
                }
            },
        },

        deleteActorState: {
            reducer: (state, action) => {
                state.value.deleteActorState(action.payload.actorId, action.payload.stateId);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return { payload: {
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
        }

    }
})

// Action creators are generated for each case reducer function
export const { addNewActor, importProject, updateActorName, updateActorOrder,
    deleteActor, addStateToActorStateList, deleteActorState, download} = projectSlice.actions;
export {insertEmptyProjectToDatabase, loadProjectFromDatabase, addNewActorToDatabase};
export default projectSlice.reducer;
