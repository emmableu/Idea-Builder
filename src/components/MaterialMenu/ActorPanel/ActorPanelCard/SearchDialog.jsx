import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import globalConfig from "../../../../globalConfig";
import axios from "../../../../axiosConfig";
import {Grid} from "@material-ui/core";
import ActorPanelCardContentImgTile from "./ActorPanelCardContentImgTile";
import SearchDialogImgCard from "./SearchDialogImgCard";
import ImgCard from "./ImgCard";
// import Draggable from 'react-draggable'

// function PaperComponent(props) {
//     return (
//         <Draggable>
//             <Paper {...props} />
//         </Draggable>
//     )
// }

const SearchDialog = (props) => {
    const {actorId, searchDialogOpen, handleClose} = props;
    const dialogLeft =  globalConfig.storyboardDrawerWidth
                            + globalConfig.panelTabsWidth
                            + globalConfig.actorDrawerWidth;
    const [imgList ,setImgList] = React.useState([]);

    React.useEffect(
        () => {
            axios({
                method: 'get',
                url: "/sample_state_id_list/get",
            }).then(
                res => {
                    setImgList(res.data)
                    console.log("imgList: ", imgList)

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
                    <DialogTitle id="dialog-title">Actor States</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1} >
                            {imgList.map(id => (
                                <>
                                    <Grid
                                        item xs={3}
                                        key={id}
                                    >
                                        <SearchDialogImgCard
                                            actorId={actorId}
                                            id={id}
                                            imgSrc={axios.defaults.baseURL + id}
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

export default SearchDialog
