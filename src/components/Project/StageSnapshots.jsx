import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import StageCard from "../Stage/StageCard";
import React from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "../../axiosConfig";
import { useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardActionArea from '@material-ui/core/CardActionArea';
import {useDispatch} from 'react-redux';
import {selectStage} from '../../redux/features/selectedStageSlice';
import Box from '@material-ui/core/Box';


const snapshotHeight = 0.15*window.innerHeight;

const useStyles = makeStyles((theme) => ({
    highlighted: {
        backgroundColor: "pink"
    },
    grid: {
        minWidth: "15vh",
        maxWidth: "20vh"
    },
    box: {
        height: "fit-content",
        overflow: "auto",
        marginBottom: "4vh"
    }
}));

const StageSnapshots = () => {
    const classes = useStyles();
    const [snapshot, setSnapshot] = React.useState([]);
    const count = useSelector((state) => state.counter.value);
    const selectedStage = useSelector((state) => state.selectedStage.value);
    const dispatch = useDispatch();

    React.useEffect(() => {
        axios({
            method: 'get',
            url: '/snapshots/get',
        }).then(response =>
            {
                const responseSnapshotData = response.data;
                setSnapshot(responseSnapshotData);
            }
        );
    }, [count]);

    const addNewStage = () => {
        axios({
            method: 'post',
            url: '/stages/add',
        }).then(response =>
            {
                const responseSnapshotData = Object.values(response.data.stages).map((v) => v.base64);
                setSnapshot(responseSnapshotData);
            }
        );
    };
    return (<>
                <Box margin={3} className={classes.box}>
                    <Grid container wrap="nowrap" justify="flex-start" alignItems="center" spacing={3}>
                        {snapshot.map((s, i) => (
                            <Grid className={classes.grid} item key={i}>
                                <Card variant="outlined"
                                      className={`paper ${i===selectedStage ? classes.highlighted : null}`}>
                                    <CardActionArea onClick={() => { dispatch(selectStage(i)); }}>
                                        <CardMedia
                                        component='img' src={s}
                                        />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={1} align="middle">
                            <Fab color="default" aria-label="add" onClick={addNewStage}
                            >
                                <AddIcon />
                            </Fab>
                        </Grid>

                    </Grid>
                </Box>
            </>);
};

export default StageSnapshots
