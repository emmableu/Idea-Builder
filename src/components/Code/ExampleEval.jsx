import {connect, useDispatch, useSelector} from "react-redux";
import axios from "../../axios/ideaTranslatorAxiosConfig";
import {Image, Modal, Button, Rate, message} from 'antd';
import React from "react";
import { Spin, Alert } from 'antd';
import globalConfig, {snapLog} from "../../globalConfig";
import {setCodeEvalOpen} from "../../redux/features/codeSlice";
import {createSelector} from "reselect";
import {saveRating} from "../../redux/features/projectSlice";
import { Radio, Input, Space } from 'antd';



const ExampleEval = (props) => {

    const {storyboardId, currentVal, setCurrentVal} = props;
    // const codeEvalOpen = useSelector(s => s.code.codeEvalOpen);
    const dispatch = useDispatch();


    const onChange = async (e) => {
        // console.log('radio checked', e.target.value);
        setCurrentVal(e.target.value);

    };

    return (
        <>

                <div style={{width: 300}}>
                    <p>Do you plan to use this code later? </p>
                    <p style={{color: "grey"}}><i>Later when you program in Snap!, you will see a code example gallery, including examples generated from your storyboards.</i></p>
                    <Radio.Group onChange={onChange} value={currentVal}>
                        <Space direction="vertical">
                            <Radio value={3}>Yes, I will likely use it.</Radio>
                            <Radio value={1}>No, I will not use this code.</Radio>
                            <Radio value={2}>I'm not sure.</Radio>
                        </Space>
                    </Radio.Group>
                </div>
        </>

    )
}

export default ExampleEval;
// export default connect(mapStateToProps)(ExampleEval);
