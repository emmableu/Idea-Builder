import React from "react";
import {Button, Card, Select, Avatar, Input, Modal} from 'antd';
import {useDispatch} from "react-redux";
import {MotionStage} from "./MotionStage";
import {updateStarList} from "../../redux/features/projectSlice";
import * as UUID from "uuid";
import useImage from "use-image";
import axios from "../../axiosConfig";
import {Image} from "react-konva";

const MotionStar = (props) => {
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

export const MotionModal = (props) => {
    const {storyboardId, frameId, selectedStar, selectedActor, backdropStar, isModalVisible, setIsModalVisible,
        setHasMotion, starList,
    } = props;
    const [tempMotionStarList, setTempMotionStarList] = React.useState([]);
    const [points, setPoints] = React.useState([]);
    const dispatch = useDispatch();

    const handleOk = React.useCallback(() => {
        const newStarData = {
            ...selectedStar,
            childStar: {
                speechStar: selectedStar.childStar.speechStar,
                lineStar: {
                    _id: UUID.v4(),
                    points: points,
                },
                motionStarList: tempMotionStarList,
            }
        }
        dispatch(updateStarList(
            {
                storyboardId, frameId,
                starData: newStarData
            }
        ));
        setIsModalVisible(false);
    }, [])


    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            {selectedStar !== null && selectedActor !== undefined && selectedActor !== null &&
            <Modal
                title={"Record motion for " + selectedActor.name}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Add motion"
                cancelText="Cancel"
            >
                <MotionStage
                    frameId={frameId}
                    backdropStar={backdropStar}
                    starList={starList}
                    selectedStar={selectedStar}
                    setHasMotion={setHasMotion}
                    tempMotionStarList={tempMotionStarList}
                    setTempMotionStarList={setTempMotionStarList}
                    points={points}
                    setPoints={setPoints}
                />
            </Modal>
            }


        </>
    )
}


