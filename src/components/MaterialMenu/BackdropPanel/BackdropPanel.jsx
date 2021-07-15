import BackdropPanelCardButtonGroup from "./BackdropPanelCardButtonGroup";
import BackdropPanelCardContent from "./BackdropPanelCardContent";
import {Card} from "antd";
import React from "react";



const BackdropPanelCard = React.memo((props) => {
    return (
        <Card
            title="My backdrops"
            size="small"
            style={{ width: "100%" }}
            extra={<BackdropPanelCardButtonGroup
                {...props}/>}>
            <BackdropPanelCardContent/>
        </Card>


    )
});

export default BackdropPanelCard;
