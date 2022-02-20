import Paper from "@material-ui/core/Paper";
import {Rate} from "antd";
import * as React from "react";
import {saveRating} from "../../redux/features/projectSlice";
import {useDispatch} from "react-redux";

const RatingPaper = (props) => {
    const {confidenceRating, knowledgeRating, handleChangeConfidence, handleChangeKnowledge} = props;
    const dispatch = useDispatch();



    return (
        <Paper  style={{padding: "10px 10px", margin:"20px 0px"
        }} variant="outlined">
            <p style={{color:"grey", fontStyle:"italic"}}>
                Rate from strongly disagree to strongly agree:
            </p>
            <li>I feel confident I can turn my storyboard ideas into <i>Snap!</i> code.</li>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Rate onChange={handleChangeConfidence} value={confidenceRating}/>
            <li>I could apply some cool coding knowledge to make this!</li>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Rate onChange={handleChangeKnowledge} value={knowledgeRating}/>
        </Paper>
    )
}

export default RatingPaper;
