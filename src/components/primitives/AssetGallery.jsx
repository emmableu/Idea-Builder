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
        const {type, imgList} = data;
        const subList = imgList.slice(index*6, index*6+6);
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
                            item xs={2}
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
    const {type, height} = props;
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
            <FixedSizeList
                className="List"
                height={height}
                itemCount={Math.floor(imgList.length/6)}
                itemSize={140}
                width="100%"
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
