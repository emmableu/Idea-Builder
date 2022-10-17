import { Tabs } from 'antd';
import {Grid} from "@material-ui/core";
import React from 'react'
import {gifTypes} from "../../../json/actorAssetData";
import {genGifStates} from "../../../json/actorAssetData";
import ActorImgCard from "./ActorImgCard";
import ActorGalleryButton from "./ActorGalleryButton";

const ActorGallery = React.memo((props) => {
    const {type, height, xs, actorId} = props;
    let {itemSize} = props;
    if (itemSize === undefined) {
        itemSize = xs===2? 150:200;
    }
    const gifStates = genGifStates();


    return (
        <div
            style={{
                margin: "20px 0",
            }}
        >
            <Tabs>
                {
                    gifTypes.map((typ, i) => (
                        <Tabs.TabPane tab={typ.name} key={i}>
                            <Grid container spacing={1} justifyContent="center">
                            {typ.gifs.map(
                                (g, j) => {
                                    const actorData = gifStates[g];
                                    return (
                                        <ActorImgCard
                                            actorName={actorData.name}
                                            title = {actorData.name}
                                            type={type}
                                            buttonGroup={<ActorGalleryButton
                                                actorId={actorId}
                                                actorData={actorData}
                                            />}
                                            actorId={actorData._id}
                                            dataList = {actorData.stateList}
                                            imgWidth={4}
                                            handleSave={null}
                                            handleDelete={null}
                                            handleUse={null}
                                            ratio="100%"
                                            textContent={""}
                                            readOnly={true}
                                        />
                                        )

                                }
                            )}
                            </Grid>
                        </Tabs.TabPane>
                    ))
                }
            </Tabs>
        </div>
    )
});

export default ActorGallery;
