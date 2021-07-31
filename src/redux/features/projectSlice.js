import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ProjectDataHandler} from "../../data/ProjectData";
import {StoryboardDataHandler} from "../../data/StoryboardData";
import {ProjectAPI} from "../../api/ProjectAPI";
import Cookies from "js-cookie";
import * as UUID from "uuid";
import {ActorDataHandler} from "../../data/ActorData";
import {BackdropDataHandler} from "../../data/BackdropData";
import globalConfig from "../../globalConfig";
import {
    copyPreviousFrameImg,
    resetUserActionCounter,
    sendEmptyFrameImg,
    updateUserActionCounter
} from "./frameThumbnailStateSlice";
import {FrameDataHandler} from "../../data/FrameData";
import {SelectedIdDataHandler} from "../../data/SelectedIdData";
import {StarDataHandler} from "../../data/StarData";


const insertEmptyProjectToDatabase = createAsyncThunk(
    'project/insertNewProjectToDatabase',
    async (obj, thunkAPI) => {
        const {_id, name} = obj;
        const projectData = ProjectDataHandler.initializeProject({_id, name});
        console.log('projectData: ', projectData);
        const response = await ProjectAPI.insertProject(Cookies.get("userId"), projectData);
        return response.status;
    }
)

const loadProjectFromDatabase = createAsyncThunk(
    'project/loadProjectFromDatabase',
    async (_id, thunkAPI) => {
        const response = await ProjectAPI.loadProject(_id);
        const {dispatch} = thunkAPI;
        dispatch(loadProjectInMemory(response.data));
        // dispatch(updateUserActionCounter());
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

/* The next section are about selectedIds:
 */

const setSelectedStoryboardId = createAsyncThunk(
    'project/setSelectedStoryboardId',
    async (storyboardId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const project = getState().project.value;
        const storyboardData = ProjectDataHandler.getStoryboard(project, storyboardId);

        dispatch(setSelectedStoryboardIdInMemory(storyboardData));

        if (storyboardData.frameList.length > 0){
            dispatch(setSelectedFrameIdInMemory(storyboardData.frameList[0]._id));
        }
        dispatch(resetUserActionCounter());
        const response = await ProjectAPI.updateSelectedIdData(
            {
                projectId: project._id,
                selectedId: project.selectedId
                }
            );
        return response.status;
    }
);


const setSelectedFrameId = createAsyncThunk(
    'project/setSelectedFrameId',
    async (frameId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const project = getState().project.value;
        dispatch(setSelectedFrameIdInMemory(frameId));
        dispatch(resetUserActionCounter());
        const response = await ProjectAPI.updateSelectedIdData(
            {
                projectId: project._id,
                selectedId: project.selectedId
            }
        );
        return response.status;
    }
);


const setSelectedStarId = createAsyncThunk(
    'project/setSelectedStarId',
    async (starId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const prevStarId = getState().project.value.selectedId.starId;
        if (prevStarId !== starId) {
            dispatch(setSelectedStarIdInMemory(starId));
            dispatch(updateUserActionCounter());
            const project = getState().project.value;
            const response = await ProjectAPI.updateSelectedIdData(
                {
                    projectId: project._id,
                    selectedId: project.selectedId
                }
            );
            return response.status;
        }
        return "OK";
    }
);


/* The next section are about storyboards:
 */

const addStoryboard = createAsyncThunk(
    'project/addStoryboard',
    async (text, thunkAPI) => {
        const {storyboardName, type} = text;
        const {dispatch, getState}  = thunkAPI;
        const storyboardId = UUID.v4();
        const storyboardDataJSON = StoryboardDataHandler.initializeStoryboard(storyboardId, storyboardName);
        const state = getState();
        const project = state.project.value;
        const projectId = project._id;
        const payload =  {
            projectId,
            type,
            storyboardDataJSON
        };
        const newFrameId = storyboardDataJSON.frameList[0]._id;
        console.log("newFrameId: ", newFrameId);
        await dispatch(sendEmptyFrameImg(newFrameId));
        dispatch(addStoryboardInMemory(JSON.stringify(payload)));
        console.log("storyboardJSON: ", storyboardDataJSON);
        const response = await ProjectAPI.addStoryboard(payload);
        return response.status;
    }
)

const deleteStoryboard = createAsyncThunk(
    'project/deleteStoryboard',
    async (storyboardId, thunkAPI) => {
        console.log("storyboardID: ", storyboardId);
        const {dispatch, getState} = thunkAPI;
        const state = getState();
        const project = state.project.value;
        const projectId = project._id;
        const storyboardMenu = state.project.value.storyboardMenu;
        project.selectedId.voidStoryboardId();
        dispatch(deleteStoryboardInMemory(storyboardId));
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
        const {dispatch, getState} = thunkAPI;
        const project = getState().project.value;
        console.log("project: ", project);
        const storyboardId = project.selectedId.storyboardId;
        console.log("storyboardId: ", storyboardId);
        const frameList = ProjectDataHandler.getStoryboard(project, storyboardId).frameList;
        console.log("frameList: ", frameList);
        let prevIndex = frameList.length - 1
        const frameId = globalConfig.imageServer.student.frame + UUID.v4() + ".png";
        if (prevIndex >= 0) {
            await dispatch(copyPreviousFrameImg({
                prevId: frameList[prevIndex]._id,
                newId: frameId}));
        }
        else {
            await dispatch(
                sendEmptyFrameImg(
                    frameId
                )
            )
        }

        console.log("frameId: ", frameId);
        dispatch(addFrameInMemory(JSON.stringify({
            storyboardId,
            prevIndex,
            newId: frameId,
        })));
        dispatch(setSelectedFrameId(frameId));
        const newFrameList = ProjectDataHandler.getStoryboard(getState().project.value, storyboardId).frameList;
        console.log("newFrameList: ", newFrameList);
        const response = await ProjectAPI.insertFrameAndReplaceFrameListInDatabase({
            storyboardId,
            frameId,
            frameList: newFrameList,
        });
        return response.status;
    }
);

const deleteFrame = createAsyncThunk(
    'project/deleteFrame',
    async (frameIndex, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;


        const project = getState().project.value;
        const storyboardId = project.selectedId.storyboardId;
        dispatch(updateFrameListInMemory(JSON.stringify(
            {storyboardId,
                    frameIndex
            }
        )));

        const response = await ProjectAPI.replaceFrameIdListInDatabase({
            storyboardId,
            frameIdList: ProjectDataHandler.getStoryboard(project, storyboardId).frameList.map(f => f._id)
        });
        return response.status;
    }
);

/* The next section are about stars on the frame */
const addStar = createAsyncThunk(
    'project/addStar',
    async (obj, thunkAPI) => {
        const {actorId, stateId} = obj;
        const {dispatch, getState} = thunkAPI;
        const state = getState();
        const storyboardId = state.project.value.selectedId.storyboardId;
        const frameId = state.project.value.selectedId.frameId
        console.log("storyboardId: ", storyboardId)
        console.log("frameId: ", frameId)
        if (storyboardId === null || frameId === null) {return;}
        if (storyboardId === "UNDEFINED" || frameId === "UNDEFINED") {return;}
        dispatch(addStarInMemory({
            storyboardId, frameId, actorId, stateId,
        }));
        setTimeout(() => {
            dispatch(updateUserActionCounter());
        }, 100);
        const storyboardData = ProjectDataHandler.getStoryboard(state.project.value, storyboardId);
        const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
        const starList =  frameData.starList;

        //sometimes the first dispatch does not work, because the actor is not yet fully updated on the canvas.
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
        const {storyboardId, frameId, starData} = JSON.parse(payload);
        const {dispatch, getState} = thunkAPI;
        dispatch(updateStarListInMemory(payload));
        const state = getState();
        // why we need a 100 timeout: konva needs time to render the updated stage. It only make sense for it to send updates when it's done.
        setTimeout(() => {
            dispatch(updateUserActionCounter());
        }, 100);
        const storyboardData = ProjectDataHandler.getStoryboard(state.project.value, storyboardId);
        const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
        const starList =  frameData.starList;
        const response = await ProjectAPI.replaceStarListInDatabase({
            frameId,
            starList: starList
        });
        return response.status;
    }
);


const deleteStar = createAsyncThunk(
    'project/updateStarList',
    async (obj, thunkAPI) => {
        const {storyboardId, frameId, starId} = obj;
        const {dispatch, getState} = thunkAPI;
        const state = getState();
        dispatch(setSelectedStarIdInMemory("UNDEFINED"));
        dispatch(deleteStarInMemory({
            storyboardId, frameId, starId
        }));
        dispatch(updateUserActionCounter());
        const storyboardData = ProjectDataHandler.getStoryboard(state.project.value, storyboardId);
        const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
        const starList =  frameData.starList;
        const response = await ProjectAPI.replaceStarListInDatabase({
            frameId,
            starList: starList
        });
        return response.status;
    }
);

const copyStar = createAsyncThunk(
    'project/updateStarList',
    async (obj, thunkAPI) => {
        const {
            storyboardId,
            frameId,
            selectedStar,
        } = obj;
        const {dispatch, getState} = thunkAPI;
        const newStarId = UUID.v4();
        dispatch(copyStarInMemory({
            storyboardId, frameId, selectedStar, newStarId,
        }));
        dispatch(setSelectedStarIdInMemory(newStarId));
        setTimeout(() => {
            dispatch(updateUserActionCounter());
        }, 100);
        const storyboardData = ProjectDataHandler.getStoryboard(getState().project.value, storyboardId);
        const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
        const starList =  frameData.starList;
        const response = await ProjectAPI.replaceStarListInDatabase({
            frameId,
            starList: starList
        });
        return response.status;
    }
);


const addChildStar = createAsyncThunk(
    'project/updateStarList',
    async (obj, thunkAPI) => {
        const {
            storyboardId, frameId,
            starId,
            childStarPrototypeId,
            type,
        } = obj;
        console.log("addchildstar: ", starId);
        const {dispatch, getState} = thunkAPI;
        const childStarId = UUID.v4();
        dispatch(addChildStarInMemory({
            ...obj,
            childStarId
        }));
        setTimeout(() => {
            dispatch(updateUserActionCounter());
        }, 100);
        const storyboardData = ProjectDataHandler.getStoryboard(getState().project.value, storyboardId);
        const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
        const starList =  frameData.starList;
        const response = await ProjectAPI.replaceStarListInDatabase({
            frameId,
            starList: starList
        });
        return response.status;
    }
);


/* The next section are about backdrop stars on on the frame */
const addBackdropStar = createAsyncThunk(
    'project/addBackdropStar',
    async (prototypeId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const state = getState();
        const storyboardId = state.project.value.selectedId.storyboardId;
        const frameId = state.project.value.selectedId.frameId
        if (storyboardId === null || frameId === null) {return;}
        if (storyboardId === "UNDEFINED" || frameId === "UNDEFINED") {return;}
        const backdropStar = {
            "_id": UUID.v4(),
            "prototypeId": prototypeId,
        };
        dispatch(addBackdropStarInMemory({
            storyboardId, frameId, backdropStar,
        }));
        //the stage needs time to update the frame, so this update user action counter will fire another time to ensure it is triggered after the frame backdrop is updated.
        setTimeout(() => {
            dispatch(updateUserActionCounter());
        }, 100);
        setTimeout(() => {
            dispatch(updateUserActionCounter());
        }, 500);
        const response = await ProjectAPI.replaceBackdropStarInDatabase({
            frameId,
            backdropStar
        });
        return response.status;
    }
);


/* The next section are about template stars on on the frame */
const addTemplateStar = createAsyncThunk(
    'project/addBackdropStar',
    async (templateId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const state = getState();
        const storyboardId = state.project.value.selectedId.storyboardId;
        const frameId = state.project.value.selectedId.frameId
        console.log("storyboardId: ", storyboardId)
        console.log("frameId: ", frameId)
        if (storyboardId === null || frameId === null) {return;}
        if (storyboardId === "UNDEFINED" || frameId === "UNDEFINED") {return;}
        dispatch(addTemplateStarInMemory(JSON.stringify({
            storyboardId, frameId, templateId,
        })));
        dispatch(updateUserActionCounter());

        return "OK";
    }
);


/* The next section are about actors:
 */

const addActor = createAsyncThunk(
    'project/addActor',
    async (obj, thunkAPI) => {
        // const {stateList} = obj;
        const {dispatch, getState}  = thunkAPI;
        const actorId = UUID.v4();
        console.log("actorId: ", actorId);
        const actorDataJSON = ActorDataHandler.initializeActor(obj);
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
        const stateList = ProjectDataHandler.stateList(getState().project.value, actorId);
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
        const stateList = ProjectDataHandler.stateList(getState().project.value, actorId);
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
        const stateList = ProjectDataHandler.stateList(getState().project.value, actorId);
        const response = await ProjectAPI.replaceStateListInDatabase({
            actorId,
            stateList
        });
        return response.status;
    }
);


// The next session is about backdrops

const addBackdrop = createAsyncThunk(
    'project/addBackdrop',
    async (backdropId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const projectId = getState().project.value._id;
        dispatch(addBackdropInMemory(
                backdropId)
        );
        const backdropList = getState().project.value.backdropList;
        const response = await ProjectAPI.replaceBackdropListInDatabase({
            projectId, backdropList
        });
        return response.status;
    }
);

const deleteBackdrop = createAsyncThunk(
    'project/deleteBackdrop',
    async (backdropId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const projectId = getState().project.value._id;
        dispatch(deleteBackdropInMemory(
            backdropId)
        );
        const backdropList = getState().project.value.backdropList;
        const response = await ProjectAPI.replaceBackdropListInDatabase({
            projectId, backdropList
        });
        return response.status;
    }
);

const updateBackdropName = createAsyncThunk(
    'project/updateStateName',
    async (payload, thunkAPI) => {
        const {backdropId, backdropName} = payload
        const {dispatch, getState} = thunkAPI;
        const projectId = getState().project.value._id;
        dispatch(updateBackdropNameInMemory(JSON.stringify({
            backdropId, backdropName
        })));
        const backdropList = getState().project.value.backdropList;
        const response = await ProjectAPI.replaceBackdropListInDatabase({
            projectId, backdropList
        });
        return response.status;
    }
);

const saveNote = createAsyncThunk(
    'project/saveNote',
    async (text, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(saveNoteInMemory(text));
        const storyboardId = getState().project.value.selectedId.storyboardId;
        const response = await ProjectAPI.saveNote({
            storyboardId,
           text
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

        loadProjectInMemory: {
            reducer: (state, action) => {
                console.log("action payload", action.payload);
                state.value = ProjectDataHandler.initializeProject(action.payload);
                console.log("parsed project: ", state.value);
            },
        },

        updateNameInMemory: {
            reducer: (state, action) => {
                state.value.name = action.payload;
            }
        },

        setMode: {
            reducer: (state, action) => {
                state.value.mode = action.payload;
            }
        },

        setSelectedStoryboardIdInMemory: {
            reducer: (state, action) => {
                SelectedIdDataHandler.setStoryboardId(state.value.selectedId, action.payload);
            }
        },

        setSelectedFrameIdInMemory : {
            reducer: (state, action) => {
                SelectedIdDataHandler.setFrameId(state.value.selectedId, action.payload);
            }
        },

        setSelectedStarIdInMemory : {
            reducer: (state, action) => {
                SelectedIdDataHandler.setStarId(state.value.selectedId, action.payload);
            }
        },

        /* The next section are about storyboards:
        */

        addStoryboardInMemory: {
            reducer: (state, action) => {
                const {type, storyboardDataJSON} = JSON.parse(action.payload);
                ProjectDataHandler.addStoryboard(state.value, type, storyboardDataJSON);
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
                const storyboardData = state.value.storyboardList[storyboardIndex];
                for (const frameId of storyboardData.frameList) {
                    const templateIndex = state.value.templateList.indexOf(frameId);
                    if (templateIndex !== -1) {
                        state.value.templateList.splice(templateIndex, 1);
                    }
                }
                state.value.storyboardList.splice(storyboardIndex, 1);
            }
        },

        updateStoryboardOrderInMemory: {
            reducer: (state, action) => {
                ProjectDataHandler.updateStoryboardOrder(state.value, action.payload);
            },
        },

        updateStoryboardNameInMemory: {
            reducer: (state, action) => {
                const {_id, name} = action.payload;
                ProjectDataHandler.updateStoryboardName(
                    state.value, _id, name
                )
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
                const storyboard = ProjectDataHandler.getStoryboard(state.value, action.payload.storyboardId);
                StoryboardDataHandler.addFrame(
                    storyboard,
                    action.payload.newId,
                    action.payload.prevIndex,
                )
                state.value.templateList.unshift(action.payload.newId);
                console.log("storyboard!!!!!!!!!!!!!!!!!!!!!!: ", storyboard);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "storyboardId": obj.storyboardId,
                        "prevIndex": obj.prevIndex,
                        "newId": obj.newId,
                    }
                }
            },
        },

        updateFrameListInMemory: {
            reducer: (state, action) => {
                const {storyboardId, frameIndex} = JSON.parse(action.payload);
                // const storyboard = state.value.getStoryboard(storyboardId);
                // storyboard.frameList = frameList;
                const frameList = ProjectDataHandler.getStoryboard(state.value, storyboardId).frameList;
                const frameId = frameList[frameIndex]._id;
                const templateIndex = state.value.templateList.indexOf(frameId);
                state.value.templateList.splice(templateIndex, 1);

                console.log("frameList!!!!!!!!!!!!!!!!!!!!!!: ", frameList);

                frameList.splice(frameIndex, 1);
            }
        },



        /* the next section is about stars */

        addStarInMemory: {
            reducer: (state, action) => {
                const {storyboardId, frameId, actorId, stateId} = action.payload;
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId);
                const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
                FrameDataHandler.addStar(frameData, actorId, stateId);
            },
        },

        addChildStarInMemory: {
            reducer: (state, action) => {
                console.log("inside add child star in memory");
                const {storyboardId, frameId, starId, childStarId, childStarPrototypeId, type} = action.payload;
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId);
                const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
                const starData = frameData.starList.find(s => s._id === starId);
                starData.childStarList.push(
                    StarDataHandler.initializeChildStar({
                      prototypeId: childStarPrototypeId,
                        parentStarId: starId,
                        _id: childStarId,
                        type: type,
                        width: 300,
                    })
                )
                console.log("star data after adding: ", starData);
                console.log("project data after adding: ", state.value);
            }
        },



        updateStarListInMemory: {
            reducer: (state, action) => {
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, action.payload.storyboardId);
                const frame = StoryboardDataHandler.getFrame(storyboardData, action.payload.frameId);
                const starIndex = frame.starList.findIndex(s => s._id === action.payload.starData._id);
                console.log("starIndex: ", starIndex);
                if (starIndex !== -1) {
                    frame.starList[starIndex] =  action.payload.starData;
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


        deleteStarInMemory: {
            reducer: (state, action) => {
                const {storyboardId, frameId, starId} = action.payload;
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId);
                const frame = StoryboardDataHandler.getFrame(storyboardData, frameId);
                FrameDataHandler.deleteStar(frame, starId);
            },
        },


        copyStarInMemory: {
            reducer: (state, action) => {
                const {storyboardId, frameId, selectedStar, newStarId,} = action.payload
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId);
                const frame = StoryboardDataHandler.getFrame(storyboardData, frameId);
                FrameDataHandler.copyStar(frame, selectedStar, newStarId);
            },
        },


        addBackdropStarInMemory: {
            reducer: (state, action) => {
                const {storyboardId, frameId, backdropStar} = action.payload;
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId);
                const frame = StoryboardDataHandler.getFrame(storyboardData, frameId);
                frame.backdropStar = backdropStar;
            },
        },

        addTemplateStarInMemory: {
            reducer: (state, action) => {
                const {storyboardId, frameId, templateId} = action.payload;
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId);
                const frame = StoryboardDataHandler.getFrame(storyboardData, frameId);
                const templateFrame = ProjectDataHandler.findFrame(state.value, templateId);
                FrameDataHandler.acquireFrame(frame, templateFrame);
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "storyboardId": obj.storyboardId,
                        "frameId": obj.frameId,
                        "templateId": obj.templateId,
                    }
                }
            },
        },


        /* The next section are about actors:
        */

        addActorInMemory: {
            reducer: (state, action) => {
                const {actorDataJSON} = JSON.parse(action.payload);
                ProjectDataHandler.addActor(state.value, actorDataJSON);
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
                ProjectDataHandler.updateActorOrder(state.value, action.payload.beginOrder, action.payload.endOrder);
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
                ActorDataHandler.addState(
                    actor,
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
                ProjectDataHandler.deleteState(state.value, action.payload.actorId, action.payload.stateId);
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

        /* The next section are about backdrops:
        */


        addBackdropInMemory: {
            reducer: (state, action) => {
                state.value.backdropList.push(BackdropDataHandler.initializeBackdrop(action.payload))
            }
        },

        deleteBackdropInMemory: {
            reducer: (state, action) => {
                const backdropIndex = state.value.backdropList.findIndex(b => b._id === action.payload);
                state.value.backdropList.splice(backdropIndex, 1);
            }
        },

        updateBackdropNameInMemory: {
            reducer: (state, action) => {
                const backdropIndex = state.value.backdropList.findIndex(s => s._id === action.payload.backdropId);
                state.value.backdropList[backdropIndex].name = action.payload.backdropName;
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "backdropId": obj.backdropId,
                        "backdropName": obj.backdropName,
                    }
                }
            },
        },



        /* The next section are about textData in the panels:
        */

        addSpeechBubbleInMemory: {
            reducer: (state, action) => {
                // payload looks like {type: "message" | "say"}
                state.value.speechBubbleList.push({
                    _id: globalConfig.imageServer.text.frame + UUID.v4() + ".png",
                    who: action.payload.who,
                    name: ""
                });
            }
        },

        deleteSpeechBubbleInMemory: {
            reducer: (state, action) => {
                const textIndex = state.value.speechBubbleList.findIndex(b => b._id === action.payload);
                state.value.speechBubbleList.splice(textIndex, 1);
            }
        },

        updateSpeechBubbleNameInMemory: {
            reducer: (state, action) => {
                // payload looks like {"_id": id , "name": name}
                const textIndex = state.value.speechBubbleList.findIndex(s => s._id === action.payload._id);
                state.value.speechBubbleList[textIndex].name = action.payload.name;
            },
        },


        updateSpeechBubbleWhoInMemory: {
            reducer: (state, action) => {
                // payload looks like {"_id": id , "name": name}
                const textIndex = state.value.speechBubbleList.findIndex(s => s._id === action.payload._id);
                state.value.speechBubbleList[textIndex].who = action.payload.who;
            },
        },


        addResourceInMemory: {
            reducer: (state, action) => {
                // no action is needed
                state.value.resourceList.push({
                    _id: globalConfig.imageServer.resource.frame + UUID.v4() + ".png",
                    name: ""
                });
            }
        },

        deleteResourceInMemory: {
            reducer: (state, action) => {
                const resourceIndex = state.value.resourceList.findIndex(b => b._id === action.payload);
                state.value.resourceList.splice(resourceIndex, 1);
            }
        },

        updateResourceValueInMemory: {
            reducer: (state, action) => {
                // payload looks like {"_id": id , "value": value}
                const resourceIndex = state.value.resourceList.findIndex(s => s._id === action.payload._id);
                state.value.resourceList[resourceIndex].name = action.payload.value;
            },
        },






        saveNoteInMemory: {
          reducer: (state, action) => {
              state.value.note = action.payload
          }
        },



        download: {
            reducer: (state) => {
                ProjectDataHandler.download(state.value);
            }
        }
    },
});

// Action creators are generated for each case reducer function
export const {
    loadProjectInMemory, updateNameInMemory, setMode,//project
    setSelectedFrameIdInMemory, setSelectedStoryboardIdInMemory, setSelectedStarIdInMemory, //selectedId
    addStoryboardInMemory, deleteStoryboardInMemory, updateStoryboardOrderInMemory, updateStoryboardNameInMemory, //storyboard
    addStarInMemory, updateStarListInMemory, deleteStarInMemory, copyStarInMemory,addChildStarInMemory, //star
    addBackdropStarInMemory, //backdropStar
    addTemplateStarInMemory, //templateStar
    addSpeechBubbleInMemory, deleteSpeechBubbleInMemory, updateTextNameInMemory, //text ==> todo: delete these at some point
    addResourceInMemory, deleteResourceInMemory, updateResourceValueInMemory, //resource
    addFrameInMemory, updateFrameListInMemory, //frame
    addActorInMemory, deleteActorInMemory, updateActorOrderInMemory, updateActorNameInMemory, //actor
    addStateInMemory, deleteStateInMemory, updateStateNameInMemory, //state
    addBackdropInMemory, deleteBackdropInMemory, updateBackdropNameInMemory, //backdrop
    saveNoteInMemory, //note
    download,
} = projectSlice.actions;
export {
    insertEmptyProjectToDatabase, loadProjectFromDatabase, updateName, //project
    setSelectedStoryboardId, setSelectedFrameId, setSelectedStarId, //selectedId
    addStoryboard, deleteStoryboard, updateStoryboardOrder, updateStoryboardName, //storyboard
    addFrame, deleteFrame, //frame
    addStar, updateStarList, deleteStar, copyStar, addChildStar, //star
    addBackdropStar, //backdropStar
    addTemplateStar, //templateSar,
    addActor, deleteActor, updateActorOrder, updateActorName, //actor
    addState, deleteState, updateStateName, //state
    addBackdrop, deleteBackdrop, updateBackdropName, //backdrop
    saveNote, //note
};
export default projectSlice.reducer;
