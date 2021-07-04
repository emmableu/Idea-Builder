import SpritePanelCardTitle from "./SpritePanelCardTitle";
import SpritePanelCardButtonGroup from "./SpritePanelCardButtonGroup";
import SpritePanelCardContent from "./SpritePanelCardContent";
import {Card} from "antd";
import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {magenta} from "@ant-design/colors";
import grey from "@material-ui/core/colors/grey";

const grid = 6;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? magenta[0] : grey[50],

    // styles we need to apply on draggables
    ...draggableStyle
});


const SpritePanelCard = React.memo((props) => {
    const {item, index} = props;
    return (

        <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
            )}
        >
            <Card
                hoverable
                size="small"
                title={<SpritePanelCardTitle/>}
                style={{ width: "100%" }}
                extra={<SpritePanelCardButtonGroup
                    {...provided.dragHandleProps}/>}>
                <SpritePanelCardContent/>
            </Card>

        </div>
    )}
</Draggable>
    )
});




















export default SpritePanelCard;
