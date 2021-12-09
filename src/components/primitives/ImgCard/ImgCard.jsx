import {Card} from "antd";
import React from "react";
import {Grid} from "@material-ui/core";
import axios from "../../../axios/ideaServerAxiosConfig";
import ImgTileEdiText from "./ImgTileEdiText";
import ImgTile from "./ImgTile";


const ImgCard = (props) => {
    const {title,
        buttonGroup,
        dataList,
        imgWidth,
        handleSave,
        handleDelete,
        handleUse,
        type,
        ratio,
        actorId,
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
    return (
        <Card
            title={title}
            bordered={type === "state"}
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
                            contentNode={<ImgTileEdiText
                                actorId={actorId}
                                _id={imgData._id}
                                name={imgData.name}
                                handleSave={handleSave}
                            />}
                            order={order}
                        />
                    </Grid>
                ))}
            </Grid>
        </Card>


    )
};

export default ImgCard;
