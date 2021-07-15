// import React from 'react';
// import axios from '../../axiosConfig'
// import Star from "../Star/Star.jsx";
// import {Image, Layer} from 'react-konva';
// import useImage from "use-image";
// import backdropImg from ".//Frame";
// import {useDispatch, useSelector} from 'react-redux';
//
//
// const StarLayerOld = (props) => {
//     const {frameRef, layerHeight, copiedActorData} = props;
//     const [backdropImage] = useImage('images/'+backdropImg.imgSrc);
//     const [selectedId, setSelectedId] = React.useState(null);
//     const [actorData, setActorData] = React.useState([]);
//     const [dataReceived, setDataReceived] = React.useState(false);
//     const dispatch = useDispatch();
//     const selectedFrame = useSelector((state) => state.project.value.selectedId.frameId);
//
//
//     React.useEffect(() => {
//         setActorData(concatCopied(actorData, copiedActorData));
//     }, [copiedActorData]);
//
//     React.useEffect(() => {
//         axios({
//             method: 'get',
//             url: `/frames/${selectedFrame}/get`,
//         }).then(response =>
//             {
//                 const responseActorData = response.data.frames[selectedFrame.toString()].actors;
//                 const newActorData = responseActorData.map((d) => ({
//                     key:d.key,
//                     name: d.name,
//                     id:d.id,
//                     "x": d.x,
//                     "y": d.y,
//                     'width':d.width,
//                     'height':d.height,
//                 }));
//                 setActorData(newActorData);
//                 setDataReceived(true);
//             }
//         );
//     }, [selectedFrame]);
//
//     React.useEffect(() => {
//         if (actorData.length === 0 || dataReceived === false) {
//             return;
//         }
//         axios(
//             {
//                 method: 'post',
//                 url: `/frames/${selectedFrame}/actors/update`,
//                 data: {
//                     boardData: actorData
//                 }
//             }
//         );
//
//         if (frameRef!==undefined) {
//             axios(
//                 {
//                     method: 'post',
//                     url: `/frames/${selectedFrame}/base64/update`,
//                     data: {
//                         base64: frameRef.current.toDataURL({ pixelRatio: 0.5})
//                     }
//                 }
//             ).then(
//                 setTimeout(
//                     () => {dispatch(updateFrameThumbnailStateActionCounter());},
//                     50)
//             )
//         }
//
//     }, [actorData]);
//
//     const concatCopied = (actorData, copiedActorData) => {
//         // // // console.log('copiedActorData: ', copiedActorData);
//         const actorDataKeys = actorData.map((a) => a.key);
//         // // // console.log('actorDataKeys: ', actorDataKeys);
//         const newArray = [...actorData]
//         copiedActorData.forEach(
//             (d) => {
//                 if (!actorDataKeys.includes(d.key)){
//                     // // // console.log(newArray);
//                     newArray.push(d);
//                 }
//             }
//         )
//         return newArray;
//     };
//
//
//
//     const checkDeselect = (e) => {
//         // deselect when clicked on empty area
//         // // // console.log('e.target: ', e.target.id());
//         // // // console.log('e.target.id: ', !actorData.map(a => a.id).includes(e.target.id()));
//         const clickedOnEmpty = e.target.id()==="backdrop";
//         if (clickedOnEmpty) {
//             setSelectedId(null);
//         }
//     };
//
//     return (
//         <>
//         <Layer
//             width={layerHeight*4/3}
//             height={layerHeight}
//             onMouseDown={checkDeselect}
//             onTouchStart={checkDeselect}
//         />
//         <Layer
//             x={layerHeight*4/3*0.1}
//             y={layerHeight*0.1}
//             width={layerHeight*4/3*0.8}
//             height={layerHeight*0.8}
//             onMouseDown={checkDeselect}
//             onTouchStart={checkDeselect}
//         >
//             <Image image={backdropImage} id="backdrop" width={layerHeight*4/3*0.8} height={layerHeight*0.8}/>
//             {actorData.map((img, i) => {
//                 return (
//                     <Star
//                         starData={img}
//                         isSelected={img.id === selectedId}
//                         onSelect={() => {
//                             setSelectedId(img.id);
//                         }}
//                         onChange={(newAttrs) => {
//                             const rects = actorData.slice();
//                             rects[i] = newAttrs;
//                             setActorData(rects);
//                         }}
//                     />
//                 );
//             })}
//         </Layer>
//             </>
//     );
// };
//
//
// export default StarLayerOld;
