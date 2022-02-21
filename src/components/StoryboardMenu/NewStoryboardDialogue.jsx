import {Modal, Button, Space, Dropdown, notification, Rate} from 'antd';
import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import MenuList from '@material-ui/core/MenuList/MenuList';
import React from 'react';
import { Input } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import * as UUID from 'uuid';
import { useRouteMatch, useHistory } from 'react-router-dom';
import {useDispatch, useSelector, connect} from 'react-redux';
import {addStoryboard, saveRating} from "../../redux/features/projectSlice";
import StoryboardGallery from "./StoryboardGallery";
import GalleryStepper from "./GalleryStepper";
import globalConfig from "../../globalConfig";
import {clearModifiedRecommend, resetDisplayRecommend, resetRecommend} from "../../redux/features/recommendSlice";
import Cookies from "js-cookie";
import NewStoryboardNameInput from "./NewStoryboardNameInput";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import {getProgram, setCodeModalOpen} from "../../redux/features/codeSlice";
import CodeIcon from "@material-ui/icons/Code";
import {createSelector} from "reselect";
import RatingPaper from "../NoteBox/RatingPaper";
import Paper from "@material-ui/core/Paper";
import {ProjectDataHandler} from "../../data/ProjectData";
import NotificationHOC from "../Code/NotificationHOC";


const NewStoryboardDialogue = props => {
    const {type} = props;
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [newStoryboardName, setNewStoryboardName] = React.useState("");
    const [current, setCurrent] = React.useState(0);
    const dispatch = useDispatch();
    const [cond1, setCond1] = React.useState(false)
    const [isCreateDisabled, setIsCreateDisabled] = React.useState(false)

    React.useEffect( () => {
        // const cond1Calc = ["mbobbad", "wwang33", 'twprice', 'test1', 'test2', 'test3', 'test4',
        //     'kljone23', 'ggdallma', 'svegesa', 'jlrusse7', 'akjone23', 'cliu27', 'jarevoir', 'wlstell', 'mlmacdon',
        //     'nmbock2', 'jpsoutha', 'thkelley', 'jhsmith9', 'ndcovert', 'zxu16', 'eagodwin', 'imwilli2', 'jwjenni3',
        //     'mlmitch7', 'nbward', 'ptsmith4', 'smthomp7', 'sejeffe2', 'nbbailey', 'zmander2', 'mbautis2', 'cehandly',
        //     "wtmorga3",
        //     "ujkaraba",
        //     "slmclenn",
        //     "sechestn",
        //     "nrsoufan",
        //     "msevans5",
        //     "kghaley",
        //     "kbsitton",
        //     "jhcarlyl",
        //     "eemarsh",
        //     "delaseri",
        //     "cfveit",
        //     "btsek2",
        //     "aschenna",
        //     "antearry",
        //     "aahasan"
        // ].includes(Cookies.get('userId'));
        const cond1Calc = true; // FOR dev, set as false, need to change to true.
        setCond1(cond1Calc);

        }, []
    )

    React.useEffect( () => {
            if (cond1) {
                setIsCreateDisabled(newStoryboardName==="" || current < 1)
            }
            else {
                setIsCreateDisabled(newStoryboardName==="")
            }

        }, [newStoryboardName, current]
    )



    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        await dispatch(addStoryboard({
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

            <NotificationHOC normalHandleClick={showModal}>
                {
                    handleClick => (<Button
                        type="ghost"
                        shape="circle"
                        style={{"float": "right", fontSize: "100%", color: "white"}}
                        onClick={handleClick}
                        // onClick={e => showModal(e)}
                        icon={<PlusOutlined/>}
                    />)
                }

            </NotificationHOC>
        </>
    );
};

// export default NewStoryboardDialogue;
export default NewStoryboardDialogue;
