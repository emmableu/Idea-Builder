import {Modal, Button, Space, Dropdown} from 'antd';
import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import MenuList from '@material-ui/core/MenuList/MenuList';
import React from 'react';
import { Input } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import * as UUID from 'uuid';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addStoryboard} from "../../redux/features/projectSlice";
import StoryboardGallery from "./StoryboardGallery";
import GalleryStepper from "./GalleryStepper";
import globalConfig from "../../globalConfig";
import {clearModifiedRecommend, resetDisplayRecommend, resetRecommend} from "../../redux/features/recommendSlice";
import Cookies from "js-cookie";
import NewStoryboardNameInput from "./NewStoryboardNameInput";

const NewStoryboardDialogue = props => {
    const {type} = props;
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [newStoryboardName, setNewStoryboardName] = React.useState("");
    const [current, setCurrent] = React.useState(0);
    const dispatch = useDispatch();
    const [cond1, setCond1] = React.useState(false)
    const [isCreateDisabled, setIsCreateDisabled] = React.useState(false)
    React.useEffect( () => {
        const cond1Calc = ["mbobbad", "wwang33", 'twprice', 'test1', 'test2', 'test3', 'test4',
            'kljone23', 'ggdallma', 'svegesa', 'jlrusse7', 'akjone23', 'cliu27', 'jarevoir', 'wlstell', 'mlmacdon',
            'nmbock2', 'jpsoutha', 'thkelley', 'jhsmith9', 'ndcovert', 'zxu16', 'eagodwin', 'imwilli2', 'jwjenni3',
            'mlmitch7', 'nbward', 'ptsmith4', 'smthomp7', 'sejeffe2', 'nbbailey', 'zmander2', 'mbautis2', 'cehandly',
            "wtmorga3",
            "ujkaraba",
            "slmclenn",
            "sechestn",
            "nrsoufan",
            "msevans5",
            "kghaley",
            "kbsitton",
            "jhcarlyl",
            "eemarsh",
            "delaseri",
            "cfveit",
            "btsek2",
            "aschenna",
            "antearry",
            "aahasan"
        ].includes(Cookies.get('userId'));
        setCond1(cond1Calc);

        }, []
    )

    React.useEffect( () => {
            if (cond1) {
                setIsCreateDisabled(newStoryboardName==="" || current < 2)
            }
            else {
                setIsCreateDisabled(newStoryboardName==="")
            }

        }, [newStoryboardName, current]
    )



    const showModal = e => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        dispatch(addStoryboard({
            type,
            storyboardName: newStoryboardName,
        }))
        setNewStoryboardName("");
        dispatch(clearModifiedRecommend());
        setCurrent(0);
        setIsModalVisible(false);
        dispatch(resetDisplayRecommend());
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        dispatch(resetDisplayRecommend());
    };

    return (
        <>
            <Modal
                width={globalConfig.storyboardModalWidth}
                title="New Storyboard"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={
                    { disabled: isCreateDisabled}
                }
                okText="Create"
                cancelText="Cancel"
                style={{top: globalConfig.storyboardTop}}
            >
                { cond1 &&
                <GalleryStepper
                    setNewStoryboardName={setNewStoryboardName}
                    current={current}
                    setCurrent={setCurrent}
                />
                }
                { !cond1 &&
                <NewStoryboardNameInput
                    setNewStoryboardName={setNewStoryboardName}
                />
                }

            </Modal>
            <Button
                type="ghost"
                shape="circle"
                style={{"float": "right", fontSize: "100%", color: "white"}}
                onClick={e => showModal(e)}
                icon={<PlusOutlined/>}
                />

        </>
    );
};

export default NewStoryboardDialogue;
