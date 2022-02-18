import {useDispatch, useSelector} from "react-redux";
import axios from "../axios/ideaTranslatorAxiosConfig";
import { Image, Modal, Button } from 'antd';
import React from "react";
import { Spin, Alert } from 'antd';
import globalConfig from "../globalConfig";

const ExampleEval = (props) => {
    const {exampleEvalOpen, setExampleEvalModalOpen} = props;
    const dispatch = useDispatch();

    return (
        <>
            <Modal title="ExampleEval for this storyboard" visible={exampleEvalOpen}
                   style={{ top: 60 }}
                   width="90%"
                   footer={[
                       <Button key="ok" type="primary" onClick={() => {setExampleEvalModalOpen(false);dispatch(setSnapXml(""));}}>
                           OK
                       </Button>]}
                   onCancel={() => {setExampleEvalModalOpen(false)}}
            >
                <div style={{height: globalConfig.codeBoxHeight, width: "100%"}}>
                    <Spin tip="Generating code..." spinning={loading} size="large">
                        <iframe ref={iframe}
                                style={{border:"0px solid black"}}
                                width="100%"
                                height={`${globalConfig.codeBoxHeight}px`}
                                src={process.env.REACT_APP_SNAP_REPLAY_URL}/>
                    </Spin>
                </div>
            </Modal>

        </>

    )
}

export default ExampleEval;
