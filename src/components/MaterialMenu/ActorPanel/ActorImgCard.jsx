import {Card, Collapse, Input} from "antd";
import React, {useCallback} from "react";
import {Grid} from "@material-ui/core";
import axios from "../../../axios/ideaServerAxiosConfig";
import ImgTile from "../../primitives/ImgCard/ImgTile";
import globalConfig, {getUserCondition, getUserShortId} from "../../../globalConfig";
import { debounce } from "lodash";
import {genGifStates, showGifMap} from "../../../json/actorAssetData";
import {
    saveNote,
    saveNoteInMemory,
    updateActorDescription,
    updateActorDescriptionInMemory
} from "../../../redux/features/projectSlice";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";

const { Panel } = Collapse;
const { TextArea } = Input;



const ActorImgCard = (props) => {
    const userId = Cookies.get("userId");
    const {
        actorName,
        title,
        buttonGroup,
        dataList,
        imgWidth,
        handleSave,
        handleDelete,
        handleUse,
        type,
        ratio,
        actorId,
        textContent,
        readOnly,
        description,
    } = props;
    /*
    title: the title of the card, can be text or react component
    buttonGroup: usually includes upload and search, for actors it also includes delete and drag
    dataList: can be stateList, backdropList, or eventList
    imgWidth: the width of an image in the ImgCard
    imgButtonGroup: the buttons on the overlay of an image
    handleSave: what happens when saving an image;
     */
    const dispatch = useDispatch();
    const gifStates = genGifStates();
    const heightToWidthRatio = ratio===undefined?"75%":"100%";
    let parentWidth = 12;
    if (readOnly) {
        parentWidth = 4;
    }


    const dispatchSaveDescription = (actorId, description) => dispatch(updateActorDescription({_id:actorId, description}));

    const saveDescriptionDebounce = useCallback(debounce(dispatchSaveDescription, 700), []);

    const onFieldTextChange = async (e) => {
        const description = e.target.value;
        dispatch(updateActorDescriptionInMemory(JSON.stringify({_id:actorId, description})));
        saveDescriptionDebounce(actorId, description);
    };

    return (
        <Grid item justifyContent="center" xs={parentWidth}>
        <Card
            title={title}
            bordered={type === "state" || type === "actorSearch"}
            size="small"
            extra={buttonGroup} >
            <Grid container spacing={1} justifyContent="center">
                {dataList.map((imgData, order) => (
                    <Grid item xs={imgWidth}>
                        <ImgTile
                            type={type}
                            _id={imgData._id}
                            key={imgData._id}
                            actorId={actorId!==undefined?actorId:null}
                            name={imgData.name}
                            imgSrc={
                                axios.defaults.baseURL + imgData._id
                            }
                            heightToWidthRatio={heightToWidthRatio}
                            handleDelete={handleDelete}
                            handleUse={handleUse}
                            contentNode={null}
                            order={order}
                            readOnly={readOnly}
                        />
                    </Grid>
                ))}
            </Grid>
                <Collapse bordered={false} defaultActiveKey={readOnly?['2']:[]} ghost>
                    {readOnly === false &&
                        <Panel header={actorName + " can..."} key="1">
                            <TextArea
                                rows={4}
                                value={description}
                                onChange={onFieldTextChange}
                                placeholder=""/>
                    </Panel>
                    }
                    {gifStates.hasOwnProperty(actorName) &&
                        showGifMap[getUserShortId(userId)].includes(actorName) &&
                        <Panel header={"Example gif"} key="2">
                            <div style={{width: 200}}>
                            <ImgTile
                                type={'backdrop'}
                                _id={ actorName }
                                key={actorName}
                                actorId={null}
                                name={actorName}
                                imgSrc={
                                    axios.defaults.baseURL +  globalConfig.imageServer.sample.state +  actorName + ".gif"
                                }
                                heightToWidthRatio={"75%"}
                                handleDelete={null}
                                handleUse={null}
                                contentNode={null}
                                readOnly={true}
                            />
                            </div>
                        </Panel>
                    }
                </Collapse>
        </Card>
        </Grid>
    )
};

export default ActorImgCard;
