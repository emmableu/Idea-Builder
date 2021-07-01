import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from '../../axiosConfig'
import {useDispatch} from "react-redux";
import { addCostume } from '../../redux/features/updateSpriteCostumeMapSlice';

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
    const [spriteName, setSpriteName] = React.useState();
    const [costumeName, setCostumeName] = React.useState();
    const dispatch = useDispatch();


    const handleClose = () => {
        setDialogOpening(false);
    };

    const handleSubmit = () => {
        setDialogOpening(false);
        const imgArray = imgSrc.split("/");
        const imgID = imgArray[imgArray.length-1].split('.')[0];
        const newCostumeEntry = {
            imgID,
            spriteName,
            costumeName,
            imgSrc
        };
        console.log("newCostumeEntry: ", newCostumeEntry);
        dispatch(addCostume(JSON.stringify(newCostumeEntry)));
        // axios(
        //     {
        //         method: 'post',
        //         url: `/costumes/${imgID}/update`,
        //         data: {
        //             "sprite_name": spriteName,
        //             "costume_name": costumeName
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
                        value={spriteName}
                        onChange={e => setSpriteName(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="spriteName"
                        label="Add sprite name"
                    />
                    <br/>
                    <br/>
                    <TextField
                        value={costumeName}
                        onChange={e => setCostumeName(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="costumeName"
                        label="Add costume name"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary"
                            disabled={!(spriteName && costumeName)}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export {UploadDialog};
