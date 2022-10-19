import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ProjectDataHandler} from "../../data/ProjectData";
import {StoryboardDataHandler} from "../../data/StoryboardData";
import {ProjectAPI} from "../../api/ProjectAPI";
import Cookies from "js-cookie";
import * as UUID from "uuid";
import {ActorDataHandler} from "../../data/ActorData";
import {BackdropDataHandler} from "../../data/BackdropData";
import globalConfig, {globalLog, snapLog} from "../../globalConfig";
import {FrameDataHandler} from "../../data/FrameData";
import {SelectedIdDataHandler} from "../../data/SelectedIdData";
import {StarDataHandler} from "../../data/StarData";
import {setPermanentViewMode} from "./modeSlice";
import {AuthorDataHandler} from "../../data/AuthorData";
import {AuthorAPI} from "../../api/AuthorAPI";
import starterProject from "../../json/starterProject.json"
import {loadAuthorData, setFrozenMode, setLastLoaded, updateLastModified} from "./authorSlice";
import {sampleSize} from "lodash";


const insertEmptyProjectToDatabase = createAsyncThunk(
    'project/insertNewProjectToDatabase',
    async (obj, thunkAPI) => {
        const {_id, name} = obj;
        const project = ProjectDataHandler.deepCopy(starterProject);
        project._id = _id;
        project.name = name;
        project.authorIdList =  [Cookies.get("userId")];
        project.hasCodeList = sampleSize([0,1,2,3,4], 3);
        // const projectData = ProjectDataHandler.initializeProject({_id, authorIdList, name});
        const authorData = AuthorDataHandler.initializeAuthor({_id});
        const response = await ProjectAPI.insertProject(Cookies.get("userId"), project);
        const response2 = await AuthorAPI.insertAuthorData(authorData);
        return response.status;
    }
)


const insertProjectToDatabase = createAsyncThunk(
    'project/insertNewProjectToDatabase',
    async (projectData, thunkAPI) => {
        const {_id} = projectData;
        projectData.authorIdList = [Cookies.get("userId")];
        const authorData = AuthorDataHandler.initializeAuthor({_id});
        const response = await ProjectAPI.insertProject(Cookies.get("userId"), projectData);
        const response2 = await AuthorAPI.insertAuthorData(authorData);
        return response.status;
    }
)

const loadProjectFromDatabase = createAsyncThunk(
    'project/loadProjectFromDatabase',
    async (_id, thunkAPI) => {
        const response = await ProjectAPI.loadProject(_id);
        const {dispatch, getState} = thunkAPI;
        dispatch(loadProjectInMemory(response.data));
        const project = getState().project.value;
        if (project.hasCodeList === undefined) {
            const hasCodeList =  sampleSize([0,1,2,3,4], 3);
            if (project.storyboardMenu.final.items.length > 0) {
                let i =  project.storyboardMenu.final.items.length - 1;
                let cnt = 0;
                while (i >= 0) {
                    const storyboardId =  project.storyboardMenu.final.items[i]._id;
                    const storyboard = project.storyboardList.find((s) => s._id === storyboardId)
                    console.log("storyboard.hasCode: ", storyboard.hasCode)
                    if (storyboard && storyboard.hasCode === undefined) {
                        dispatch(updateStoryboardHasCode({storyboardId, hasCode:hasCodeList.includes(cnt)}))
                        // storyboard.hasCode = (hasCodeList.includes(cnt));
                        console.log("cnt: ", cnt);
                        // console.log("storyboard.hasCode: ", storyboard.hasCode);
                    }
                    cnt += 1;
                    i -= 1
                }
            }

            if (project.storyboardMenu.draft.items.length > 0) {
                let i =  project.storyboardMenu.draft.items.length - 1;
                while (i >= 0) {
                    const storyboardId =  project.storyboardMenu.draft.items[i]._id;
                    const storyboard = project.storyboardList.find((s) => s._id === storyboardId)
                    // console.log("storyboard.hasCode: ", storyboard.hasCode)
                    if (storyboard && storyboard.hasCode === undefined) {
                        // storyboard.hasCode = false;
                        dispatch(updateStoryboardHasCode({storyboardId, hasCode:false}))
                    }
                    i -= 1
                }
            }

            dispatch(updateHasCodeList(hasCodeList));
        }
        const authorIdList = response.data.authorIdList;
        const userId =  Cookies.get("userId");
        if (authorIdList.includes(userId)) {
            dispatch(setPermanentViewMode(false))
        }
        else {
            dispatch(setPermanentViewMode(true))
        }
        dispatch(setLastLoaded());

        return response.data;
    }
)

const shareProject = createAsyncThunk(
    'project/shareProject',
    async (obj, thunkAPI) => {
        const {authorIdList} = obj;
        const {dispatch, getState} = thunkAPI;
        dispatch(setAuthorIdListInMemory(obj));
        const projectId = getState().project.value._id;
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.updateAuthorIdList({
            projectId, authorIdList
        });
        for (const authorId of authorIdList) {
            if (authorId !==  Cookies.get("userId")) {
                const response2 = await ProjectAPI.addEntryToDashboard({authorId,
                    projectId});
            }
        }
        // await dispatch(updateLastModified());
        return response.status;
    }
)


const mergeProject = createAsyncThunk(
    'project/mergeProject',
    async (newProjectData, thunkAPI) => {
        const {dispatch, getState}  = thunkAPI;
        const type = "final";
        const projectId = getState().project.value._id;
        const modifiedProject = ProjectDataHandler.deepCopy(newProjectData);
        for (const storyboardDataJSON of modifiedProject.storyboardList) {
            const payload =  {
                projectId,
                type,
                storyboardDataJSON
            };
            await dispatch(addStoryboardInMemory(JSON.stringify(payload)));
            await ProjectAPI.addStoryboard(payload);
        }
        if (modifiedProject !== null && modifiedProject.actorList.length > 0) {
            for (const actorData of modifiedProject.actorList) {
                dispatch(addActor(actorData));
            }
        }
        if (modifiedProject !== null && modifiedProject.backdropList.length > 0) {
            for (const backdrop of modifiedProject.backdropList) {
                dispatch(addBackdrop(backdrop._id))
            }
        }
        return "OK";
    }
)


const updateName = createAsyncThunk(
    'project/updateName',
    async (name, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(updateNameInMemory(name));
        const projectId = getState().project.value._id;
        /*const isLegalUpdate = await dispatch(loadAuthorData());
        console.log("isLegalUpdate: ", isLegalUpdate);
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.updateName({
            projectId, name
        });
        // await dispatch(updateLastModified());
        return response.status;
    }
);


const updateHasCodeList = createAsyncThunk(
    'project/updateHasCodeList',
    async (hasCodeList, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(updateHasCodeListInMemory(hasCodeList));
        const projectId = getState().project.value._id;
        const response = await ProjectAPI.updateHasCodeList({
            projectId, hasCodeList
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
        if (storyboardId !== null) {
            const storyboardData = ProjectDataHandler.getStoryboard(project, storyboardId);
            dispatch(setSelectedStoryboardIdInMemory(storyboardData));
            if (storyboardData.frameList.length > 0){
                dispatch(setSelectedFrameIdInMemory(storyboardData.frameList[0]._id));
            }
        }
        else {
            dispatch(voidSelectedStoryboardIdInMemory())
        }
        // const isLegalUpdate = await dispatch(loadAuthorData());
        // if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
        //     dispatch(setFrozenMode(true));
        //     return;}
        // const response = await ProjectAPI.updateSelectedIdData(
        //     {
        //         projectId: project._id,
        //         selectedId:  getState().project.value.selectedId
        //         }
        //     );
        // await dispatch(updateLastModified());
        return "OK";
    }
);


const setSelectedFrameId = createAsyncThunk(
    'project/setSelectedFrameId',
    async (frameId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const project = getState().project.value;
        dispatch(setSelectedFrameIdInMemory(frameId));
        // const isLegalUpdate = await dispatch(loadAuthorData());
        // if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
        //     dispatch(setFrozenMode(true));
        //     return;}
        // const response = await ProjectAPI.updateSelectedIdData(
        //     {
        //         projectId: project._id,
        //         selectedId: project.selectedId
        //     }
        // );
        // await dispatch(updateLastModified());
        // return response.status;
        return "OK"
    }
);


const setSelectedStarId = createAsyncThunk(
    'project/setSelectedStarId',
    async (starId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const prevStarId = getState().project.value.selectedId.starId;
        if (prevStarId !== starId) {
            dispatch(setSelectedStarIdInMemory(starId));
            // const project = getState().project.value;
        //     const isLegalUpdate = await dispatch(loadAuthorData());
        // if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
        //     dispatch(setFrozenMode(true));
        //     return;}
        // const response = await ProjectAPI.updateSelectedIdData(
        //         {
        //             projectId: project._id,
        //             selectedId: project.selectedId
        //         }
        //     );
        //     return response.status;
        }
        // await dispatch(updateLastModified());
        return "OK";
    }
);


/* The next section are about storyboards:
 */

const addStoryboard = createAsyncThunk(
    'project/addStoryboard',
    async (text, thunkAPI) => {
        snapLog("addStoryboard", text);
        const {storyboardName, type} = text;
        const {dispatch, getState}  = thunkAPI;
        const storyboardId = UUID.v4();
        const state = getState();
        // console.log("state.value.originalCostumes: ", JSON.stringify(state.recommend.value.originalCostumes));
        // console.log("state.value.currentCostumes: ", JSON.stringify(state.recommend.value.currentCostumes));
        const modified = state.recommend.value.modified;
        const projectId = state.project.value._id;
        let storyboardDataJSON, modifiedProject;
        if (modified === null) {
            modifiedProject = null;
            let hasCode;
            const currentStoryboardLen = state.project.value.storyboardMenu.final.items.length;
            const hasCodeList = state.project.value.hasCodeList;
            if (type === "final") {
                if (currentStoryboardLen <= 4) hasCode = hasCodeList.includes(currentStoryboardLen);
                else {
                    // console.log("final, hascODE: ");
                    hasCode = Math.random() < 0.5;
                    // console.log(hasCode);
                }
            }
            else {
                hasCode = false;
            }
            storyboardDataJSON = StoryboardDataHandler.initializeStoryboard(
                {_id: storyboardId,
                                name: storyboardName, hasCode,});
        }
        else {
            const originalCostumes = JSON.parse(JSON.stringify(state.recommend.value.originalCostumes));
            const currentCostumes = JSON.parse(JSON.stringify(state.recommend.value.currentCostumes));
            modifiedProject = ProjectDataHandler.deepCopy(modified);
            storyboardDataJSON = modifiedProject.storyboardList[0];
            storyboardDataJSON.name = storyboardName;
            storyboardDataJSON.originalCostumes = originalCostumes;
            storyboardDataJSON.currentCostumes = currentCostumes;
            storyboardDataJSON.hasCode = true;
        }
        const payload =  {
            projectId,
            type,
            storyboardDataJSON
        };
        dispatch(addStoryboardInMemory(JSON.stringify(payload)));
        if (modifiedProject !== null && modifiedProject.actorList.length > 0) {
            for (const actorData of modifiedProject.actorList) {
                const newActorData = ActorDataHandler.useModified(actorData);
                if (newActorData !== null) {
                    const newActor = ActorDataHandler.deepCopy(newActorData)
                    dispatch(addActor(newActor));
                }
            }
        }
        if (modifiedProject !== null && modifiedProject.backdropList.length > 0) {
            for (const backdrop of modifiedProject.backdropList) {
                dispatch(addBackdrop(backdrop._id))
            }
        }
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.addStoryboard(payload);
        // await dispatch(updateLastModified());
        return response.status;
    }
)

const deleteStoryboard = createAsyncThunk(
    'project/deleteStoryboard',
    async (storyboardId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */

        const state = getState();
        const project = state.project.value;
        const projectId = project._id;
        await dispatch(setSelectedStoryboardId(null));
        dispatch(deleteStoryboardInMemory(storyboardId));
        const storyboardMenu = getState().project.value.storyboardMenu;

        const response = await ProjectAPI.replaceStoryboardIdMenuInDatabase({
            projectId, storyboardMenu
        });
        snapLog("deleteStoryboard", {projectId,storyboardMenu, storyboardId});

        return response.status;
    }
);

const updateStoryboardOrder = createAsyncThunk(
    'project/updateStoryboardOrder',
    async (text, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        globalLog("----------------------text: ", text);
        dispatch(updateStoryboardOrderInMemory(text));
        const state = getState();
        const projectId = state.project.value._id;
        const storyboardMenu = state.project.value.storyboardMenu;
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceStoryboardIdMenuInDatabase({
            projectId, storyboardMenu
        });
        // await dispatch(updateLastModified());
        return response.status;
    }
);

const updateStoryboardName = createAsyncThunk(
    'project/updateStoryboardName',
    async (payload, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        snapLog("updateStoryboardName", payload);
        dispatch(updateStoryboardNameInMemory(JSON.stringify(payload)));
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.updateStoryboardName(payload);
        // await dispatch(updateLastModified());
        return response.status;
    }
);

const updateStoryboardHasCode = createAsyncThunk(
    'project/updateStoryboardHasCode',
    async (payload, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(updateStoryboardHasCodeInMemory(payload));
        const response = await ProjectAPI.updateStoryboardHasCode(payload);
        return response.status;
    }
);

/* The next section are about frames:
 */

const addFrame = createAsyncThunk(
    'project/addFrame',
    async (payload, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;

        let {prevIndex} = payload;
        const project = getState().project.value;
        // globalLog("project: ", project);
        const storyboardId = project.selectedId.storyboardId;
        // globalLog("storyboardId: ", storyboardId);
        const frameList = ProjectDataHandler.getStoryboard(project, storyboardId).frameList;
        // globalLog("frameList: ", frameList);
        if (prevIndex === undefined) {
            prevIndex = frameList.length - 1
        }
        const frameId = globalConfig.imageServer.student.frame + UUID.v4() + ".png";

        dispatch(addFrameInMemory(JSON.stringify({
            storyboardId,
            prevIndex,
            newId: frameId,
        })));
        snapLog("addFrame", {
            storyboardId,
            prevIndex,
            newId: frameId,
        });
        dispatch(setSelectedFrameId(frameId));
        const newFrameList = ProjectDataHandler.getStoryboard(getState().project.value, storyboardId).frameList;
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.insertFrameAndReplaceFrameListInDatabase({
            storyboardId,
            frameId,
            frameList: newFrameList,
        });
        // await dispatch(updateLastModified());
        return response.status;
    }
);

const deleteFrame = createAsyncThunk(
    'project/deleteFrame',
    async (frameIndex, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        snapLog("deleteFrame");


        let project = getState().project.value;
        const storyboardId = project.selectedId.storyboardId;
        dispatch(updateFrameListInMemory(JSON.stringify(
            {storyboardId,
                    frameIndex
            }
        )));

        project = getState().project.value;
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceFrameIdListInDatabase({
            storyboardId,
            frameIdList: ProjectDataHandler.getStoryboard(project, storyboardId).frameList.map(f => f._id)
          });
        // await dispatch(updateLastModified());
        return response.status;
    }
);


const updateFrameOrder = createAsyncThunk(
    'project/updateFrameOrder',
    async (text, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const {storyboardId} = text;
        dispatch(updateFrameOrderInMemory(text));
        const state = getState();
        const frameIdList = ProjectDataHandler.frameList(state.project.value, storyboardId).map(a=>a._id);
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceFrameIdListInDatabase({
            storyboardId,
            frameIdList,
        });
        // await dispatch(updateLastModified());
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
        globalLog("storyboardId: ", storyboardId)
        globalLog("frameId: ", frameId)
        if (storyboardId === null || frameId === null) {return;}
        if (storyboardId === undefined || frameId === undefined) {return;}
        dispatch(addStarInMemory({
            storyboardId, frameId, actorId, stateId,
        }));
        snapLog("addStar", {
            storyboardId, frameId, actorId, stateId,
        });
        // const storyboardData = ProjectDataHandler.getStoryboard(state.project.value, storyboardId);
        // const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
        // const starList =  frameData.starList;
        //
        // //sometimes the first dispatch does not work, because the actor is not yet fully updated on the canvas.
        // const isLegalUpdate = await dispatch(loadAuthorData());
        // if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
        //     dispatch(setFrozenMode(true));
        //     return;}
        // const response = await ProjectAPI.replaceStarListInDatabase({
        //     frameId,
        //     starList
        // });
        // await dispatch(updateLastModified());
        return "OK";
    }
);


const updateStarList = createAsyncThunk(
    'project/updateStarList',
    async (payload, thunkAPI) => {
        const {storyboardId, frameId} = payload;
        // snapLog("updateStarList", {
        //     storyboardId, frameId,
        // });
        const {dispatch, getState} = thunkAPI;
        // dispatch(updateStarListInMemory(payload));
        const state = getState();
        const storyboardData = ProjectDataHandler.getStoryboard(state.project.value, storyboardId);
        const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
        const starList =  frameData.starList;
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceStarListInDatabase({
            frameId,
            starList: starList
        });
        // await dispatch(updateLastModified());
        return response.status;
    }
);


const deleteStar = createAsyncThunk(
    'project/deleteStar',
    async (obj, thunkAPI) => {
        const {storyboardId, frameId, starId} = obj;
        const {dispatch, getState} = thunkAPI;
        // const state = getState();
        dispatch(setSelectedStarIdInMemory(null));
        dispatch(deleteStarInMemory({
            storyboardId, frameId, starId
        }));
        snapLog("deleteStar", {
            storyboardId, frameId, starId
        })
        // const storyboardData = ProjectDataHandler.getStoryboard( getState().project.value, storyboardId);
        // const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
        // const starList =  frameData.starList;
        // console.log("starList: ", starList);
        // const isLegalUpdate = await dispatch(loadAuthorData());
        // if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
        //     dispatch(setFrozenMode(true));
        //     return;}
        // const response = await ProjectAPI.replaceStarListInDatabase({
        //     frameId,
        //     starList: starList
        // });
        // await dispatch(updateLastModified());
        return "OK";
    }
);

const copyStar = createAsyncThunk(
    'project/copyStar',
    async (obj, thunkAPI) => {
        const {
            storyboardId,
            frameId,
            selectedStar,
        } = obj;
        snapLog("copyStar", obj);
        const {dispatch, getState} = thunkAPI;
        const newStarId = UUID.v4();
        dispatch(copyStarInMemory({
            storyboardId, frameId, selectedStar, newStarId,
        }));
        dispatch(setSelectedStarIdInMemory(newStarId));
        // const storyboardData = ProjectDataHandler.getStoryboard(getState().project.value, storyboardId);
        // const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
        // const starList =  frameData.starList;
        // const isLegalUpdate = await dispatch(loadAuthorData());
        // if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
        //     dispatch(setFrozenMode(true));
        //     return;}
        // const response = await ProjectAPI.replaceStarListInDatabase({
        //     frameId,
        //     starList: starList
        // });
        // await dispatch(updateLastModified());
        return "OK";
    }
);


const addSpeechChildStar = createAsyncThunk(
    'project/addSpeechChildStar',
    async (obj, thunkAPI) => {
        const {
            storyboardId, frameId,
            starId,
            childStarPrototypeId,
            type,
        } = obj;
        globalLog("addchildstar: ", starId);
        const {dispatch, getState} = thunkAPI;
        const childStarId = UUID.v4();
        dispatch(addSpeechChildStarInMemory({
            ...obj,
            childStarId
        }));
        // const storyboardData = ProjectDataHandler.getStoryboard(getState().project.value, storyboardId);
        // const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
        // const starList =  frameData.starList;
        // const isLegalUpdate = await dispatch(loadAuthorData());
        // if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
        //     dispatch(setFrozenMode(true));
        //     return;}
        // const response = await ProjectAPI.replaceStarListInDatabase({
        //     frameId,
        //     starList: starList
        // });
        // await dispatch(updateLastModified());
        return "OK";
    }
);


const addFrameText = createAsyncThunk(
    'project/addFrameText',
    async (obj, thunkAPI) => {
        const {
            storyboardId, frameId,
            textId,
            type,
        } = obj;
        globalLog("addFrameText: ", frameId);
        const {dispatch, getState} = thunkAPI;
        const childStarId = UUID.v4();
        dispatch(addFrameTextInMemory({
            ...obj,
            childStarId
        }));
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
        if (storyboardId === undefined || frameId === undefined) {return;}
        const backdropStar = {
            "_id": UUID.v4(),
            "prototypeId": prototypeId,
        };
        dispatch(addBackdropStarInMemory({
            storyboardId, frameId, backdropStar,
        }));
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceBackdropStarInDatabase({
            frameId,
            backdropStar
        });
        // await dispatch(updateLastModified());
        return response.status;
    }
);


const deleteBackdropStar = createAsyncThunk(
    'project/deleteBackdrop',
    async (payload, thunkAPI) => {
        const {storyboardId, frameId} = payload;
        const {dispatch, getState} = thunkAPI;
        const backdropStar = {
            prototypeId: null,
            _id: null,
        };
        dispatch(addBackdropStarInMemory(
            {
                storyboardId, frameId,backdropStar
            })
        );
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceBackdropStarInDatabase({
            frameId, backdropStar
        });
        // await dispatch(updateLastModified());
        return response.status;
    }
);

const addTemplate = createAsyncThunk(
    'project/addTemplate',
    async (frameId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const projectId = getState().project.value._id;
        const templateList = JSON.parse(JSON.stringify(getState().project.value.templateList));
        const templateId = frameId + "?" + UUID.v4();
        templateList.unshift(templateId);
        dispatch(addTemplateFrameInMemory(templateId));
        const response = await ProjectAPI.replaceTemplateListInDatabase({projectId,templateList});
        return response.status;
    }
)


/* The next section are about template stars on on the frame */
const addTemplateStar = createAsyncThunk(
    'project/addBackdropStar',
    async (templateId, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const state = getState();
        const simpleTemplateId = templateId.split("?")[0]
        const storyboardId = state.project.value.selectedId.storyboardId;
        const frameId = state.project.value.selectedId.frameId
        globalLog("storyboardId: ", storyboardId)
        globalLog("frameId: ", frameId)
        if (storyboardId === null || frameId === null) {return;}
        if (storyboardId === undefined || frameId === undefined) {return;}
        dispatch(addTemplateStarInMemory(JSON.stringify({
            storyboardId, frameId, templateId:simpleTemplateId,
        })));
        // await dispatch(updateLastModified());
        return "OK";
    }
);


/* The next section are about actors:
 */

const addActor = createAsyncThunk(
    'project/addActor',
    async (obj, thunkAPI) => {
        const {dispatch, getState}  = thunkAPI;
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
        globalLog("actorID: ", actorId);
        const {dispatch, getState} = thunkAPI;
        dispatch(deleteActorInMemory(actorId));
        const state = getState();
        const projectId = state.project.value._id;
        const actorIdList = state.project.value.actorList.filter(e => !e.deleted).map(a=>a._id);
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceActorIdListInDatabase({
            projectId, actorIdList
        });
        // await dispatch(updateLastModified());
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
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceActorIdListInDatabase({
            projectId, actorIdList
        });
        // await dispatch(updateLastModified());
        return response.status;
    }
);

const updateActorName = createAsyncThunk(
    'project/updateActorName',
    async (payload, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        dispatch(updateActorNameInMemory(JSON.stringify(payload)));
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.updateActorName(payload);
        // await dispatch(updateLastModified());
        return response.status;
    }
);


const updateActorDescription = createAsyncThunk(
    'project/updateActorDescription',
    async (payload, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        // dispatch(updateActorDescriptionInMemory(JSON.stringify(payload)));
        const response = await ProjectAPI.updateActorDescription(payload);
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
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceStateListInDatabase({
            actorId,
            stateList
        });
        // await dispatch(updateLastModified());
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
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceStateListInDatabase({
            actorId,
            stateList
        });
        // await dispatch(updateLastModified());
        return response.status;
    }
);

const updateStateName = createAsyncThunk(
    'project/updateStateName',
    async (payload, thunkAPI) => {
        const {actorId} = payload
        const {dispatch, getState} = thunkAPI;
        dispatch(updateStateNameInMemory(payload));
        const stateList = ProjectDataHandler.stateList(getState().project.value, actorId);
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceStateListInDatabase({
            actorId,
            stateList
        });
        // await dispatch(updateLastModified());
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
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceBackdropListInDatabase({
            projectId, backdropList
        });
        // await dispatch(updateLastModified());
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
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceBackdropListInDatabase({
            projectId, backdropList
        });
        // await dispatch(updateLastModified());
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
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.replaceBackdropListInDatabase({
            projectId, backdropList
        });
        // await dispatch(updateLastModified());
        return response.status;
    }
);

const saveNote = createAsyncThunk(
    'project/saveNote',
    async (obj, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const {storyboardId, text} = obj;
        snapLog("saveNote", obj);
        // dispatch(saveNoteInMemory({storyboardId, text}));
        // const storyboardId = getState().project.value.selectedId.storyboardId;
        /* const isLegalUpdate = await dispatch(loadAuthorData());
        if (isLegalUpdate.type === "author/loadAuthorData/rejected") {
            dispatch(setFrozenMode(true));
            return;} */
        const response = await ProjectAPI.saveNote({
            storyboardId,
           text
        });

        // await dispatch(updateLastModified());
        return response.status;
    }
);


const saveRating = createAsyncThunk(
    'project/saveRating',
    async (obj, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const {storyboardId, type, val} = obj;
        snapLog("saveRating", obj);
        dispatch(saveRatingInMemory({storyboardId, type, val}));
        const response = await ProjectAPI.saveRating({
            storyboardId,
            type,
            val
        });

        // await dispatch(updateLastModified());
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
                globalLog("parsed project: ", state.value);
            },
        },

        updateNameInMemory: {
            reducer: (state, action) => {
                state.value.name = action.payload;
            }
        },

        updateHasCodeListInMemory: {
            reducer: (state, action) => {
                state.value.hasCodeList = action.payload;
            }
        },

        setAuthorIdListInMemory: {
            reducer: (state, action) => {
                state.value.authorIdList = action.payload.authorIdList
            }
        },

        setSelectedStoryboardIdInMemory: {
            reducer: (state, action) => {
                SelectedIdDataHandler.setStoryboardId(state.value.selectedId, action.payload);
            }
        },

        voidSelectedStoryboardIdInMemory: {
            reducer: (state) => {
                SelectedIdDataHandler.voidStoryboardId(state.value.selectedId);
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
                // const storyboardData = state.value.storyboardList[storyboardIndex];
                // for (const frameId of storyboardData.frameList) {
                //     const templateIndex = state.value.templateList.indexOf(frameId);
                //     if (templateIndex !== -1) {
                //         state.value.templateList.splice(templateIndex, 1);
                //     }
                // }
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
                // state.value.templateList.unshift(action.payload.newId);
                // globalLog("storyboard!!!!!!!!!!!!!!!!!!!!!!: ", storyboard);
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


        updateFrameOrderInMemory: {
            reducer: (state, action) => {
                const {storyboardId, beginOrder, endOrder} = action.payload;
                ProjectDataHandler.updateFrameOrder(state.value, storyboardId, beginOrder, endOrder);
            },
        },

        updateFrameListInMemory: {
            reducer: (state, action) => {
                const {storyboardId, frameIndex} = JSON.parse(action.payload);
                const frameList = ProjectDataHandler.getStoryboard(state.value, storyboardId).frameList;
                // const frameId = frameList[frameIndex]._id;
                // const templateIndex = state.value.templateList.indexOf(frameId);
                // state.value.templateList.splice(templateIndex, 1);
                frameList.splice(frameIndex, 1);
                // globalLog("frameList!!!!!!!!!!!!!!!!!!!!!!: ", JSON.stringify(frameList));

            }
        },

        updateStoryboardHasCodeInMemory: {
            reducer: (state, action) => {
                const {storyboardId, hasCode} = action.payload;
                const storyboard = ProjectDataHandler.getStoryboard(state.value, storyboardId);
                storyboard.hasCode = hasCode;
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

        addSpeechChildStarInMemory: {
            reducer: (state, action) => {
                globalLog("inside add child star in memory");
                const {storyboardId, frameId, starId, childStarId, childStarPrototypeId, type} = action.payload;
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId);
                const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
                const starData = frameData.starList.find(s => s._id === starId);
                starData.childStar.speechStar =
                    StarDataHandler.initializeSpeechChildStar({
                      prototypeId: childStarPrototypeId,
                        _id: childStarId,
                        type: type,
                        width: 150,
                        height: 50,
                        x: starData.x + starData.width,
                        y: starData.y,
                    });
                globalLog("star data after adding: ", starData);
                globalLog("project data after adding: ", state.value);
            }
        },


        addFrameTextInMemory: {
            reducer: (state, action) => {
                globalLog("inside add child star in memory");
                const {storyboardId, frameId, childStarId, textId, type} = action.payload;
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId);
                const frameData = StoryboardDataHandler.getFrame(storyboardData, frameId);
                const starData =
                    StarDataHandler.initializeStar({
                        prototypeId: textId,
                        _id: childStarId,
                        type: "text",
                        width: 210,
                        height: 50,
                        x: 100,
                        y: 150,
                    });
                FrameDataHandler.addStarObj(frameData, starData);
                globalLog("star data after adding: ", starData);
                globalLog("project data after adding: ", state.value);
            }
        },



        updateStarListInMemory: {
            reducer: (state, action) => {
                const {storyboardId, frameId, starData} = action.payload;
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId);
                const frame = StoryboardDataHandler.getFrame(storyboardData, frameId);
                const starIndex = frame.starList.findIndex(s => s._id === starData._id);
                globalLog("starIndex: ", starIndex);
                globalLog("starData: ", starData);
                if (starIndex !== -1) {
                    frame.starList[starIndex] =  starData;
                }
            }
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

        addTemplateFrameInMemory: {
            reducer: (state, action) => {
                state.value.templateList.unshift(action.payload);
                console.log("state.project.value.templateList: ", state.value.templateList);
            }
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
                if (actorIndex === -1) {
                    return;
                }
                state.value.actorList[actorIndex].deleted=true;
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

        updateActorDescriptionInMemory: {
            reducer: (state, action) => {
                state.value.actorList.find(
                    a => a._id === action.payload._id
                ).description = action.payload.description;
            },
            prepare: (text) => {
                const obj = JSON.parse(text);
                return {
                    payload: {
                        "_id": obj._id,
                        "description": obj.description,
                    }
                }
            },
        },

        /* The next section are about states:
        */

        addStateInMemory: {
            reducer: (state, action) => {
                const stateId = action.payload.stateId.split("?")[0];
                const actor = state.value.actorList.find(a => a._id === action.payload.actorId);
                ActorDataHandler.addState(
                    actor,
                    stateId+ "?" + UUID.v4()
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
                const {actorId, stateId, stateName} = action.payload;
                const actor = state.value.actorList.find(
                    a => a._id === actorId
                )
                const stateIndex = actor.stateList.findIndex(s => s._id === stateId);
                if (stateIndex === -1) {
                    actor.stateList.push({
                        _id:  stateId,
                        name:  stateName
                    })
                }
                else {
                    actor.stateList[stateIndex].name = stateName;
                }
            },
        },

        /* The next section are about backdrops:
        */


        addBackdropInMemory: {
            reducer: (state, action) => {
                state.value.backdropList.unshift(BackdropDataHandler.initializeBackdrop(action.payload))
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
              const {text, storyboardId} = action.payload;
              const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId)
              storyboardData.note = text
          }
        },

        saveRatingInMemory: {
            reducer: (state, action) => {
                const {storyboardId, type, val} = action.payload;
                const storyboardData = ProjectDataHandler.getStoryboard(state.value, storyboardId)
                storyboardData[type] = val;
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
    loadProjectInMemory, updateNameInMemory, setAuthorIdListInMemory, //project
    setSelectedFrameIdInMemory, setSelectedStoryboardIdInMemory, voidSelectedStoryboardIdInMemory, setSelectedStarIdInMemory, //selectedId
    addStoryboardInMemory, deleteStoryboardInMemory, updateStoryboardOrderInMemory, updateStoryboardNameInMemory, //storyboard
    addStarInMemory, updateStarListInMemory, deleteStarInMemory, copyStarInMemory,addSpeechChildStarInMemory, addFrameTextInMemory, //star
    addBackdropStarInMemory, //backdropStar
    addTemplateFrameInMemory, addTemplateStarInMemory, //templateStar
    addSpeechBubbleInMemory, deleteSpeechBubbleInMemory, updateTextNameInMemory, //text ==> todo: delete these at some point
    addResourceInMemory, deleteResourceInMemory, updateResourceValueInMemory, //resource
    addFrameInMemory, updateFrameListInMemory, updateFrameOrderInMemory,//frame
    addActorInMemory, deleteActorInMemory, updateActorOrderInMemory, updateActorNameInMemory, updateActorDescriptionInMemory, //actor
    addStateInMemory, deleteStateInMemory, updateStateNameInMemory, //state
    addBackdropInMemory, deleteBackdropInMemory, updateBackdropNameInMemory, //backdrop
    saveNoteInMemory, //note
    saveRatingInMemory,
    updateHasCodeListInMemory, updateStoryboardHasCodeInMemory,
    download,
} = projectSlice.actions;
export {
    insertEmptyProjectToDatabase, insertProjectToDatabase, loadProjectFromDatabase, updateName,  shareProject, mergeProject,//project
    setSelectedStoryboardId, setSelectedFrameId, setSelectedStarId, //selectedId
    addStoryboard, deleteStoryboard, updateStoryboardOrder, updateStoryboardName, //storyboard
    addFrame, deleteFrame, updateFrameOrder, //frame
    addStar, updateStarList, deleteStar, copyStar, addSpeechChildStar, addFrameText, //star
    addBackdropStar,deleteBackdropStar, //backdropStar
    addTemplate, addTemplateStar, //templateSar,
    addActor, deleteActor, updateActorOrder, updateActorName, updateActorDescription,//actor
    addState, deleteState, updateStateName, //state
    addBackdrop, deleteBackdrop, updateBackdropName, //backdrop
    saveNote, //note
    saveRating,
    updateHasCodeList, updateStoryboardHasCode,
};
export default projectSlice.reducer;
