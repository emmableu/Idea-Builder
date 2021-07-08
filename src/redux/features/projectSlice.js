import { createSlice } from '@reduxjs/toolkit'
import {ProjectData} from "../../data/ProjectData";
import {ProjectDataParser} from "../../data/Parser";

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        value: null,
    },
    reducers: {
        importProject: {
            reducer: (state, action) => {
                const projectJSON = JSON.parse(action.payload)
                const parser = new ProjectDataParser();
                state.value = parser.parse(projectJSON);
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
        }
    },
})

// Action creators are generated for each case reducer function
export const { addNewActor, importProject, updateActorName, updateActorOrder,
    deleteActor, addStateToActorStateList, deleteActorState} = projectSlice.actions;

export default projectSlice.reducer;
