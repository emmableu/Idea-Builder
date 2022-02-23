import * as Survey from "survey-react";
import React from "react";
import { Modal, message } from 'antd';
import surveyContent from "../json/surveyContent.json";
import CodeAPI from "../api/CodeAPI";
import Container from "@material-ui/core/Container";

Survey.StylesManager.applyTheme("modern");


const SurveyComponent = (props) => {
    const [surveyOpen, setSurveyOpen] = React.useState(false);
    const localSurveyCompleted = localStorage.getItem("surveyCompleted");
    const [surveyCompleted, setSurveyCompleted] = React.useState(localSurveyCompleted === "true");
    const survey = new Survey.Model(surveyContent);
    // const showTime = Date.parse('23 Feb 2022 02:55:00 EST');
    const showTime = Date.parse('23 Feb 2022 11:10:00 EST');
    function sendDataToServer(survey) {
        //send Ajax request to your web server.
        // alert("The results are:" + JSON.stringify(survey.data));
        setSurveyCompleted(true);
        localStorage.setItem("surveyCompleted", "true");
        setSurveyOpen(false);
        CodeAPI.surveyUpdate("design-survey", survey.data);
        message.success({
            content:'Thanks for completing the survey.',
            style: {
                marginTop: '20vh',
            },
        });
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            // console.log("surveyCompleted: ", surveyCompleted)
            // console.log("surveyOpen: ", surveyOpen)
            if (!surveyCompleted && !surveyOpen) {
                if (currentTime > showTime ) {
                    setSurveyOpen(true);
                }
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [surveyCompleted,surveyOpen]);


    return (
        <>
            <Modal title="Survey" visible={surveyOpen}
                   style={{ top: 60}}
                   keyboard={false}
                   width="90%"
                   closable={false}
                   maskClosable={false}
                   footer={[]}>

                <Container maxWidth="md">
                    <Survey.Survey model={survey}  onComplete={ sendDataToServer } />
                </Container>

            </Modal>
        </>
    )
}

export default SurveyComponent;
