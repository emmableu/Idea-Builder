import {useDispatch, useSelector} from "react-redux";
import axios from "../../axios/ideaTranslatorAxiosConfig";
import { Image, Modal, Button, Popconfirm } from 'antd';
import React from "react";
import {setCodeEvalOpen, setCodeModalOpen, setSnapWindowLoaded, setSnapXml} from "../../redux/features/codeSlice";
import { Spin, Alert } from 'antd';
import globalConfig, {snapLog} from "../../globalConfig";
import ExampleEval from "./ExampleEval";
import {saveRating} from "../../redux/features/projectSlice";

const Code = (props) => {
    const storyboardId = useSelector(state =>  (state.project.value && state.project.value.selectedId) ?state.project.value.selectedId.storyboardId:null);
    const codeModalOpen = useSelector(s => s.code.codeModalOpen);
    const snapWindowLoaded = useSelector(s => s.code.snapWindowLoaded);
    const dispatch = useDispatch();
    const snapXml = useSelector(state => state.code.snapXml);
    const iframe = React.useRef(null);
    // const [snapWindowLoaded, setSnapWindowLoaded] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [currentVal, setCurrentVal] = React.useState(0);

    React.useEffect(
        () => {
            if (iframe.current) {
                window.snap = iframe.current.contentWindow;
            }
        }, [iframe.current]
    )


    React.useEffect(
        () => {
            if (snapXml && snapWindowLoaded && iframe.current) {
                iframe.current.contentWindow.postMessage(JSON.stringify({snapXml}), '*');
                setLoading(false);
            }
        }, [snapXml, snapWindowLoaded]
    )
    window.onmessage = function(e) {
        if (e.data === 'snapWindowLoaded') {
            dispatch(setSnapWindowLoaded(true));
        }
    };

    const handleClose = () => {
        dispatch(setCodeModalOpen(false));
        dispatch(setSnapXml(""));
        dispatch(saveRating({storyboardId, type: "usefulRating", val:currentVal}))
        snapLog("saveRatingAndClose", {storyboardId, type: "usefulRating", val:currentVal});
        // dispatch(setCodeEvalOpen(true));
        // snapLog("closeExample");
        setCurrentVal(0);
    }

    return (
        <>
        <Modal title="Code for this storyboard" visible={codeModalOpen}
               style={{ top: 60 }}
               keyboard={false}
               width="90%"
               closable={false}
               maskClosable={false}
               footer={[

                       storyboardId?

                           <Popconfirm
                               placement="topRight"
                               title={<ExampleEval storyboardId={storyboardId} currentVal={currentVal} setCurrentVal={setCurrentVal}/>}
                               onConfirm={handleClose}
                               okText="Ok"
                               okButtonProps={{disabled:currentVal === 0}}
                               showCancel={false}
                               // cancelText="No"
                           > <Button key="ok" type="primary">
                               OK
                           </Button>

                           </Popconfirm> :
                           <Button key="ok" type="primary" onClick={handleClose}>
                               OK
                           </Button>

               ]}
               onCancel={handleClose}
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

export default Code;
