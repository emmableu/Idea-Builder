import React from 'react'
import axios from "../../axiosConfig";
import {Grid} from "@material-ui/core";
import SearchDialogImgCard from "./SearchDialogImgCard";
import { FixedSizeList } from "react-window";


const ImgRow = React.memo(
    (props) => {
        const {data, index, style} = props;
        const {type, imgList} = data;
        const subList = imgList.slice(index*4, index*4+4);
        return (
            <Grid
                style={style}
                container
                spacing={1} >
                {
                    subList.map(imgId => (
                        <Grid
                            item xs={3}
                            key={imgId}
                        >
                            <SearchDialogImgCard
                                type={type}
                                imgId={imgId}
                                imgSrc={axios.defaults.baseURL + imgId}
                                heightToWidthRatio={'75%'}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        )
    }
)

const AssetGallery = React.memo((props) => {
    const {type, imgList} = props;
    console.log("imgList: ", imgList);
    return (
            <FixedSizeList
                className="List"
                height={600}
                itemCount={Math.floor(imgList.length/4)}
                itemSize={140}
                width={480}
                itemData = {{
                    type,
                    imgList}
                }
            >
                {ImgRow}
            </FixedSizeList>
    )
});

//TODO: currently, searched images may have the same id, which is wrong.

export default AssetGallery;
