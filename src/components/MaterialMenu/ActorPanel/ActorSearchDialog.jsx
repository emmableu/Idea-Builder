import React from 'react'
import ActorGallery from "./ActorGallery";
import {Input, Modal} from "antd";


// const getImgList = createSelector(
//     state => state.asset.value,
//     (asset) => ({asset})
// )

const ActorSearchDialog = (props) => {
    const {searchDialogOpen, addAs, handleClose, type, actorId,} = props;
    //type can be "state" or "backdrop"

    return (
        <div>
            <Modal
                width={900}
                title={type==="state" || type === "actorSearch"? "Actors":"Backdrops"}
                visible={searchDialogOpen}
                onOk={handleClose}
                onCancel={handleClose}
                cancelText="Cancel"
                centered
            >
                <ActorGallery
                    height={600}
                    xs={4}
                    type={type}
                    actorId={actorId}
                />
            </Modal>


        </div>
    )

}

//TODO: currently, searched images may have the same id, which is wrong.

export default ActorSearchDialog
