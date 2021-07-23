import {Card} from "antd";
import React from "react";
import {Grid} from "@material-ui/core";
import axios from "../../../axiosConfig";
import ImgTileEdiText from "./ImgTileEdiText";
import ImgTile from "./ImgTile";



const ImgCard = React.memo((props) => {
    const {title,
        buttonGroup,
        dataList,
        imgWidth,
        handleSave,
        handleDelete,
        handleUse,
        type,
    } = props;
    /*
    title: the title of the card, can be text or react component
    buttonGroup: usually includes upload and search, for actors it also includes delete and drag
    dataList: can be stateList, backdropList, or userInputList
    imgWidth: the width of an image in the ImgCard
    imgButtonGroup: the buttons on the overlay of an image
    handleSave: what happens when saving an image;
     */
    return (
        <Card
            title={title}
            size="small"
            style={{ width: "100%" }}
            // extra={<BackdropPanelButtonGroup
            //     {...props}/>}>
            extra={buttonGroup} >
            <Grid container spacing={1} justifyContent="center">
                {dataList.map(imgData => (
                    <>
                        <Grid item xs={imgWidth}>
                            <ImgTile
                                type={type}
                                _id={imgData._id}
                                name={imgData.name}
                                imgSrc={axios.defaults.baseURL + imgData._id}
                                heightToWidthRatio={'75%'}
                                handleDelete={handleDelete}
                                handleUse={handleUse}
                                contentNode={<ImgTileEdiText
                                    _id={imgData._id}
                                    name={imgData.name}
                                    handleSave={handleSave}
                                />}
                            />
                        </Grid>
                    </>
                ))}
            </Grid>
        </Card>


    )
});

export default ImgCard;