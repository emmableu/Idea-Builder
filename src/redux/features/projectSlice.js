import { createSlice } from '@reduxjs/toolkit'
import {ProjectData} from "../../data/ProjectData";

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        value: null,
    },
    reducers: {
        importProject: {
            reducer: (state, action) => {
                const projectJSON = JSON.parse(action.payload)
                state.value = ProjectData.parse(projectJSON);
                console.log("parsed project: ", state.value);
            }
        },

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
})

// Action creators are generated for each case reducer function
export const { addNewActor, importProject, updateActorName, updateActorOrder,
    deleteActor, addStateToActorStateList, deleteActorState, download} = projectSlice.actions;

export default projectSlice.reducer;
