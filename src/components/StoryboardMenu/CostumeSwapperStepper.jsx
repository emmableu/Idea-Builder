import React from "react";
import {createSelector} from "reselect";
import {useDispatch, connect, useSelector} from "react-redux";
import {Modal, Steps, Button, Progress, Card, Dropdown} from 'antd';
import axios from "../../axiosConfig";
import Paper from "@material-ui/core/Paper";
import {Grid, makeStyles, Tooltip} from "@material-ui/core";
import ImgTile from "../primitives/ImgCard/ImgTile";
import {
    justModifyStateId,
    modifyRecommend,
    modifyRecommendBackdrop,
    resetModifiedRecommend
} from "../../redux/features/recommendSlice";
import AssetGallery from "../primitives/AssetGallery";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import globalConfig from "../../globalConfig";
import {setSelectedFrameId} from "../../redux/features/projectSlice";
import StaticFrame from "../Frame/StaticFrame";
import {EditOutlined, EllipsisOutlined} from "@ant-design/icons";
import DragHandleIcon from "../primitives/DragHandleIcon";
const { Step } = Steps;
const { Meta } = Card;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    cardList: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    stepsContainer: {
        display:"flex",
        flexDirection:"row",
        // padding: "20px 20px",
        height: globalConfig.costumeSwapperHeight,
        width: "100%",
    },
    steps: {
        width: 120,
        height: globalConfig.costumeSwapperHeight,
        overflow: "scroll"
    },
    paper: {
        width: '100%',
        position: 'relative',
        paddingBottom: "100%",
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
        objectFit: "contain"
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
    stepsContent: {
        width: "100%",
        height: globalConfig.costumeSwapperHeight,
        // marginTop: 16,
        // padding: "8px 8px",
        textAlign: "center",
        backgroundColor: "#fafafa",
        // border: "1px dashed #e9e9e9",
        borderRadius: 2,
        display: "flex",
        flexGrow:1,
        flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "center",
    },
    stepsAction: {
        width: 100,
        height: globalConfig.costumeSwapperHeight,
        // marginTop: 16,
        // padding: "8px 8px",
        textAlign: "center",
        backgroundColor: "#fafafa",
        // border: "1px dashed #e9e9e9",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarList: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        '& img': {
            objectFit: "contain",
        }
    },
    userCostumes: {
        width: "50%",
        height: globalConfig.costumeSwapperHeight,
        overflow: "scroll",
        padding: "10px 10px",
        border: "1px dashed #e9e9e9",
    },
    assetGallery: {
        width: "50%",
        height: globalConfig.costumeSwapperHeight,
        overflow: "scroll",
        padding: "10px 10px",
        border: "1px dashed #e9e9e9",
    },
}));


const getSelectedRecommend = createSelector(
    state => state.project.value.actorList,
    state => state.project.value.backdropList,
    state => state.recommend.value.selected,
    state => state.recommend.value.originalCostumes,
    state => state.recommend.value.currentCostumes,
    (actorList,backdropList, selected, originalCostumes, currentCostumes,
     ) => {
        const userCostumes = [];
        for (const backdrop of backdropList) {
            userCostumes.push({
                type: "backdrop",
                ...backdrop
            })
        }
        for (const actor of actorList) {
            for (const state of actor.stateList) {
                userCostumes.push(
                    {
                        actorId: actor._id,
                        actorName: actor.name,
                        ...state,
                        type: "state",
                    }
                )
            }
        }

        return {
            originalCostumes, userCostumes,
            currentCostumes,
        }
    }
)

const mapStateToProps = (state) => {
    return getSelectedRecommend(state);
}



const CostumeSwapperStepper = (props) => {
    const classes = useStyles();
    const {
        setCurrent,
        userCostumes,
        originalCostumes,
        currentCostumes,
    } = props;
    console.log("currentCostumes: ", currentCostumes);
    const [selected, setSelected] = React.useState(null);
    const dispatch = useDispatch();

    // const reset = (e) => {
    //     dispatch(resetModifiedRecommend());
    // };
    //
    // const handleUse = (e, actorId, _id) => {
    //     // console.log("handleUse", selected, originalCostumes.length, originalBackdrops.length)
    //     dispatch(modifyRecommend(
    //         {
    //             newActorId: actorId,
    //             newStateId: _id,
    //             selected,
    //         }))
    //
    // };

    return (
        <>
            <div className={classes.cardList}>
                <Card
                    // style={{ width: 300 }}
                    size="small"
                    hoverable
                    bordered
                    style={{
                        padding: "1px 1px",
                        height: "120px",
                        width: `${120*0.44}px`,
                        margin: "5px 5px"
                    }}
                    bodyStyle={{padding: "0 0",
                    }}
                >
                    <div style={{overflow: "hidden",
                    height: `${120*0.44}px`, display: "block",
                    whiteSpace: "nowrap",
                    textOverflow: "clip"}}>Original</div>
                    <div style={{overflow: "hidden",
                        height: `${120*0.44}px`, display: "block",
                        whiteSpace: "nowrap",
                        textOverflow: "clip"}}>New</div>
                </Card>
                {
                    currentCostumes.map((currentCostume, idx) => (
                        <SwapperCard
                            originalCostume = {originalCostumes[idx]}
                            currentCostume={currentCostume}
                            order = {idx}
                            key={idx}
                            selected={selected}
                            setSelected={setSelected}
                        >
                        </SwapperCard>
                    ))
                }
            </div>
            {
                selected !== null &&
                <Swapper
                    currentCostume={originalCostumes[selected]}
                    userCostumes={userCostumes}
                    selected={selected}
                />
            }
        </>
    )
}


const Swapper = React.memo((props) => {
    const classes = useStyles();
    const {currentCostume, selected, userCostumes} = props;
    const {type} = currentCostume;
    const imgTileType = type === "backdrop"? "swap-costume-backdrop":"swap-costume";
    // newActorId, newStateId, selected
    const dispatch = useDispatch();
    const handleUse = (e, actorId, _id) => {
        console.log("handle use");
        dispatch(modifyRecommend(
            {
                newActorId: actorId,
                newStateId: _id,
                selected,
            }
        ));
    };



    return (
        <div className={classes.stepsContent}>
            <div  className={classes.userCostumes}>
                <div>
                    {`My ${type === "backdrop"? "backdrop": "actor"}`}
                </div>
                <Grid container spacing={1} justifyContent="center">

                    {userCostumes.map(imgData => (
                        <Grid item xs={3}
                              key={imgData._id}
                        >
                            <ImgTile
                                type={imgTileType}
                                _id={imgData._id}
                                name={imgData.name}
                                imgSrc={axios.defaults.baseURL + imgData._id}
                                heightToWidthRatio="70%"
                                handleDelete={null}
                                handleUse={handleUse}
                                contentNode={imgData.name}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <div
                className={classes.assetGallery}
            >
                {`Search for a new ${type === "backdrop"? "backdrop": "actor"}`}
                <AssetGallery
                    xs={3}
                    height={globalConfig.costumeSwapperHeight-50}
                    type={type}
                    itemSize={120}
                />
            </div>
            </div>
    )
})


const SwapperCard = React.memo(( props
    ) => {
    const {originalCostume, currentCostume, order, selected, setSelected} = props;
    return (
        <Card
            // style={{ width: 300 }}
            size="small"
            hoverable
            bordered
            style={{
                padding: "1px 1px",
                border: order === selected? "2px solid orange":"1px solid #e0e0e0",
                height: "120px",
                width: `${120*0.44}px`,
                margin: "5px 5px"
            }}
            cover={
                <div
                    onClick={(e) => {setSelected(order)}}
                    style={{display: "flex", flexDirection: "column"}}
                >
                    <div
                        style = {{height: "44%", width: "100%", border:"1px solid #e0e0e0" }}
                    >
                    <img src={axios.defaults.baseURL + originalCostume._id} alt="original"
                         style = {{height: "100%", width: "100%"}}
                    />
                    </div>
                    <div
                        style = {{height: "44%", width: "100%", border:"1px solid #e0e0e0" }}
                    >
                        <img src={axios.defaults.baseURL + currentCostume._id} alt="current"
                             style = {{height: "100%", width: "100%"}}
                        />
                    </div>
                </div>
            }
            bodyStyle={{padding: "0 0",
            }}
        >
            <Meta
                description={<div style={{overflow: "hidden",
                    height: "100%", display: "block",
                    whiteSpace: "nowrap",
                    textOverflow: "clip"}}>{originalCostume.actorName? originalCostume.actorName : "stage"}</div>}
            />
        </Card>
    )

})


export default connect(mapStateToProps)(CostumeSwapperStepper);
