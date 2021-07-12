import React from 'react';
import actorImg from './Stars.json';
import {Transformer, Image} from 'react-konva';
import useImage from 'use-image';

const Star = (props) => {
    const {shapeProps, isSelected, onSelect, onChange} = props;
    // console.log('shapeProps: ', shapeProps);
    // const [image] = useImage('images/' + actorImg.filter((e) => e.name===shapeProps.name)[0].imgSrc);
    const [image] = useImage('http://localhost:1000/static/5a8dd875-2dd4-4d47-b1e4-5c3a3d6322e7.png');
    const imageRef = React.useRef(null);
    const transformerRef = React.useRef(null);
    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
    return (
        <>
            <Image
                image={image}
                key={shapeProps.key}
                {...shapeProps}
                id={shapeProps.name}
                onClick={onSelect}
                onTap={onSelect}
                draggable
                ref={imageRef}
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
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
                    // console.log("node.width: ", node.width());
                    // console.log("node.scaleX: ", node.scaleX());
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(5, node.height() * scaleY),
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


export default Star;
