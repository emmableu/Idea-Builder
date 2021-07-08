import ActorPanelCardTitle from "./ActorPanelCardTitle";
import ActorPanelCardButtonGroup from "./ActorPanelCardButtonGroup";
import ActorPanelCardContent from "./ActorPanelCardContent";
import {Card} from "antd";
import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {magenta} from "@ant-design/colors";
import grey from "@material-ui/core/colors/grey";



const ActorPanelCard = React.memo((props) => {
    const {uuid} = props;
    return (
            <Card
                hoverable
                size="small"
                title={<ActorPanelCardTitle uuid={uuid}/>}
                style={{ width: "100%" }}
                extra={<ActorPanelCardButtonGroup
                    {...props}/>}>
                <ActorPanelCardContent uuid={uuid}/>
            </Card>


    )
});

export default ActorPanelCard;
