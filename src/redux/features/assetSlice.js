// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
// import {ProjectDataHandler} from "../../data/ProjectData";
// import {ProjectAPI} from "../../api/ProjectAPI";
// import Cookies from "js-cookie";
// import {setPermanentViewMode} from "./modeSlice";
// import {loadProjectInMemory} from "./projectSlice";
// import axios from "../../axiosConfig";
//
// const loadAssets = createAsyncThunk(
//     'project/loadAssets',
//     async (payload, thunkAPI) => {
//         const {dispatch} = thunkAPI;
//         for (const typeName of ["state", "backdrop"]) {
//             axios({
//                 method: 'get',
//                 url: `/sample_${typeName}_id_list/get`,
//             }).then(
//                 res => {
//                     dispatch(setAsset({asset: res.data, typeName}));
//                 }
//             )
//         }
//         return "OK";
//     }
// )
//
// export const assetSlice = createSlice({
//     name: 'assetSlice',
//     initialState: {
//         value: {
//             state: [],
//             backdrop: [],
//         },
//     },
//     reducers: {
//         setAsset: (state, action) => {
//             const {asset, typeName} = action.payload;
//             state.value[typeName] = asset;
//             console.log("typeName: ", typeName, state.value[typeName])
//         },
//     },
// })
//
// export const {setAsset } = assetSlice.actions
// export default assetSlice.reducer
// export {
//     loadAssets,
// }
