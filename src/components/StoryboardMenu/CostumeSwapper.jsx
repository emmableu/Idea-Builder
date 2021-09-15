import React from "react";
import {createSelector} from "reselect";
import {useDispatch, connect, useSelector} from "react-redux";
import {Modal, Steps,Button, Progress} from 'antd';
import axios from "../../axiosConfig";
import Paper from "@material-ui/core/Paper";
import {Grid, makeStyles} from "@material-ui/core";
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
const { Step } = Steps;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
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
        width: "60%",
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
    state => state.recommend.value.originalBackdrops,
    state => state.recommend.value.currentCostumes,
    state => state.recommend.value.currentBackdrops,
    (actorList,backdropList, selected, originalCostumes, originalBackdrops,
     currentCostumes, currentBackdrops
     ) => {


        const userCostumes = [];
        for (const actor of actorList) {
            if (actor.deleted !== true ) {
                for (const state of actor.stateList) {
                    userCostumes.push(
                        {
                            actorId: actor._id,
                            ...state,
                            actorName: actor.name
                        }
                    )
                }
            }
        }
        return {
            originalCostumes, userCostumes,
        userBackdrops: backdropList, originalBackdrops,
            currentCostumes, currentBackdrops,
        }
    }
)

const mapStateToProps = (state) => {
    return getSelectedRecommend(state);
}



const CostumeSwapper = (props) => {
    const classes = useStyles();
    const {
        setCurrent,
        userCostumes, userBackdrops,
        originalCostumes, originalBackdrops,
        currentCostumes, currentBackdrops,
    } = props;
    const [currentCostumeStep, setCurrentCostumeStep] = React.useState(0);
    const [isComplete, setIsComplete] = React.useState(false);
    const dispatch = useDispatch();

    const reset = (e) => {
        dispatch(resetModifiedRecommend());
    };

    const handleUse = (e, actorId, _id) => {
        console.log("handleUse", currentCostumeStep, originalCostumes.length, originalBackdrops.length)
        if (currentCostumes[currentCostumeStep - originalBackdrops.length] === null) {
            dispatch(modifyRecommend(
                {
                    actorId: originalCostumes[currentCostumeStep - originalBackdrops.length].actorId,
                    stateId: originalCostumes[currentCostumeStep - originalBackdrops.length]._id,
                    newActorId: actorId,
                    newStateId: _id,
                    currentCostumeStep: currentCostumeStep,
                }
            ));
        }
        else {
            dispatch(modifyRecommend(
                {
                    actorId: currentCostumes[currentCostumeStep - originalBackdrops.length].actorId,
                    stateId: currentCostumes[currentCostumeStep - originalBackdrops.length]._id,
                    newActorId: actorId,
                    newStateId: _id,
                    currentCostumeStep: currentCostumeStep,
                }
            ));
        }

    };


    const next = (e) => {
        if (currentCostumeStep === originalCostumes.length + originalBackdrops.length - 1) {
            setIsComplete(true);
        }
        else {
            setCurrentCostumeStep(currentCostumeStep => currentCostumeStep + 1);
        }
    }


    const prev = (e) => {
        if (currentCostumeStep === originalCostumes.length + originalBackdrops.length - 1) {
            setIsComplete(true);
        }
        else {
            setCurrentCostumeStep(currentCostumeStep => currentCostumeStep - 1);
        }
    }

    const useOriginal = (e) => {
        if (currentCostumeStep >= originalBackdrops.length) {
            dispatch(justModifyStateId({
                idx: currentCostumeStep - originalBackdrops.length,
                type: "state"
            }));
        }
        else {
            dispatch(justModifyStateId({
                idx: currentCostumeStep,
                type: "backdrop"}));
        }
        // if (currentCostumeStep === originalCostumes.length + originalBackdrops.length - 1) {
        //     setIsComplete(true);
        // }
        // else {
        //     setCurrentCostumeStep(currentCostumeStep => currentCostumeStep + 1);
        // }
    }

    const handleUseBackdrop = (e, _id) => {
        if (currentBackdrops[currentCostumeStep]===null) {
            dispatch(modifyRecommendBackdrop(
                {
                    stateId: originalBackdrops[currentCostumeStep]._id,
                    newStateId: _id,
                    currentCostumeStep,
                }
            ));
        }
        else {
            dispatch(modifyRecommendBackdrop(
                {
                    stateId: currentBackdrops[currentCostumeStep]._id,
                    newStateId: _id,
                    currentCostumeStep,
                }
            ));
        }

        // if (currentCostumeStep === originalCostumes.length + originalBackdrops.length - 1) {
        //     setIsComplete(true);
        // }
        // else {
        //     setCurrentCostumeStep(currentCostumeStep => currentCostumeStep + 1);
        // }
    };


    return (
        <>
            <div className={classes.root}>
                <SwappedAvatarList
                    originalBackdrops={originalBackdrops}
                    originalCostumes={originalCostumes}
                />
            <div
             className={classes.stepsContainer}
            >
                {
                    isComplete &&
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Progress
                                type="circle"
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                                percent={100}
                            />
                            <p>Completed</p>
                            <div>
                                <Button onClick={reset}>
                                    Reset
                                </Button>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <Button
                                    type="primary"
                                    onClick={e => setCurrent(2)}>
                                    Next
                                </Button>
                            </div>
                        </div>
                }

                {
                    !isComplete &&
                    <>
                <Steps
                    direction="vertical"
                    progressDot
                    className={classes.steps}
                    current={currentCostumeStep}>
                    {originalBackdrops.map(
                        (c, i) => (
                                <Step
                                    key={c._id} title={<CostumeTitle
                                    costume={c}
                                    isCurrent={currentCostumeStep === i}
                                />}/>
                        )
                    )}
                    {originalCostumes.map(
                        (c, i) => (
                                <Step
                                    key={c._id} title={<CostumeTitle
                                    costume={c}
                                    isCurrent={currentCostumeStep === i+originalBackdrops.length}
                                />}/>
                        )
                    )}
                </Steps>
                <div className={classes.stepsContent}>
                        {
                            currentCostumeStep < originalBackdrops.length &&
                            (
                                <>
                                    <div  className={classes.userCostumes}>
                                    <div>
                                    {"My backdrops"}
                                    </div>
                                    <Grid container spacing={1} justifyContent="center">
                                        <Grid item xs={4}
                                              key={"skip"}
                                              style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                        >
                                            <Button
                                                type="dashed"
                                                variant="contained"
                                                onClick={useOriginal}
                                            >Use original</Button>
                                        </Grid>

                                        {userBackdrops.map(imgData => (
                                            <Grid item xs={4}
                                                  key={imgData._id}
                                            >
                                                <ImgTile
                                                    type="swap-costume-backdrop"
                                                    _id={imgData._id}
                                                    name={imgData.name}
                                                    imgSrc={axios.defaults.baseURL + imgData._id}
                                                    heightToWidthRatio="70%"
                                                    handleDelete={null}
                                                    handleUse={handleUseBackdrop}
                                                    contentNode={imgData.name}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    </div>
                                    <div
                                        className={classes.assetGallery}
                                    >
                                        {"Search for a new backdrop"}
                                        <AssetGallery
                                            xs={4}
                                            height={globalConfig.costumeSwapperHeight-50}
                                            type="backdrop"
                                            itemSize={120}
                                        />
                                    </div>
                                </>
                            )
                        }
                        {
                            currentCostumeStep >= originalBackdrops.length &&
                            (
                                <>
                                <div  className={classes.userCostumes}>
                                <div>
                                    {"My actors"}
                                </div>
                                <Grid container spacing={1} justifyContent="center"
                                >
                                    <Grid item xs={4}
                                          key={"skip"}
                                          style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                    ><Button
                                        type="dashed"
                                        variant="contained"
                                        onClick={useOriginal}
                                        >Use original</Button>
                                    </Grid>

                                    {userCostumes.map(imgData => (
                                        <Grid item xs={4}
                                              key={imgData._id}
                                        >
                                            <ImgTile
                                                type="swap-costume"
                                                actorId={imgData.actorId}
                                                _id={imgData._id}
                                                name={imgData.name}
                                                imgSrc={axios.defaults.baseURL + imgData._id}
                                                heightToWidthRatio="75%"
                                                handleDelete={null}
                                                handleUse={handleUse}
                                                contentNode={imgData.actorName}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                </div>
                                    <Divider/>
                                    <div
                                        className={classes.assetGallery}
                                    >
                                        {"Search for a new actor"}
                                        <AssetGallery
                                        xs={4}
                                        height={globalConfig.costumeSwapperHeight-50}
                                        type="state"
                                        itemSize={120}
                                    />
                                    </div>
                                </>
                            )
                        }
                </div>


                        <div className={classes.stepsAction}>
                            {currentCostumeStep > 0 && (
                                <Button style={{ margin: '20px 20px' }} onClick={prev}>
                                    Previous
                                </Button>
                            )}
                            {currentCostumeStep < originalCostumes.length + originalBackdrops.length - 1 && (
                                <Button type="primary" onClick={next}>
                                    Next
                                </Button>
                            )}
                            {currentCostumeStep === originalCostumes.length + originalBackdrops.length - 1 && (
                                <Button type="primary" onClick={null}>
                                    Done
                                </Button>
                            )}
                        </div>
                </>}
            </div>
            </div>
        </>
    )
}

const CostumeTitle = React.memo((props) => {
    const classes = useStyles();
    const {costume, isCurrent} = props;
    const stepEndRef = React.useRef(null);
    const scrollToMe = () => {
        if (stepEndRef.current) {
            stepEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }
    React.useEffect(() => {
        console.log("iscURRENT: ", isCurrent);
        if (isCurrent === true) {
            scrollToMe()
        }
    }, [isCurrent]);


    return (
        <>
            <div
                style={{width: 100,
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}
            >
                <div
                    style={{width: 60}}
                >
                    {isCurrent &&
                    (
                        <div
                            ref={stepEndRef}/>
                    )}
                    <Paper

                        variant="outlined"
                        className={classes.paper}
                    >
                        <div className={classes.elementToStretch}
                        >
                            <img alt="img"
                                 className={classes.imgStyle}
                                 src={axios.defaults.baseURL + costume._id}
                            />
                            <div className={classes.divOverlap} style={{display: isCurrent? "none":"flex"}}
                            />
                        </div>
                    </Paper>
                </div>
                {costume.name}
            </div>

        </>
)
})



const SwappedAvatarList = (props) => {
    const classes = useStyles();
    const {originalBackdrops, originalCostumes} = props;
    const currentCostumes = useSelector(state =>
        (state.recommend.value.currentCostumes)
    );
    const currentBackdrops = useSelector(state =>
        (state.recommend.value.currentBackdrops)
    );
    const oldSrc = [];
    const newSrc = [];

    for (let i = 0; i < originalBackdrops.length; i++) {
        oldSrc.push(axios.defaults.baseURL + originalBackdrops[i]._id);
        if (currentBackdrops[i]) {
            newSrc.push(axios.defaults.baseURL + currentBackdrops[i]._id);
        }
        else {
            newSrc.push(null)
        }
    }

    for (let i = 0; i < originalCostumes.length; i++) {
        oldSrc.push(axios.defaults.baseURL + originalCostumes[i]._id);
        if (currentCostumes[i]){
            newSrc.push(axios.defaults.baseURL + currentCostumes[i]._id);
        }
        else {
            newSrc.push(null)
        }
    }

    return (
        <>
            <div
                style={{minHeight: 80}}
            >
                <div className={classes.avatarList}>
                    {"Original "}
                    {oldSrc.map((src) => (
                        <Avatar src={src} alt="avatar" className={classes.avatar}
                                style={{width:36, height: 36, margin: "3px 3px 3px 3px"}}
                        >
                            {src===null && <HelpOutlineIcon/>}
                        </Avatar>
                    ))}
                </div>
                <div className={classes.avatarList}>
                    {   "New \u00a0\u00a0\u00a0\u00a0"}
                    {newSrc.map((src) => (
                        <Avatar src={src} alt="avatar" className={classes.avatar}
                                style={{width:36, height: 36, margin: "3px 3px 3px 3px"}}
                        >
                            {src===null && <HelpOutlineIcon/>}
                        </Avatar>
                    ))}
                </div>
            </div>
        </>
    )
}


export default connect(mapStateToProps)(CostumeSwapper);
