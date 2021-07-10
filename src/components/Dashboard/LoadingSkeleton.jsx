import {Skeleton} from "antd";
import React from "react";

const LoadingSkeleton = () => {
    return <>
        <br /> <br /> <br />
        <Skeleton active={true} round={true} paragraph={{ rows: 5}}/>
    </>
}

export {LoadingSkeleton}
