import React from "react";
import {createSelector} from "reselect";
import { useDispatch, connect } from "react-redux";
import {Steps, Button, message, Avatar} from 'antd';
import axios from "../../axiosConfig";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {Grid, IconButton, makeStyles} from "@material-ui/core";
import {globalLog} from "../../globalConfig";
import {Add, ArrowForward, DeleteOutlined} from "@material-ui/icons";
import {LazyLoadImage} from "react-lazy-load-image-component";
import CardMedia from "@material-ui/core/CardMedia";
import ImgTile from "../primitives/ImgCard/ImgTile";
import FrameList from "../FrameList/FrameList";
import {modifyRecommend} from "../../redux/features/recommendSlice";
const { Step } = Steps;

const useStyles = makeStyles({
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
        marginTop: 16,
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
    state => state.recommend.value.selected,
    (actorList, selected) => {
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
        return {selectedCostumes, userCostumes, selected}
    }
)

const mapStateToProps = (state) => {
    return getSelectedRecommend(state);
}



const CostumeSwapper = (props) => {
    const classes = useStyles();
    const {userCostumes, selectedCostumes} = props;
    const [currentCostumeStep, setCurrentCostumeStep] = React.useState(0);
    const dispatch = useDispatch();


    const handleUse = (e, actorId, _id) => {
        // globalLog("handleUse")
        dispatch(modifyRecommend(
                {
                    actorId: selectedCostumes[currentCostumeStep].actorId,
                    stateId: selectedCostumes[currentCostumeStep]._id,
                    newActorId: actorId,
                    newStateId: _id,
                }
        ));
        setCurrentCostumeStep(currentCostumeStep => currentCostumeStep + 1);
    };


    return (
        <>
            <div
                style={{
                    display:"flex",
                    flexDirection:"row"}}
            >
                <Steps
                    direction="vertical"
                    progressDot
                    style={{width:150}}
                    current={currentCostumeStep}>
                    {selectedCostumes.map(
                        (c, i) => (
                            <Step
                                key={c._id} title={<CostumeTitle
                                costume={c}
                                isCurrent={currentCostumeStep !== i}
                            />}/>
                        )
                    )}
                </Steps>
                <div className={classes.stepsContent}>
                    <Grid container spacing={1} justifyContent="center">
                        {userCostumes.map(imgData => (
                            <Grid item xs={3}
                                  key={imgData._id}
                            >
                                <ImgTile
                                    type="swap-costume"
                                    actorId={imgData.actorId}
                                    _id={imgData._id}
                                    name={imgData.name}
                                    imgSrc={
                                        axios.defaults.baseURL + imgData._id
                                    }
                                    heightToWidthRatio="100%"
                                    handleDelete={null}
                                    handleUse={handleUse}
                                    contentNode={null}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </>
    )
}

const CostumeTitle = React.memo((props) => {
    const classes = useStyles();
    const {costume, isCurrent} = props;

    return (
        <>
            <div
                style={{width: 100}}
            >
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
                        <div className={classes.divOverlap} style={{display: isCurrent? "flex":"none"}}
                        />
                    </div>
                </Paper>
            </div>
        {costume.name}
        </>

)
})

export default connect(mapStateToProps)(CostumeSwapper);
