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


// const getStoryboardData = createSelector(
//     state => state.project.value.selectedId.storyboardId,
//     state => state.project.value.storyboardList,
//         state => state.project.value.storyboardMenu,
//     (storyboardId, storyboardList,storyboardMenu) => {
//         if (storyboardId === null) {
//             return {
//                 storyboardId: null,
//                 showCodeNotification: false,
//                 showRating:false,
//                 confidenceRating:0,
//                 knowledgeRating:0,
//             }
//         }
//
//         const {showRating, showCodeNotification, confidenceRating, knowledgeRating} = ProjectDataHandler.calcNotification(storyboardId, storyboardList, storyboardMenu);
//
//
//         return {
//             storyboardId,
//             showCodeNotification, ///change this to just showCodeNotification after dev
//             showRating, //change this to just showRating after dev
//             confidenceRating,
//             knowledgeRating,
//         }
//     }
// );
//
// const mapStateToProps = (state) => {
//     return getStoryboardData(state)
// };


const NewStoryboardDialogue = props => {
    // const storyboardId = useSelector(state =>  (state.project.value && state.project.value.selectedId) ?state.project.value.selectedId.storyboardId:null);
    // const {storyboardId, showCodeNotification, showRating, confidenceRating, knowledgeRating} =  props;
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
        const cond1Calc = true;
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


    // const handleChangeConfidence = (val) => {dispatch(saveRating({storyboardId, type:"confidenceRating", val}))};
    // const handleChangeKnowledge = (val) => {dispatch(saveRating({storyboardId, type: "knowledgeRating", val}))};
    //
    //
    // const openShowCodeNotification = () => {
    //     notification.open({
    //         message: 'Check Code for Current Storyboard',
    //         description:
    //             <>
    //                 <p>Before creating a new storyboard, check out code for this current storyboard first.</p>
    //
    //                 <Tooltip title="Show Code for this Storyboard">
    //                     <Fab size="medium" color="secondary" aria-label="code"
    //                          onClick={() => {dispatch(getProgram(storyboardId));
    //                              dispatch(setCodeModalOpen(true));
    //                          }}
    //                     >
    //                         <CodeIcon
    //                         />
    //                     </Fab>
    //                 </Tooltip>
    //             </>,
    //         style:{top: 100}
    //     });
    // };
    //
    //
    // const openShowRatingNotification = () => {
    //     notification.open({
    //         message: 'Rate your current storyboard',
    //         description:
    //             <Paper  style={{padding: "10px 10px", margin:"0px 0px"
    //             }} variant="outlined">
    //                 <p style={{color:"grey", fontStyle:"italic"}}>
    //                     Rate from strongly disagree to strongly agree:
    //                 </p>
    //                 <li>I feel confident I can turn this storyboard's idea into <i>Snap!</i> code.</li>
    //                 <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Rate onChange={handleChangeConfidence} defaultValue={confidenceRating}/>
    //                 <li>I could apply some cool coding knowledge to make this!</li>
    //                 <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Rate onChange={handleChangeKnowledge} defaultValue={knowledgeRating}/>
    //             </Paper>
    //             ,
    //         style:{top: 100}
    //     });
    // };
    //
    // const handleClick = () => {
    //     if (showCodeNotification) {
    //         openShowCodeNotification();
    //     }
    //     else if (showRating) {
    //         openShowRatingNotification();
    //     }
    //     else {
    //         showModal();
    //     }
    // }

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
