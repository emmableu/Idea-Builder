import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import globalConfig, {globalLog} from "../../globalConfig";
import axios from "../../axiosConfig";
import {Grid} from "@material-ui/core";
import SearchDialogImgCard from "./SearchDialogImgCard";
import { FixedSizeList } from "react-window";


const ImgRow = React.memo(
    (props) => {
        globalLog("rendering imgRow: ");
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

const SearchDialog = (props) => {
    const {searchDialogOpen, handleClose, type, searchLoading, setSearchLoading} = props;
    //type can be "state" or "backdrop"
    const dialogLeft =  globalConfig.responsiveSizeData.storyboardDrawerWidth
        + globalConfig.panelTabsWidth
        + globalConfig.responsiveSizeData.actorDrawerWidth;
    const [imgList ,setImgList] = React.useState([]);

    React.useEffect(
        () => {
            setSearchLoading(true);
            axios({
                method: 'get',
                url: `/sample_${type}_id_list/get`,
            }).then(
                res => {
                    setImgList(res.data.sort());
                    setSearchLoading(false);
                }
            )
        }, [searchDialogOpen]
    )

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
                {type === "state" && <DialogTitle id="dialog-title">Actors</DialogTitle>}
                {type === "backdrop" && <DialogTitle id="dialog-title">Backdrops</DialogTitle>}
                <DialogContent>
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
