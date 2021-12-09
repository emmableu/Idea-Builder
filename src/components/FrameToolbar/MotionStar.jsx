import useImage from "use-image";
import axios from "../../axios/ideaServerAxiosConfig";
import {Image} from "react-konva";
import React from "react";

export const MotionStar = (props) => {
    const {starData} = props;
    const [image] = useImage(axios.defaults.baseURL + starData.prototypeId)
    return (
        <Image
            image={image}
            key={starData._id}
            {...starData}
        />
    )
}
