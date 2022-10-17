import {Card, Collapse, Input} from "antd";
import React from "react";
import {Grid} from "@material-ui/core";
import axios from "../../../axios/ideaServerAxiosConfig";
import ImgTile from "../../primitives/ImgCard/ImgTile";
import ImgTileEdiText from "../../primitives/ImgCard/ImgTileEdiText";
import globalConfig from "../../../globalConfig";
const { Panel } = Collapse;
const { TextArea } = Input;

const ActorImgCard = (props) => {
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
        readOnly
    } = props;
    /*
    title: the title of the card, can be text or react component
    buttonGroup: usually includes upload and search, for actors it also includes delete and drag
    dataList: can be stateList, backdropList, or eventList
    imgWidth: the width of an image in the ImgCard
    imgButtonGroup: the buttons on the overlay of an image
    handleSave: what happens when saving an image;
     */
    const heightToWidthRatio = ratio===undefined?"75%":"100%";
    let parentWidth = 12;
    if (readOnly) {
        parentWidth = 4;
    }
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
                            contentNode={readOnly?
                             imgData.name :
                                <ImgTileEdiText
                                actorId={actorId}
                                _id={imgData._id}
                                name={imgData.name}
                                handleSave={handleSave}
                            />}
                            order={order}
                            readOnly={readOnly}
                        />
                    </Grid>
                ))}
            </Grid>
                <Collapse bordered={false} defaultActiveKey={readOnly?['2']:[]} ghost>
                    {readOnly === false &&
                        <Panel header={actorName + " can..."} key="1">
                        <TextArea rows={4} placeholder="" />
                    </Panel>
                    }
                    <Panel header={"Example gif"} key="2">
                        <img src={axios.defaults.baseURL +  globalConfig.imageServer.sample.state +  actorName + ".gif"} style={{width: 200, height: 150}}/>
                    </Panel>
                </Collapse>
        </Card>
        </Grid>


    )
};

export default ActorImgCard;
