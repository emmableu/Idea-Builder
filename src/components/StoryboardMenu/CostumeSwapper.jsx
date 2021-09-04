import React from "react";
import {createSelector} from "reselect";
import { useDispatch, connect } from "react-redux";
import {Steps} from 'antd';
import axios from "../../axiosConfig";
import Paper from "@material-ui/core/Paper";
import {Grid, makeStyles} from "@material-ui/core";
import ImgTile from "../primitives/ImgCard/ImgTile";
import {modifyRecommend, modifyRecommendBackdrop} from "../../redux/features/recommendSlice";
const { Step } = Steps;

const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"row",
        padding: "20px 20px",
        height: 500,
    },
    steps: {
        width: 150,
        height: 500,
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
        minHeight: 200,
        // marginTop: 16,
        padding: "8px 8px",
        textAlign: "center",
        backgroundColor: "#fafafa",
        border: "1px dashed #e9e9e9",
        borderRadius: 2,
        display: "flex",
        flexGrow:1,
    },
});


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
                    }
                )
            }
        }
        return {selectedCostumes, userCostumes,
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
            <div
             className={classes.root}
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
                    <Grid container spacing={1} justifyContent="center">
                        {
                            currentCostumeStep < selectedBackdrops.length &&
                            (
                                userBackdrops.map(imgData => (
                                    <Grid item xs={2}
                                          key={imgData._id}
                                    >
                                        <ImgTile
                                            type="swap-costume-backdrop"
                                            _id={imgData._id}
                                            name={imgData.name}
                                            imgSrc={axios.defaults.baseURL + imgData._id}
                                            heightToWidthRatio="100%"
                                            handleDelete={null}
                                            handleUse={handleUseBackdrop}
                                            contentNode={null}
                                        />
                                    </Grid>
                                ))
                            )
                        }
                        {
                            currentCostumeStep >= selectedBackdrops.length &&
                            (
                                userCostumes.map(imgData => (
                                        <Grid item xs={2}
                                              key={imgData._id}
                                        >
                                            <ImgTile
                                                type="swap-costume"
                                                actorId={imgData.actorId}
                                                _id={imgData._id}
                                                name={imgData.name}
                                                imgSrc={axios.defaults.baseURL + imgData._id}
                                                heightToWidthRatio="100%"
                                                handleDelete={null}
                                                handleUse={handleUse}
                                                contentNode={null}
                                            />
                                        </Grid>
                                    ))
                            )
                        }
                    </Grid>
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
                style={{width: 100}}
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
                {costume.name}
            </div>

        </>

)
})

export default connect(mapStateToProps)(CostumeSwapper);
