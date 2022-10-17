import React from 'react'
import AssetGallery from "./AssetGallery";
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
