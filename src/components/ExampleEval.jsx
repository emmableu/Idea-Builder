// import {connect, useDispatch, useSelector} from "react-redux";
// import axios from "../axios/ideaTranslatorAxiosConfig";
// import {Image, Modal, Button, Rate} from 'antd';
// import React from "react";
// import { Spin, Alert } from 'antd';
// import globalConfig from "../globalConfig";
// import {setCodeEvalOpen} from "../redux/features/codeSlice";
// import {createSelector} from "reselect";
// import {saveRating} from "../redux/features/projectSlice";
//
// //
// // const getRating = createSelector(
// //     state => state.project.value.selectedId.storyboardId,
// //     state => state.project.value.storyboardList,
// //     (storyboardId, storyboardList) => {
// //         if (storyboardId === null) {
// //             return {
// //                 storyboardId: null,
// //                 usefulRating: 0,
// //             }
// //         }
// //         const s = storyboardList.find(s => s._id === storyboardId)
// //         const usefulRating = s && s.usefulRating ? s.usefulRating: 0;
// //         return {
// //             storyboardId: storyboardId,
// //             usefulRating,
// //         }
// //     }
// // );
// //
// // const mapStateToProps = (state) => {
// //     return getRating(state)
// // };
//
//
// const ExampleEval = (props) => {
//     const {storyboardId} = props;
//     const codeEvalOpen = useSelector(s => s.code.codeEvalOpen);
//     const dispatch = useDispatch();
//     const [currentVal, setCurrentVal] = React.useState(0);
//
//     const handleChangeUseful = (val) => {dispatch(saveRating({storyboardId, type: "usefulRating", val}))};
//
//     const handleClose = () => {
//         dispatch(setCodeEvalOpen(false));
//         setCurrentVal(0);
//     }
//     return (
//         <>
//             <Modal title="ExampleEval for this storyboard" visible={codeEvalOpen}
//                    style={{ top: 60 }}
//                    footer={[
//                        <Button key="ok" type="primary" onClick={handleClose}>
//                            OK
//                        </Button>]}
//                    onCancel={() => {dispatch(setCodeEvalOpen(false))}}
//             >
//                 <div>
//                     <p>How useful did you find this example? </p>
//                     <span>&nbsp;&nbsp;&nbsp;very unhelpful</span><Rate onChange={handleChangeUseful} value={currentVal}/><span>&nbsp;&nbsp;&nbsp;very helpful</span>
//                 </div>
//             </Modal>
//
//         </>
//
//     )
// }
//
// export default ExampleEval;
// // export default connect(mapStateToProps)(ExampleEval);
