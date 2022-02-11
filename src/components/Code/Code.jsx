import {useDispatch, useSelector} from "react-redux";
import axios from "../../axios/ideaTranslatorAxiosConfig";
import { Image, Modal, Button } from 'antd';
import React from "react";
import {setCodeModalOpen, setSnapXml} from "../../redux/features/codeSlice";
import { Spin, Alert } from 'antd';
import globalConfig from "../../globalConfig";

const Code = (props) => {
    const {codeModalOpen, setCodeModalOpen} = props;
    const dispatch = useDispatch();
    const snapXml = useSelector(state => state.code.snapXml);
    const iframe = React.useRef(null);
    // const codeModalOpen = false;
    const [snapWindowLoaded, setSnapWindowLoaded] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(
        () => {
            if (snapXml && snapWindowLoaded) {
                iframe.current.contentWindow.postMessage(JSON.stringify({snapXml}), '*');
                setLoading(false);
            }
        }, [snapXml, snapWindowLoaded]
    )
    window.onmessage = function(e) {
        if (e.data === 'snapWindowLoaded') {
            setSnapWindowLoaded(true);
        }
    };

    return (
        <>
        <Modal title="Code for this storyboard" visible={codeModalOpen}
               style={{ top: 60 }}
               width="90%"
               footer={[
                   <Button key="ok" type="primary" onClick={() => {setCodeModalOpen(false);dispatch(setSnapXml(""));}}>
                       OK
                   </Button>]}
               onCancel={() => {setCodeModalOpen(false)}}
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
