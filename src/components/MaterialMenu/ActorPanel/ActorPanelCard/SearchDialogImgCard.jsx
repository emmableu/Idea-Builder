import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Menu, Dropdown } from 'antd';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {useDispatch} from "react-redux";
import {addStar, addState, deleteState} from "../../../../redux/features/projectSlice";
import {IconButton} from "@material-ui/core";
import MoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {ArrowForward, DeleteOutlined, Add} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

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
        objectFit: 'contain',
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
    buttonOverlap: {
        position: "relative",
        zIndex: 2,
        left: "35%",
        top: "30%",
        width: "35px",
        height: "35px",
    },
    buttonOverlapDelete: {
        position: "relative",
        zIndex: 2,
        left: "20%",
        top: "30%",
        width: "35px",
        height: "35px",
    },
});


const SearchDialogImgCard = (props) =>  {
    const {id, actorId, imgSrc } = props;
    const classes = useStyles(props);
    const dispatch  = useDispatch();
    const [onHover, setOnHover] = React.useState();

    const getName = () => {
        const namePrefix = id.split("____")[0].split("/")
        const nameString = namePrefix[namePrefix.length - 1]
        const nameArray = nameString.split("-")
        const name = nameArray.join(" ")
        return name;
    }

    const handleAddStar = () => {
        // dispatch(addStar(stateId));
        dispatch(addState(
            {
                actorId,
                stateId: id
            }
        ))
    }


    return (
        <Card
            variant="outlined"
            className={classes.root}>
            {/*<Dropdown overlay={menu(stateId)} trigger={['contextMenu']}>*/}
            <CardMedia className={classes.media}
                       onMouseEnter={() => {setOnHover(true)}}
                       onMouseLeave={() =>{ setOnHover(false)}}
            >
                <div className={classes.elementToStretch}
                >
                    <img
                        draggable
                        className={classes.imgStyle}
                        src={imgSrc}
                        alt="img"
                    />
                    <div className={classes.divOverlap} style={{display: onHover? "block":"none" }}>
                        <Tooltip title="Add to my states">
                            <IconButton aria-label="add"
                                        className={classes.buttonOverlap}
                                        color="inherit"
                                        variant="contained"
                                        onClick={e => {handleAddStar(e)}}
                                        size="large">
                                <Add style={{color: "white"}} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </CardMedia>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent:"center"
            }}>
                <span>{getName()}</span>
            </div>
        </Card>
    );
}


export default SearchDialogImgCard;
