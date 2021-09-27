// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
// import {ProjectDataHandler} from "../../data/ProjectData";
// import {ProjectAPI} from "../../api/ProjectAPI";
// import Cookies from "js-cookie";
// import {setPermanentViewMode} from "./modeSlice";
// import {loadProjectInMemory} from "./projectSlice";
// import axios from "../../axiosConfig";
// import {addRecommend} from "./recommendSlice";
//
//
//
// export const allRecommendSlice = createSlice({
//     name: 'allRecommendSlice',
//     initialState: {
//         value: {
//             state: [],
//             backdrop: [],
//         },
//     },
//     reducers: {
//         setAllRecommend: (state, action) => {
//             const {allRecommend, typeName} = action.payload;
//             state.value[typeName] = allRecommend;
//             console.log("typeName: ", typeName, state.value[typeName])
//         },
//     },
// })
//
// export const {setAllRecommend } = allRecommendSlice.actions
// export default allRecommendSlice.reducer
// export {
//     loadAllRecommend,
// }
