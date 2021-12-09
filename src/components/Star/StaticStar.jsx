import React from "react"
import {Image, Layer, Stage, Group, Line} from 'react-konva';
import useImage from "use-image";
import axios from "../../axios/ideaServerAxiosConfig";
import {StarDataHandler} from "../../data/StarData";

export const StaticStarUnit = (props) => {
    const {starData} = props;
    // console.log("starData: ", starData)
    const [image] = useImage(axios.defaults.baseURL + starData.prototypeId)
    if (image !== undefined) {
        image.crossOrigin = "Anonymous";
    }
    const starRef = React.useRef(null);
    React.useEffect(() => {
        if (starRef.current!==null) {
            starRef.current.listening(false);
        }
    }, [])
    return (
        <Image
            ref={starRef}
            image={image}
            key={starData._id}
            {...starData}
        />
    )
}

const StaticStar = (props) => {
    const {starData} = props;

    return (
        <>
            {StarDataHandler.isChildStarEmpty(starData) &&
            <StaticStarUnit
                starData={starData}
            />
            }
            {
                StarDataHandler.isChildStarEmpty(starData) === false &&
                <Group>
                    {
                        starData.childStar.motionStarList.length > 0 &&
                        (
                            <>
                                {starData.childStar.motionStarList.map((starData) => {
                                    return (
                                        <StaticStarUnit
                                            key={starData._id}
                                            starData={starData}
                                        />
                                    );
                                })}
                            </>
                        )
                    }
                    <StaticStarUnit
                        starData={starData}
                    />
                    {
                        starData.childStar.speechStar !== null &&
                        <StaticStarUnit
                            starData={starData.childStar.speechStar}
                        />
                    }
                    {
                        starData.childStar.lineStar !== null &&
                        <Line
                            key={"line"}
                            points={starData.childStar.lineStar.points}
                            stroke="black"
                            strokeWidth={2}
                            tension={0.5}
                            lineCap="round"
                            globalCompositeOperation={
                                'source-over'
                            }
                        />
                    }

                </Group>
            }

        </>
    )
}


export default StaticStar;
