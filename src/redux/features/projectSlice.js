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

      // addState: {
      //       reducer: (state, action) => {
      //           if (!state.value.hasOwnProperty(action.payload.actorName)){
      //               state.value[action.payload.actorName] = {};
      //           }
      //           state.value[action.payload.actorName][action.payload.stateName] =
      //               {
      //                   imgID: action.payload.imgID,
      //                   imgSrc: action.payload.imgSrc,
      //               };
      //       },
      //       prepare: (text) => {
      //           const obj = JSON.parse(text);
      //           return { payload: {
      //                       "imgID": obj.imgID,
      //                       "actorName": obj.actorName,
      //                       "stateName": obj.stateName,
      //                       "imgSrc": obj.imgSrc,
      //                   }
      //           }
      //       },
      //   },
    },
})

// Action creators are generated for each case reducer function
export const { addNewActor, importProject, updateActorName, updateActorOrder } = projectSlice.actions;

export default projectSlice.reducer;
