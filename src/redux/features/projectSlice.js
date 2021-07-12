import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ProjectData} from "../../data/ProjectData";
import {StoryboardData} from "../../data/StoryboardData";
import {DashboardAPI} from "../../api/DashboardAPI";
import {DashboardAPIData} from "../../data/DashboardData/DashboardAPIData";
import {ProjectAPI} from "../../api/ProjectAPI";
import Cookies from "js-cookie";
import * as UUID from "uuid";
import {ActorData} from "../../data/ActorData";
import {setSelectedFrameId} from "./selectedFrameSlice";
import {updateFrameAction} from "./frameActionSlice";
import globalConfig from "../../globalConfig";
import {StarData} from "../../data/StarData";

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

const loadProjectFromDatabase = createAsyncThunk(
    'project/loadProjectFromDatabase',
    async (_id, thunkAPI) => {
        const response = await ProjectAPI.loadProject(_id);
        return response.data;
    }
)

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

/* The next section are about storyboards:
 */

const addStoryboard = createAsyncThunk(
    'project/addStoryboard',
    async (type, thunkAPI) => {
        const {dispatch, getState}  = thunkAPI;
        const storyboardId = UUID.v4();
        console.log("storyboardId: ", storyboardId);
        const storyboardDataJSON = new StoryboardData(storyboardId).toJSON();
        console.log("storyboardDataJSON: ", storyboardDataJSON);
        const state = getState();
        const projectId = state.project.value._id;
        const payload =  {
            projectId,
            type,
            storyboardDataJSON
        };
        dispatch(addStoryboardInMemory(JSON.stringify(payload)));
        const response = await ProjectAPI.addStoryboard(payload);
        return response.status;
    }
)

const deleteStoryboard = createAsyncThunk(
    'project/deleteStoryboard',
    async (storyboardId, thunkAPI) => {
        console.log("storyboardID: ", storyboardId);
        const {dispatch, getState} = thunkAPI;
        dispatch(deleteStoryboardInMemory(storyboardId));
        const state = getState();
        const projectId = state.project.value._id;
        const storyboardMenu = state.project.value.storyboardMenu;
        const response = await ProjectAPI.replaceStoryboardIdMenuInDatabase({
            projectId, storyboardMenu
        });
        return response.status;
    }
);

const updateStoryboardOrder = createAsyncThunk(
    'project/updateStoryboardOrder',
    async (text, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        console.log("----------------------text: ", text);
        dispatch(updateStoryboardOrderInMemory(text));
        const state = getState();
        const projectId = state.project.value._id;
        const storyboardMenu = state.project.value.storyboardMenu;
        const response = await ProjectAPI.replaceStoryboardIdMenuInDatabase({
            projectId, storyboardMenu
        });
        return response.status;
    }
);

const updateStoryboardName = createAsyncThunk(
    'project/updateStoryboardName',
    async (payload, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(updateStoryboardNameInMemory(JSON.stringify(payload)));
        const response = await ProjectAPI.updateStoryboardName(payload);
        return response.status;
    }
);

/* The next section are about frames:
 */

const addFrame = createAsyncThunk(
    'project/addFrame',
    async (payload, thunkAPI) => {
        console.log("in thunk");
        const {dispatch, getState} = thunkAPI;
        const storyboardId = getState().selectedStoryboard.value;
        const frameId = globalConfig.imageServer.student.frame + UUID.v4() + ".png";
        console.log("frameId: ", frameId);
        dispatch(addFrameInMemory(JSON.stringify({
            storyboardId, frameId,
        })));
        console.log("after dispatch");
        dispatch(setSelectedFrameId(frameId));
        dispatch(updateFrameAction());
        const frameList = getState().project.value.frameListJSON(storyboardId);
        console.log("===============frameList: ", frameList);
        const response = await ProjectAPI.insertFrameAndReplaceFrameListInDatabase({
            storyboardId,
            frameId,
            frameList,
        });
        return response.status;
    }
);

const deleteFrame = createAsyncThunk(
    'project/deleteFrame',
    async (payload, thunkAPI) => {
        const {storyboardId} = payload
        const {dispatch, getState} = thunkAPI;
        dispatch(deleteFrameInMemory(JSON.stringify(payload)));
        const frameList = getState().project.value.frameListJSON(storyboardId);
        const response = await ProjectAPI.replaceFrameListInDatabase({
            storyboardId,
            frameList
        });
        return response.status;
    }
);

/* The next section are about stars on the frame */
const addStar = createAsyncThunk(
    'project/addStar',
    async (stateId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const state = getState();
        const storyboardId = state.selectedStoryboard.value;
        const frameId = state.selectedFrame.value._id;
        console.log("storyboardId: ", storyboardId)
        console.log("frameId: ", frameId)
        if (storyboardId === null || frameId === null) {return;}
        dispatch(addStarInMemory(JSON.stringify({
            storyboardId, frameId, stateId,
        })));
        dispatch(updateFrameAction());
        const starList = state.project.value.getStoryboard(storyboardId).getFrame(frameId).starListJSON();
        const response = await ProjectAPI.replaceStarListInDatabase({
            frameId,
            starList
        });
        return response.status;
    }
);


const updateStarList = createAsyncThunk(
    'project/updateStarList',
    async (payload, thunkAPI) => {
        console.log("====================================inside update starlist================")
        const {storyboardId, frameId, starData} = JSON.parse(payload);
        const {dispatch, getState} = thunkAPI;
        dispatch(updateStarListInMemory(payload));
        const state = getState();
        console.log("====================================before dispatching updatefrmaeaction================")
        dispatch(updateFrameAction());
        const starList = state.project.value.getStoryboard(storyboardId).getFrame(frameId).starListJSON();
        const response = await ProjectAPI.replaceStarListInDatabase({
            frameId,
            starList: starList
        });
        return response.status;
    }
);



/* The next section are about actors:
 */

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

const deleteActor = createAsyncThunk(
    'project/deleteActor',
    async (actorId, thunkAPI) => {
        console.log("actorID: ", actorId);
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

const updateActorName = createAsyncThunk(
    'project/updateActorName',
    async (payload, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(updateActorNameInMemory(JSON.stringify(payload)));
        const response = await ProjectAPI.updateActorName(payload);
        return response.status;
    }
);

/* The next section are about states:
 */

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

const deleteState = createAsyncThunk(
    'project/deleteState',
    async (payload, thunkAPI) => {
        const {actorId} = payload
        const {dispatch, getState} = thunkAPI;
        dispatch(deleteStateInMemory(JSON.stringify(payload)));
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



export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        value: null,
    },
    reducers: {

        updateNameInMemory: {
            reducer: (state, action) => {
                state.value.name = action.payload;
            }
        },

        /* The next section are about storyboards:
        */

        addStoryboardInMemory: {
            reducer: (state, action) => {
                const {type, storyboardDataJSON} = JSON.parse(action.payload);
                state.value.addStoryboard(type, storyboardDataJSON);
            }
        },

        deleteStoryboardInMemory: {
            reducer: (state, action) =>
            {
                let menuIndex = -1;
                for (const type of ["final", "draft"]) {
                    menuIndex = state.value.storyboardMenu[type].items.findIndex(
                        a => a._id === action.payload
                    )
                    if (menuIndex !== -1) {
                        state.value.storyboardMenu[type].items.splice(menuIndex, 1);
                        break;
                    }
                }
                const storyboardIndex = state.value.storyboardList.findIndex(
                    a => a._id === action.payload
                )
                state.value.storyboardList.splice(storyboardIndex, 1)
            }
        },

        updateStoryboardOrderInMemory: {
            reducer: (state, action) => {
                state.value.updateStoryboardOrder(action.payload)
            },
        },

        updateStoryboardNameInMemory: {
            reducer: (state, action) => {
                const {_id, name} = action.payload;
                state.value.updateStoryboardName(_id, name);
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

        /* The next section are about frames:
        */

        addFrameInMemory: {
            reducer: (state, action) => {
                const storyboard = state.value.getStoryboard(action.payload.storyboardId);
                storyboard.addFrame(
                    action.payload.frameId
                )
                console.log("storyboard!!!!!!!!!!!!!!!!!!!!!!: ", storyboard);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "storyboardId": obj.storyboardId,
                        "frameId": obj.frameId,
                    }
                }
            },
        },

        deleteFrameInMemory: {
            reducer: (state, action) => {
                state.value.deleteFrame(action.payload.storyboardId, action.payload.frameId);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "storyboardId": obj.storyboardId,
                        "frameId": obj.frameId,
                    }
                }
            },
        },

        /* the next section is about stars */

        addStarInMemory: {
            reducer: (state, action) => {
                const frame = state.value.getStoryboard(action.payload.storyboardId).getFrame(action.payload.frameId);
                frame.addStar(action.payload.stateId);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "storyboardId": obj.storyboardId,
                        "frameId": obj.frameId,
                        "stateId": obj.stateId,
                    }
                }
            },
        },


        updateStarListInMemory: {
            reducer: (state, action) => {
                const frame = state.value.getStoryboard(action.payload.storyboardId).getFrame(action.payload.frameId);
                const starIndex = frame.starList.findIndex(s => s._id === action.payload.starData._id);
                console.log("starIndex: ", starIndex);
                if (starIndex !== -1) {
                    frame.starList[starIndex] =  StarData.parse(action.payload.starData);
                }
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "storyboardId": obj.storyboardId,
                        "frameId": obj.frameId,
                        "starData": obj.starData,
                    }
                }
            },
        },

        /* The next section are about actors:
        */

        addActorInMemory: {
            reducer: (state, action) => {
                const {actorDataJSON} = JSON.parse(action.payload);
                state.value.addActor(actorDataJSON);
            }
        },

        deleteActorInMemory: {
            reducer: (state, action) => {
                const actorIndex = state.value.actorList.findIndex(
                    a => a._id === action.payload
                )
                state.value.actorList.splice(actorIndex, 1)
            }
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

        /* The next section are about states:
        */

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

        deleteStateInMemory: {
            reducer: (state, action) => {
                state.value.deleteState(action.payload.actorId, action.payload.stateId);
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

        updateStateNameInMemory: {
            reducer: (state, action) => {
                const actor = state.value.actorList.find(
                    a => a._id === action.payload.actorId
                )
                const stateIndex = actor.stateList.findIndex(s => s._id === action.payload.stateId);
                actor.stateList[stateIndex].name = action.payload.stateName;
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
export const {
    updateNameInMemory, //project
    addStoryboardInMemory, deleteStoryboardInMemory, updateStoryboardOrderInMemory, updateStoryboardNameInMemory, //storyboard
    addStarInMemory, updateStarListInMemory, //star
    addFrameInMemory, deleteFrameInMemory, //frame
    addActorInMemory, deleteActorInMemory, updateActorOrderInMemory, updateActorNameInMemory, //actor
    addStateInMemory, deleteStateInMemory, updateStateNameInMemory, //state
    download,
} = projectSlice.actions;
export {
    insertEmptyProjectToDatabase, loadProjectFromDatabase, updateName, //project
    addStoryboard, deleteStoryboard, updateStoryboardOrder, updateStoryboardName, //storyboard
    addFrame, deleteFrame, //frame
    addStar, updateStarList, //star
    addActor, deleteActor, updateActorOrder, updateActorName, //actor
    addState, deleteState, updateStateName //state
};
export default projectSlice.reducer;
