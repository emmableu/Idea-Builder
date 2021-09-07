import React from "react";
import {createSelector} from "reselect";
import {useDispatch, connect, useSelector} from "react-redux";
import {Modal, Steps,Button} from 'antd';
import axios from "../../axiosConfig";
import Paper from "@material-ui/core/Paper";
import {Grid, makeStyles} from "@material-ui/core";
import ImgTile from "../primitives/ImgCard/ImgTile";
import {justModifyStateId, modifyRecommend, modifyRecommendBackdrop} from "../../redux/features/recommendSlice";
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
        flexDirection:"column",
        // padding: "20px 20px",
        height: globalConfig.responsiveSizeData.newStoryboardHeight - (56 + 24 + 28 + 8 + 148 + 21 + 21 + 56 + 56),
        width: "100%",
    },
    steps: {
        width: 120,
        height: globalConfig.responsiveSizeData.newStoryboardHeight - (56 + 24 + 28 + 8 + 148 + 21 + 21 + 56 + 56),
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
        height: "inherit",
        // marginTop: 16,
        padding: "8px 8px",
        textAlign: "center",
        backgroundColor: "#fafafa",
        border: "1px dashed #e9e9e9",
        borderRadius: 2,
        display: "flex",
        flexGrow:1,
        flexDirection: "column",
        // justifyContent: "space-between",
        // alignItems: "center",
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
        width: "100%",
        height: 240,
        overflow: "scroll",
        padding: "10px 10px",
    },
}));


const getSelectedRecommend = createSelector(
    state => state.project.value.actorList,
    state => state.project.value.backdropList,
    state => state.recommend.value.selected,
    (actorList,backdropList, selected) => {
        const selectedCostumes = [];
        for (const actor of selected.actorList) {
            for (const state of actor.stateList) {
                selectedCostumes.push(
                    {
                        actorId: actor._id,
                        actorName: actor.name,
                        ...state,
                    }
                )
            }
        }

        const selectedBackdrops = selected.backdropList;

        const userCostumes = [];
        for (const actor of actorList) {
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
        return {
            selectedCostumes, userCostumes,
        userBackdrops: backdropList, selectedBackdrops,
        }
    }
)

const mapStateToProps = (state) => {
    return getSelectedRecommend(state);
}



const CostumeSwapper = (props) => {
    const classes = useStyles();
    const {
        userCostumes, userBackdrops,
        selectedCostumes, selectedBackdrops} = props;
    const [currentCostumeStep, setCurrentCostumeStep] = React.useState(0);
    const dispatch = useDispatch();


    const handleUse = (e, actorId, _id) => {
        // globalLog("handleUse")
        if (currentCostumeStep === selectedCostumes.length) {
            return;
        }
        dispatch(modifyRecommend(
                {
                    actorId: selectedCostumes[currentCostumeStep - selectedBackdrops.length].actorId,
                    stateId: selectedCostumes[currentCostumeStep - selectedBackdrops.length]._id,
                    newActorId: actorId,
                    newStateId: _id,
                }
        ));
        setCurrentCostumeStep(currentCostumeStep => currentCostumeStep + 1);
    };

    const useOriginal = (e) => {
        if (currentCostumeStep >= selectedBackdrops.length) {
            dispatch(justModifyStateId({
                newStateId: selectedCostumes[currentCostumeStep - selectedBackdrops.length]._id,
                type: "state"}));
        }
        else {
            dispatch(justModifyStateId({
                newStateId: selectedBackdrops[currentCostumeStep]._id,
                type: "backdrop"}));
        }
        setCurrentCostumeStep(currentCostumeStep => currentCostumeStep + 1);
    }

    const handleUseBackdrop = (e, _id) => {
        // globalLog("handleUse")
        if (currentCostumeStep === selectedCostumes.length + selectedBackdrops.length) {
            return;
        }
        dispatch(modifyRecommendBackdrop(
            {
                stateId: selectedBackdrops[currentCostumeStep]._id,
                newStateId: _id,
            }
        ));
        setCurrentCostumeStep(currentCostumeStep => currentCostumeStep + 1);
    };


    return (
        <>
            <div className={classes.root}>
                <SwappedAvatarList
                    selectedBackdrops={selectedBackdrops}
                    selectedCostumes={selectedCostumes}
                />
            <div
             className={classes.stepsContainer}
            >
                <Steps
                    direction="vertical"
                    progressDot
                    className={classes.steps}
                    current={currentCostumeStep}>
                    {selectedBackdrops.map(
                        (c, i) => (
                                <Step
                                    key={c._id} title={<CostumeTitle
                                    costume={c}
                                    isCurrent={currentCostumeStep === i}
                                />}/>
                        )
                    )}
                    {selectedCostumes.map(
                        (c, i) => (
                                <Step
                                    key={c._id} title={<CostumeTitle
                                    costume={c}
                                    isCurrent={currentCostumeStep === i+selectedBackdrops.length}
                                />}/>
                        )
                    )}
                </Steps>

                <div className={classes.stepsContent}>
                        {
                            currentCostumeStep < selectedBackdrops.length &&
                            (
                                <>
                                    <div  className={classes.userCostumes}>
                                    <div>
                                    {"My backdrops"}
                                    </div>
                                    <Grid container spacing={1} justifyContent="center">
                                        <Grid item xs={2}
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
                                            <Grid item xs={2}
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
                                    <Divider/>
                                    <div>
                                        {"Search for a new backdrop"}
                                        <AssetGallery
                                            xs={2}
                                            height={300}
                                            type="backdrop"
                                            itemSize={120}
                                        />
                                    </div>
                                </>
                            )
                        }
                        {
                            currentCostumeStep >= selectedBackdrops.length &&
                            (
                                <>
                                <div  className={classes.userCostumes}>
                                <div>
                                    {"My actors"}
                                </div>
                                <Grid container spacing={1} justifyContent="center"
                                >
                                    <Grid item xs={2}
                                          key={"skip"}
                                          style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                    ><Button
                                        type="dashed"
                                        variant="contained"
                                        onClick={useOriginal}
                                        >Use original</Button>
                                    </Grid>

                                    {userCostumes.map(imgData => (
                                        <Grid item xs={2}
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
                                    >
                                        {"Search for a new actor"}
                                        <AssetGallery
                                        xs={2}
                                        height={300}
                                        type="state"
                                        itemSize={120}
                                    />
                                    </div>
                                </>
                            )
                        }
                </div>
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
    const {selectedBackdrops, selectedCostumes} = props;
    const modifiedCostumes = useSelector(state =>
        (state.recommend.value.modifiedCostumes)
    );
    const modifiedBackdrops = useSelector(state =>
        (state.recommend.value.modifiedBackdrops)
    );
    const oldSrc = [];
    const newSrc = [];

    for (let i = 0; i < selectedBackdrops.length; i++) {
        oldSrc.push(axios.defaults.baseURL + selectedBackdrops[i]._id);
        if (i < modifiedBackdrops.length) {
            newSrc.push(axios.defaults.baseURL + modifiedBackdrops[i]);
        }
        else {
            newSrc.push(null)
        }
    }

    for (let i = 0; i < selectedCostumes.length; i++) {
        oldSrc.push(axios.defaults.baseURL + selectedCostumes[i]._id);
        if (i < modifiedCostumes.length){
            newSrc.push(axios.defaults.baseURL + modifiedCostumes[i]);
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
                        <Avatar src={src} alt="avatar" className={classes.avatar}>
                            {src===null && <HelpOutlineIcon/>}
                        </Avatar>
                    ))}
                </div>
                <div className={classes.avatarList}>
                    {   "New \u00a0\u00a0\u00a0\u00a0"}
                    {newSrc.map((src) => (
                        <Avatar src={src} alt="avatar" className={classes.avatar}>
                            {src===null && <HelpOutlineIcon/>}
                        </Avatar>
                    ))}
                </div>
            </div>
        </>
    )
}


export default connect(mapStateToProps)(CostumeSwapper);
