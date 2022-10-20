import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Menu, Dropdown } from 'antd';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {useDispatch, useSelector} from "react-redux";
import {addTemplateStar, deleteTemplate} from "../../../redux/features/projectSlice";
import {IconButton} from "@material-ui/core";
import MoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {ArrowForward, DeleteOutlined} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "../../../axios/ideaServerAxiosConfig";
import urlExist from "url-exist";
import {ProjectDataHandler} from "../../../data/ProjectData";
import StaticFrame from "../../Frame/StaticFrame";

const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    media: {
        width: '100%',
        position: 'relative',
        paddingBottom: props => props.heightToWidthRatio,
        paddingTop: '0',
        height: 0,
    },
    elementToStretch: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    imgStyle: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',



    },
    divOverlap: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        opacity: 1,
        cursor: "auto",
    },
    buttonOverlapUse: {
        position: "relative",
        zIndex: 2,
        left: "28%",
        top: "40%",
        width: "45px",
        height: "35px",
    },
    buttonOverlapDelete: {
        position: "relative",
        zIndex: 2,
        left: "35%",
        top: "40%",
        width: "35px",
        height: "35px",
    },
});


const TemplateImgCard = (props) =>  {
    const { templateData, contentNode } = props;
    const classes = useStyles(props);
    const dispatch  = useDispatch();
    // const frameData = useSelector(s =>
    // {
    //     try
    //         {return JSON.parse(JSON.stringify(ProjectDataHandler.findFrame(s.project.value, templateId.split("?")[0])))}
    //     catch (e) {
    //     return null
    // }
    // });
    const [onHover, setOnHover] = React.useState();

    const handleAddTemplateStar = (e) => {
        dispatch(addTemplateStar(templateData));
    }


    return (
        <Card
            variant="outlined"
            className={classes.root}>
            {/*<Dropdown overlay={menu(templateId)} trigger={['contextMenu']}>*/}
            <CardMedia className={classes.media}
                       onMouseEnter={() => {setOnHover(true)}}
                       onMouseLeave={() =>{ setOnHover(false)}}
            >
                <div className={classes.elementToStretch}
                >
                    {/*<img*/}
                    {/*    draggable*/}
                    {/*    className={classes.imgStyle}*/}
                    {/*    src={axios.defaults.baseURL + templateId}*/}
                    {/*    alt="img"*/}
                    {/*/>*/}
                    {templateData && <StaticFrame
                        frameData={templateData}
                    />}
                    <div className={classes.divOverlap} style={{display: onHover? "block":"none" }}>
                        <Tooltip title="Use">
                            <IconButton aria-label="add"
                                        className={classes.buttonOverlapUse}
                                        color="inherit"
                                        variant="contained"
                                        onClick={e => {handleAddTemplateStar(e)}}
                                        size="medium">
                                <ArrowForward style={{color: "white"}} />
                            </IconButton>
                        </Tooltip>

                    </div>
                </div>
            </CardMedia>
            {contentNode}
        </Card>
    );
}


export default TemplateImgCard;
