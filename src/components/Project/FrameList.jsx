import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import FrameCardContainer from "../Frame/FrameCardContainer";
import React from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "../../axiosConfig";
import { useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardActionArea from '@material-ui/core/CardActionArea';
import {useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import * as UUID from "uuid"
import {addFrame} from "../../redux/features/projectSlice";
import {setSelectedFrameId} from "../../redux/features/selectedFrameSlice";


const snapshotHeight = 0.15*window.innerHeight;

const useStyles = makeStyles((theme) => ({
    highlighted: {
        backgroundColor: "pink"
    },
    grid: {
        minWidth: "15vh",
        maxWidth: "20vh",
        height: "200px",
    },
    box: {
        overflow: "auto",
    }
}));

const FrameList = () => {
    const classes = useStyles();
    const selectedFrame = useSelector((state) => state.selectedFrame.value._id);
    const dispatch = useDispatch();

    const handleAddFrame = (e) => {
        dispatch(addFrame());
    }

    // React.useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: '/snapshots/get',
    //     }).then(response =>
    //         {
    //             const responseSnapshotData = response.data;
    //             setSnapshot(responseSnapshotData);
    //         }
    //     );
    // }, [count]);
    //
    // const addNewFrame = () => {
    //     axios({
    //         method: 'post',
    //         url: '/frames/add',
    //     }).then(response =>
    //         {
    //             const responseSnapshotData = Object.values(response.data.frames).map((v) => v.base64);
    //             setSnapshot(responseSnapshotData);
    //         }
    //     );
    // };
    return (<>
                <Box margin={3} className={classes.box}>
                    <Grid container wrap="nowrap" justify="flex-start" alignItems="center" spacing={3}>
                        {[1].map((s, i) => (
                            <Grid className={classes.grid} item key={i}>
                                <Card variant="outlined"
                                      className={`paper ${i===selectedFrame ? classes.highlighted : null}`}>
                                    <CardActionArea onClick={() => { dispatch(setSelectedFrameId(i)); }}>
                                        {/*<CardMedia*/}
                                        {/*component='img' src={s}*/}
                                        {/*/>*/}
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={1} align="middle">
                            <Fab color="default" aria-label="add"
                                 onClick={(e) =>{ handleAddFrame(e)}}
                            >
                                <AddIcon />
                            </Fab>
                        </Grid>

                    </Grid>
                </Box>
            </>);
};

export default FrameList
