import React from "react";
import {Button, Card, Select, Avatar} from 'antd';
import { Menu, Dropdown } from 'antd';
import {DownOutlined, PlusOutlined, ArrowRightOutlined, DeleteOutlined, EllipsisOutlined} from '@ant-design/icons';
import {getBoxStyle} from "../ActorPanel/ActorPanel";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import globalConfig from "../../../globalConfig";
import './SpeechBubble.css'
import SpeechBubbleEdiText from "./SpeechBubbleEdiText";

const Option = Select;
const { Meta } = Card;


const SpeechBubble = (props) => {
    return  (
        <>
            <div className={`bubble-container left`} key={0}>
                <div className={`bubble me`}>
                    <SpeechBubbleEdiText/>


                </div>
            </div>
    </>)
}



const SpeechBubbleAfter = (props) => {
    return (
        <div style={{
                content: "''",
                position: "absolute",
                display: "block",
                width: "0",
                zIndex: "3",
                borderStyle: "solid",
                borderColor: "transparent #000000",
                borderWidth: "20px 20px 20px 0",
                top: "50%",
                left: "-20px",
                marginTop: "-20px",
        }}>

        </div>
    )
}



export const SpeechBubblePanel = () => {

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return (
            <>
                <Box style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: globalConfig.addNewActorBoxHeight + 30,
                    backgroundColor: grey[50]
                }}>
                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                    >
                        Add a new bubble
                    </Button>
                </Box>
                <Box style={{
                    display: "flex",
                    justifyContent: "center",
                    height: `calc(100vh - ${globalConfig.toolBarHeight}px
                         - ${globalConfig.storyboardToolBarHeight}px
                        - ${globalConfig.addNewActorBoxHeight}px
                         - ${globalConfig.storyboardPageMargin*2}px)`,
                    backgroundColor: grey[50],
                    padding: "0px 10px"
                }}>
                <Card
                     size="small"
                     style={{
                         width: globalConfig.responsiveSizeData.actorDrawerWidth - 20,
                         height: "fit-content",
                     }}
                      actions={[
                          <EllipsisOutlined key="ellipsis" />,
                          <ArrowRightOutlined key="use"/>,
                          <DeleteOutlined key="delete" />
                      ]}
                >
                    <div style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                    }}>
                            <Select
                                    defaultValue="lucy"
                                    size="large"
                                    style={{ flex: "0 0 50px",
                                        padding: "15px 0 0 0",
                                        marginLeft: "-10px",
                                    }}

                                    bordered={false}>
                                <Option value="jack">
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </Option>
                                <Option value="lucy">
                                    <Avatar src="http://127.0.0.1:1000/static/sample/state/animal-236-450379____91af4522-6264-49c7-bdc5-569b0e6b3be1.png"/>
                                </Option>
                            </Select>
                        <SpeechBubble
                            style={{flexGrow: 1}}
                        />
                    </div>
                </Card>
                </Box>
            </>
    )
}


