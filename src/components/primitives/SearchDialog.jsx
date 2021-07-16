import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import globalConfig from "../../globalConfig";
import axios from "../../axiosConfig";
import {Grid} from "@material-ui/core";
import ActorPanelCardContentImgTile from "../MaterialMenu/ActorPanel/ActorPanelCard/ActorPanelCardContentImgTile";
import SearchDialogImgCard from "./SearchDialogImgCard";
import ActorImgCard from "../MaterialMenu/ActorPanel/ActorPanelCard/ActorImgCard";
// import Draggable from 'react-draggable'

// function PaperComponent(props) {
//     return (
//         <Draggable>
//             <Paper {...props} />
//         </Draggable>
//     )
// }

const SearchDialog = (props) => {
    const {_id, searchDialogOpen, handleClose, type} = props;
    //type can be "state" or "backdrop"
    // _id means either _id or backdropId
    const dialogLeft =  globalConfig.responsiveSizeData.storyboardDrawerWidth
                            + globalConfig.panelTabsWidth
                            + globalConfig.responsiveSizeData.actorDrawerWidth;
    const [imgList ,setImgList] = React.useState([]);

    React.useEffect(
        () => {
            axios({
                method: 'get',
                url: `/sample_${type}_id_list/get`,
            }).then(
                res => {
                    setImgList(res.data)
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
                    {type === "state" && <DialogTitle id="dialog-title">Actor States</DialogTitle>}
                    {type === "backdrop" && <DialogTitle id="dialog-title">Backdrops</DialogTitle>}
                    <DialogContent>
                        <Grid container spacing={1} >
                            {imgList.map(imgId => (
                                <>
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
                                </>
                            ))}
                        </Grid>
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
