import React from "react";
import { Steps, Button, message } from 'antd';
import StoryboardGallery from "./StoryboardGallery";
import {makeStyles} from "@material-ui/core";
import CostumeSwapper from "./CostumeSwapper";

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
    },
    stepsAction: {
        marginTop: 24,
    }

}))

const GalleryStepper = () => {
    const [current, setCurrent] = React.useState(0);
    const classes = useStyles()

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

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
                    <CostumeSwapper
                        setCurrent={setCurrent}
                    />
                }

            </div>
            <div className={classes.stepsAction}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
};

export default GalleryStepper;
