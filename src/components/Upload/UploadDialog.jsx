import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {useDispatch} from "react-redux";

const useStyles = makeStyles({
    img: {
        objectFit: "contain",
        maxHeight: 200,
        width: 300,
    }
});


const UploadDialog = (props) => {
    const {dialogOpening, setDialogOpening, imgSrc} = props;
    const classes = useStyles();
    const [actorName, setActorName] = React.useState();
    const [stateName, setStateName] = React.useState();
    const dispatch = useDispatch();


    const handleClose = () => {
        setDialogOpening(false);
    };

    const handleSubmit = () => {
        setDialogOpening(false);
        const imgArray = imgSrc.split("/");
        const imgID = imgArray[imgArray.length-1].split('.')[0];
        const newStateEntry = {
            imgID,
            actorName,
            stateName,
            imgSrc
        };
        // // globalLog("newStateEntry: ", newStateEntry);
        // dispatch(addState(JSON.stringify(newStateEntry)));
        // axios(
        //     {
        //         method: 'post',
        //         url: `/states/${imgID}/update`,
        //         data: {
        //             "actor_name": actorName,
        //             "state_name": stateName
        //         }
        //     }
        // ).then(response => {
        //
        // });
    };

    return (
        <div>
            <Dialog open={dialogOpening} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add image</DialogTitle>
                <DialogContent>
                    <Paper variant="outlined">
                          <img src={imgSrc}
                               alt="alt"
                               className={classes.img}/>
                    </Paper>
                    <TextField
                        value={actorName}
                        onChange={e => setActorName(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="actorName"
                        label="Add actor name"
                    />
                    <br/>
                    <br/>
                    <TextField
                        value={stateName}
                        onChange={e => setStateName(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="stateName"
                        label="Add state name"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary"
                            disabled={!(actorName && stateName)}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export {UploadDialog};
