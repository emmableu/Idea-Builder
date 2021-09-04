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
import AssetGallery from "./AssetGallery";
import {useSelector} from "react-redux";
import NewActorDialogue from "./NewActorDialogue";


// const getImgList = createSelector(
//     state => state.asset.value,
//     (asset) => ({asset})
// )

const SearchDialog = (props) => {
    const {searchDialogOpen, handleClose, type} = props;
    //type can be "state" or "backdrop"
    const dialogLeft =  globalConfig.responsiveSizeData.storyboardDrawerWidth
        + globalConfig.panelTabsWidth
        + globalConfig.responsiveSizeData.actorDrawerWidth;

    const imgList = useSelector(state => state.asset.value[type]);

    return (
        <div>
            <Dialog
                hideBackdrop
                disableEnforceFocus
                style={{
                    top: 0,
                    left: dialogLeft - 8,
                    width: 600
                }}
                open={searchDialogOpen}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
                // disableBackdropClick
            >
                {type === "state" && <DialogTitle id="dialog-title">Actors</DialogTitle>}
                {type === "backdrop" && <DialogTitle id="dialog-title">Backdrops</DialogTitle>}
                <DialogContent>
                    <AssetGallery
                        type={type}
                        imgList={imgList}
                    />
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
