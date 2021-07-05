import React from "react";
import Button from "@material-ui/core/Button";
import {CloudUpload} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";
import {storyboardDrawerWidth} from "../Board/Board";
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import axios from '../../axiosConfig'
import {UploadDialog} from "./UploadDialog";



const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    uploadButton: {
        width: "100%",
        "& span": {
            textTransform: "none"
        }
    },
    buttonProgress: {
        color: green[500]
    }
}));


const UploadButton = () => {
    const classes = useStyles();
    const [uploading, setUploading] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState("");
    const [dialogOpening, setDialogOpening] = React.useState(false);

    const handleOnChange = (e) => {

        const file = Array.from(e.target.files)[0];
        if (file === undefined) {
            return
        }
        const formData = new FormData();
        formData.append("file", file);
        setUploading(true);


        axios({
            method: "post",
            url: "/states/new",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(response => {
            setImgSrc( axios.defaults.baseURL + "/" + response.data.data);
            setUploading(false);
            setDialogOpening(true);
        })
    };


    return (
        <div>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={handleOnChange}
            />
            <label htmlFor="contained-button-file">
                <Button
                    className={classes.uploadButton}
                    variant="contained"
                    color="default"
                    component="span"
                    size="small"
                    disabled={uploading}
                    startIcon={<CloudUpload />}
                >
                    {uploading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    {!uploading && <>Upload</>}
                </Button>
            </label>
            { <UploadDialog
                dialogOpening={dialogOpening}
                setDialogOpening={setDialogOpening}
                imgSrc={imgSrc}/>}
        </div>
    );
};

export {UploadButton};
