import {Modal, Button, Space, Dropdown, notification} from 'antd';
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


const getStoryboardData = createSelector(
    state => state.project.value.selectedId.storyboardId,
    state => state.project.value.storyboardList,
    (storyboardId, storyboardList) => {
        if (storyboardId === null) {
            return {
                storyboardId: null,
                showCodeNotification: false,
                showRating:false,
            }
        }
        const s = storyboardList.find(s => s._id === storyboardId)
        const confidenceRating = s && s.confidenceRating ? s.confidenceRating: 0;
        const knowledgeRating = s && s.knowledgeRating ? s.knowledgeRating: 0;
        const usefulRating = s && s.usefulRating ? s.usefulRating: 0;
        const hasCode = !!(s && s.hasCode === true);
        let showRating = false;
        let showCodeNotification = false;
        if (confidenceRating === 0) {
            showRating = true;
        }
        if (hasCode === true && usefulRating === 0) {
            showCodeNotification = true;
        }
        return {
            storyboardId,
            showCodeNotification,
            showRating,
            confidenceRating,
            knowledgeRating,
        }
    }
);

const mapStateToProps = (state) => {
    return getStoryboardData(state)
};


const NewStoryboardDialogue = props => {
    // const storyboardId = useSelector(state =>  (state.project.value && state.project.value.selectedId) ?state.project.value.selectedId.storyboardId:null);
    const {storyboardId, showCodeNotification, showRating, confidenceRating, knowledgeRating} =  props;
    const {type} = props;
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [newStoryboardName, setNewStoryboardName] = React.useState("");
    const [current, setCurrent] = React.useState(0);
    const dispatch = useDispatch();
    const [cond1, setCond1] = React.useState(false)
    const [isCreateDisabled, setIsCreateDisabled] = React.useState(false)

    const handleChangeConfidence = (val) => {dispatch(saveRating({storyboardId, type:"confidenceRating", val}))};
    const handleChangeKnowledge = (val) => {dispatch(saveRating({storyboardId, type: "knowledgeRating", val}))};

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



    const showModal = () => {
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

    const openShowCodeNotification = () => {
        notification.open({
            message: 'Check Code for Current Storyboard',
            description:
                <>
                    <p>Before creating a new storyboard, check out code for this current storyboard first.</p>

                    <Tooltip title="Show Code for this Storyboard">
                        <Fab size="medium" color="secondary" aria-label="code"
                             onClick={() => {dispatch(getProgram(storyboardId));
                                 dispatch(setCodeModalOpen(true));
                             }}
                        >
                            <CodeIcon
                            />
                        </Fab>
                    </Tooltip>
                </>,
            onClick: () => {
                console.log('Notification Clicked!');
            },
            style:{top: 100}
        });
    };


    const openShowRatingNotification = () => {
        notification.open({
            message: 'Rate your current storyboard',
            description: <RatingPaper confidenceRating={confidenceRating} knowledgeRating={knowledgeRating} handleChangeConfidence={handleChangeConfidence} handleChangeKnowledge={handleChangeKnowledge} />,
            onClick: () => {
                console.log('Notification Clicked!');
            },
            style:{top: 100}
        });
    };

    const handleClick = () => {
        if (showCodeNotification) {
            openShowCodeNotification();
        }
        else if (showRating) {
            openShowRatingNotification();
        }
        else {
            showModal();
        }
    }

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
                onClick={handleClick}
                // onClick={e => showModal(e)}
                icon={<PlusOutlined/>}
                />

        </>
    );
};

// export default NewStoryboardDialogue;
export default connect(mapStateToProps)(NewStoryboardDialogue);
