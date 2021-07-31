import React from 'react';
import {Transformer, Image} from 'react-konva';
import useImage from 'use-image';
import axios from "../../axiosConfig";
import {useDispatch} from "react-redux";

const StarImage = (props) => {
    const {starImageData, isSelected, onSelect, onChange} = props;
    // // console.log('starImageData: ', starImageData);
    const [image] = useImage(axios.defaults.baseURL + starImageData.prototypeId);
    // // console.log("image: ", image);
    if (image !== undefined) {
        starImageData.height = starImageData.width * image.height/image.width;
        image.crossOrigin = "Anonymous";
    }
    const imageRef = React.useRef(null);
    const transformerRef = React.useRef(null);
    React.useEffect(() => {
        if (isSelected && starImageData) {
            // we need to attach transformer manually
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
    return (
        <>
            <Image
                image={image}
                key={starImageData._id}
                {...starImageData}
                id={starImageData._id}
                onClick={onSelect}
                onTap={onSelect}
                draggable
                ref={imageRef}
                onDragEnd={(e) => {
                    onChange({
                        ...starImageData,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    const node = imageRef.current;
                    // to match the data better we will reset scale on transform end
                    // // // console.log("node.width: ", node.width());
                    // // // console.log("node.scaleX: ", node.scaleX());
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...starImageData,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(5, node.height() * scaleY),
                        transform: node.getAbsoluteTransform().getMatrix(),
                    });
                }}/>
            {isSelected && (
                <Transformer
                    ref={transformerRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};


export default StarImage;
