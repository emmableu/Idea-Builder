import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {useDispatch} from "react-redux";
import {addBackdrop, addState} from "../../redux/features/projectSlice";
import {IconButton} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import NewActorDialogue from "./NewActorDialogue";

const useStyles = makeStyles({
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
        objectFit: 'contain',
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
    buttonOverlap: {
        zIndex: 2,
    },
    buttonOverlapDelete: {
        zIndex: 2,
    },
});


const SearchDialogImgCard = React.memo((props) =>  {
    const {type, imgId, imgSrc, actorId} = props;
    const classes = useStyles(props);
    const dispatch  = useDispatch();
    const [onHover, setOnHover] = React.useState();
    const [isModalVisible, setIsModalVisible] = React.useState(false);



    const getName = () => {
        const namePrefix = imgId.split("____")[0].split("/");
        const nameString = namePrefix[namePrefix.length - 1];
        const nameArray = nameString.split("-");
        return nameArray.join(" ");
    };

    const handleAddItem = () => {
        if (type=== "state") {
            if (actorId !== undefined){
                dispatch(addState(
                    {
                        actorId,
                        stateId: imgId,
                    }
                ))
            }

            else {
                setIsModalVisible(true);
            }
        }
        else if (type=== "backdrop") {
            dispatch(addBackdrop(
                    imgId
            ))
        }
    }


    return (
        <>
        <Card
            variant="outlined"
            >
            <CardMedia className={classes.media}
                       onMouseEnter={() => {setOnHover(true)}}
                       onMouseLeave={() =>{ setOnHover(false)}}
            >
                <div className={classes.elementToStretch}>
                    <LazyLoadImage
                        className={classes.imgStyle}
                        src={imgSrc}
                        alt="img"
                    />
                    <div className={classes.divOverlap} style={{display: onHover? "flex":"none" }}>
                        <Tooltip title={`Add to my ${type==="state"?"actor":type}s`}>
                            <IconButton aria-label="add"
                                        className={classes.buttonOverlap}
                                        color="inherit"
                                        variant="contained"
                                        onClick={e => {handleAddItem(e)}}
                                        size="medium">
                                <Add style={{color: "white"}} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </CardMedia>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                height: "40px"
            }}>
                <span>{getName()}</span>
            </div>
        </Card>
            {
                 isModalVisible &&
                <NewActorDialogue
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    imgId={imgId}
                />
            }
        </>
    );
});


export default SearchDialogImgCard;
