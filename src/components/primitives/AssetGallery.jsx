import React from 'react'
import axios from "../../axiosConfig";
import {Grid, makeStyles} from "@material-ui/core";
import SearchDialogImgCard from "./SearchDialogImgCard";
import { FixedSizeList } from "react-window";
import {useSelector} from "react-redux";
import {setAsset} from "../../redux/features/assetSlice";

const ImgRow = React.memo(
    (props) => {
        const {data, index, style} = props;
        const {type, imgList, xs} = data;
        const subList = imgList.slice(index*(12/xs), index*(12/xs)+(12/xs));
        return (
            <Grid
                style={{...style,
                    padding: "10px 20px"
                }}
                container
                spacing={1} >
                {
                    subList.map(imgId => (
                        <Grid
                            item xs={xs}
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
    const {type, height, xs} = props;
    let {itemSize} = props;
    if (itemSize === undefined) {
        itemSize = xs===2? 150:200;
    }
    // const imgList = useSelector(state => state.asset.value[type]);
    const [imgList, setImgList] = React.useState([]);
    React.useEffect(
        () => {
            axios({
                method: 'get',
                url: `/sample_${type}_id_list/get`,
            }).then(
                res => {
                    console.log("res.data!!!!!!")
                    setImgList(res.data);
                }
            )
        }, []
    )

    return (
        <div
            style={{
                margin: "20px 0",
            }}
        >
            <FixedSizeList
                className="List"
                height={height}
                itemCount={Math.floor(imgList.length/(12/xs))}
                itemSize={itemSize}
                width="100%"
                itemData = {{
                    type,
                    imgList,
                    xs
                }}
            >
                {ImgRow}
            </FixedSizeList>
        </div>
    )
});

//TODO: currently, searched images may have the same id, which is wrong.

export default AssetGallery;