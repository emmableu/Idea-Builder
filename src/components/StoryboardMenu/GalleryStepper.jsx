import React from "react";
import { Steps, Button, message } from 'antd';
import StoryboardGallery from "./StoryboardGallery";
import {makeStyles} from "@material-ui/core";
import CostumeSwapper from "./CostumeSwapper";
import ModifyingFrameList from "./ModifiedFrameList";
import globalConfig from "../../globalConfig";
import {clearModifiedRecommend, resetModifiedRecommend} from "../../redux/features/recommendSlice";
import {useDispatch} from "react-redux";
import NewStoryboardNameInput from "./NewStoryboardNameInput";

const { Step } = Steps;

const steps = [
    {
        title: 'choose storyboard',
        content: 'First-content',
    },
    {
        title: 'swap costumes',
        content: 'Second-content',
    },
    {
        title: 'add name',
        content: 'Last-content',
    },
];

const useStyles = makeStyles( theme => ({
    stepsContent: {
        minHeight: 200,
        marginTop: 16,
        padding: "8px 8px",
        textAlign: "center",
        backgroundColor: "#fafafa",
        border: "1px dashed #e9e9e9",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        maxHeight: globalConfig.galleryStepperMaxHeight,
        overflow: "scroll",
    },
    stepsAction: {
        marginTop: 12,
    }

}))

const GalleryStepper = (props) => {
    const {setNewStoryboardName, current, setCurrent} = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const prev = () => {
        if (current === 2) {
            dispatch(resetModifiedRecommend());
        }
        setCurrent(current - 1);
    };

    const createEmptyStoryboard = () => {
        dispatch(clearModifiedRecommend());
        setCurrent(2)
    }

    return (
        <>
            <Steps current={current}
                   size="small"
            >
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className={classes.stepsContent}>
                {current === 0 &&
                    <StoryboardGallery
                        setCurrent={setCurrent}
                    />
                }
                {current === 1 &&
                    <>
                        <div style={{height: 200}}>
                            <ModifyingFrameList/>
                        </div>
                        <CostumeSwapper
                            setCurrent={setCurrent}
                        />
                    </>
                }
                {
                    current === 2 &&
                        <NewStoryboardNameInput
                            setNewStoryboardName={setNewStoryboardName}
                        />
                }

            </div>
            <div className={classes.stepsAction}>
                {current === 0 && (
                    <Button  onClick={createEmptyStoryboard}>
                        Create empty storyboard
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Back
                    </Button>
                )}
            </div>
        </>
    );
};

export default GalleryStepper;
