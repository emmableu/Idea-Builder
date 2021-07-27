import React, {useCallback, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import globalConfig from "../../globalConfig";
import axios from "../../axiosConfig";
import {Grid} from "@material-ui/core";
import SearchDialogImgCard from "./SearchDialogImgCard";
import InfiniteScroll from "react-infinite-scroll-component";



const SearchDialog = (props) => {
    const {_id, searchDialogOpen, handleClose, type, searchLoading, setSearchLoading} = props;
    //type can be "state" or "backdrop"
    // _id means either _id or backdropId
    const dialogLeft =  globalConfig.responsiveSizeData.storyboardDrawerWidth
        + globalConfig.panelTabsWidth
        + globalConfig.responsiveSizeData.actorDrawerWidth;
    const [imgList ,setImgList] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);
    const fullLength = 320;

    React.useEffect(
        () => {
            setSearchLoading(true);
            axios({
                method: 'get',
                url: `/sample_${type}_id_list/get/?page=${page}`,
            }).then(
                res => {
                    setImgList(res.data);
                    setSearchLoading(false);
                }
            )
        }, [searchDialogOpen]
    )

    const fetchMoreData = () => {
        if (imgList.length >= fullLength) {
            setHasMore(false);
            return;
        }
        setPage(page+1);
        axios({
            method: 'get',
            url: `/sample_${type}_id_list/get/?page=${page}`,
        }).then(
            res => {
                setImgList(imgList.concat(res.data));
            }
        )

    };


    const ImgRow = (props) => {
        const {index} = props;
        const imgSubList = imgList.slice(index*4, index*4+4);
        return (
            <Grid container spacing={1}>
                {
                    imgSubList.map(imgId => (
                        <Grid
                            item xs={3}
                            key={imgId}
                        >
                            <SearchDialogImgCard
                                type={type}
                                _id={_id}
                                imgId={imgId}
                                imgSrc={axios.defaults.baseURL + imgId}
                                heightToWidthRatio={'75%'}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        );
    }

    return (
        <div>
            <Dialog
                hideBackdrop
                disableEnforceFocus
                style={{ position: 'fixed',
                    top: 0,
                    left: dialogLeft - 8,
                    width: 600
                }}
                open={searchDialogOpen}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
                disableBackdropClick
            >
                {type === "state" && <DialogTitle id="dialog-title">Actor States</DialogTitle>}
                {type === "backdrop" && <DialogTitle id="dialog-title">Backdrops</DialogTitle>}
                <DialogContent>
                    <InfiniteScroll
                        dataLength={Math.floor(imgList.length/4)}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        height={400}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {[...Array(Math.floor(imgList.length/4)).keys()].map(
                            index => (
                                <ImgRow
                                    index={index} />
                            )
                        )}
                    </InfiniteScroll>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

//TODO: currently, searched images may have the same id, which is wrong.

export default SearchDialog
