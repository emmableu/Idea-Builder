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
import {Input, Modal} from "antd";


// const getImgList = createSelector(
//     state => state.asset.value,
//     (asset) => ({asset})
// )

const SearchDialog = (props) => {
    const {searchDialogOpen, addAs, handleClose, type, actorId,} = props;
    //type can be "state" or "backdrop"

    return (
        <div>
            <Modal
                width={900}
                title={type==="state"? "Actors":"Backdrops"}
                visible={searchDialogOpen}
                onOk={handleClose}
                onCancel={handleClose}
                cancelText="Cancel"
                centered
            >
                <AssetGallery
                    height={600}
                    xs={type==="state"? 2:3}
                    type={type}
                    actorId={actorId}
                />
            </Modal>


        </div>
    )

}

//TODO: currently, searched images may have the same id, which is wrong.

export default SearchDialog
