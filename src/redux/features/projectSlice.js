import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ProjectData} from "../../data/ProjectData";
import {DashboardAPI} from "../../api/DashboardAPI";
import {DashboardAPIData} from "../../data/DashboardData/DashboardAPIData";
import {ProjectAPI} from "../../api/ProjectAPI";
import Cookies from "js-cookie";

const insertEmptyProjectToDatabase = createAsyncThunk(
    'project/insertNewProjectToDatabase',
    async (text, thunkAPI) => {
        const {newProjectUUID, newProjectName} = JSON.parse(text);
        const projectData = new ProjectData(newProjectUUID, newProjectName);
        const response = await ProjectAPI.insertProject(Cookies.get("userID"), projectData);
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
            reducer: (state) => {
                state.value.addNewActor();
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
                state.value.actorDataMap[action.payload.uuid].name = action.payload.name;
            },
            prepare: (text) => {
              const obj = JSON.parse(text);
              return { payload: {
                          "uuid": obj.uuid,
                          "name": obj.name,
                      }
              }
            },
        },

        addStateToActorStateList: {
            reducer: (state, action) => {
                state.value.actorDataMap[action.payload.actorUUID].addNewState(
                    action.payload.stateUUID
                )
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return { payload: {
                        "actorUUID": obj.actorUUID,
                        "stateUUID": obj.stateUUID,
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
                state.value.deleteActorState(action.payload.actorUUID, action.payload.stateUUID);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return { payload: {
                        "actorUUID": obj.actorUUID,
                        "stateUUID": obj.stateUUID,
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
export {insertEmptyProjectToDatabase, loadProjectFromDatabase};
export default projectSlice.reducer;
