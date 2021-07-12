import {Stage} from "react-konva";
import React from "react";
import {Provider, ReactReduxContext} from "react-redux";
import Paper from "@material-ui/core/Paper/Paper";
import StarLayer from "./StarLayer";

const Frame = (props) => {
    const {width} = props;
    return (

        <ReactReduxContext.Consumer>
            {({ store }) => (
        <Stage
            width={width}
            height={(width * 3) / 4}
            backgroundColor="yellow">
            <Provider store={store}>
                <StarLayer/>
            </Provider>
        </Stage>)}
        </ReactReduxContext.Consumer>
    )
}


export default Frame;
