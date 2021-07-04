import SpritePanelCardTitle from "./SpritePanelCardTitle";
import SpritePanelCardButtonGroup from "./SpritePanelCardButtonGroup";
import SpritePanelCardContent from "./SpritePanelCardContent";
import {Card} from "antd";
import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {magenta} from "@ant-design/colors";
import grey from "@material-ui/core/colors/grey";



const SpritePanelCard = React.memo((props) => {
    return (


            <Card
                hoverable
                size="small"
                title={<SpritePanelCardTitle/>}
                style={{ width: "100%" }}
                extra={<SpritePanelCardButtonGroup
                    {...props}/>}>
                <SpritePanelCardContent/>
            </Card>


    )
});

export default SpritePanelCard;
