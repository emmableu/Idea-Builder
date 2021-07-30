import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {useDispatch} from "react-redux";
import {IconButton} from "@material-ui/core";
import {ArrowForward, DeleteOutlined} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import {LazyLoadImage} from "react-lazy-load-image-component";

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
        width: '100%',
        height: '100%',
    },
    divOverlap: {
        position: "absolute",
        display: "flex",
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        opacity: 1,
        cursor: "auto",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonOverlapUse: {
        zIndex: 2,
    },
    buttonOverlapDelete: {
        zIndex: 2,
    },
});


const ImgTile = React.memo((props) =>  {
    const { _id, actorId, stateId, imgSrc, contentNode, handleDelete, handleUse, type} = props;
    const classes = useStyles(props);
    const [onHover, setOnHover] = React.useState();

    return (
        <Card
            variant="outlined"
            className={classes.root}>
            <CardMedia className={classes.media}
                       onMouseEnter={() => {setOnHover(true)}}
                       onMouseLeave={() =>{ setOnHover(false)}}
            >
                <div className={classes.elementToStretch}
                >
                    <LazyLoadImage
                        draggable
                        className={classes.imgStyle}
                        style={{objectFit: (type === "backdrop")? 'cover':"contain"}}
                        src={imgSrc}
                        alt="img"
                    />
                    <div className={classes.divOverlap} style={{display: onHover? "flex":"none" }}
                         onMouseEnter={() => {setOnHover(true)}}
                         onMouseLeave={() =>{ setOnHover(false)}}
                    >
                        <Tooltip title="Use">
                            <IconButton aria-label="add"
                                        className={classes.buttonOverlapUse}
                                        color="inherit"
                                        variant="contained"
                                        onClick={e => {
                                            console.log("clicking, type: ", type);
                                            if (type === "backdrop") {
                                                handleUse(e, _id)
                                            }
                                            else if (type === "state") {
                                                handleUse(e, actorId, stateId)
                                            }
                                        }}
                                        size="medium">
                                <ArrowForward style={{color: "white"}} />
                            </IconButton>
                        </Tooltip>
                        { (handleDelete !== undefined && handleDelete !== null) &&
                            <Tooltip title="Delete">
                            <IconButton aria-label="add"
                                        className={classes.buttonOverlapDelete}
                                        color="inherit"
                                        variant="contained"
                                        size="medium"
                                        onClick={e => {
                                            if (type === "backdrop") {
                                                handleDelete(e, _id)
                                            }
                                            else if (type === "state") {
                                                handleDelete(e, actorId)
                                            }
                                        }}>
                                <DeleteOutlined style={{color: "white"}}/>
                            </IconButton>
                        </Tooltip>
                        }
                    </div>
                </div>
            </CardMedia>
            {contentNode}
        </Card>
    );
})


export default ImgTile;
