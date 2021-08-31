import React from "react";
import Container from '@material-ui/core/Container';
import axios from "../../axiosConfig";
import FrameList from "../FrameList/FrameList";
import Typography from "@material-ui/core/Typography";
import {IconButton, makeStyles} from "@material-ui/core";
// import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {Button, Tooltip} from "antd"
import globalConfig, {globalLog} from "../../globalConfig";
import {Add, ArrowForward, DeleteOutlined} from "@material-ui/icons";
import CardMedia from "@material-ui/core/CardMedia";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import {addRecommend, setCacheValue, setRecommend} from "../../redux/features/recommendSlice";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles({
    baseDiv: {
        width: '100%',
        position: 'relative',
        paddingBottom: `${Math.floor(100*(globalConfig.responsiveSizeData.frameListHeight+20)/globalConfig.storyboardModalWidth)}%`,
        paddingTop: '0',
        height: 0,
    },
    elementToStretch: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    // imgStyle: {
    //     width: '100%',
    //     height: '100%',
    // },
    divOverlap: {
        position: "absolute",
        display: "flex",
        top: "50%",
        left: 0,
        zIndex: 1,
        width: "100%",
        height: 0,  //need to save space for the slider bar below
        cursor: "auto",
        justifyContent: "center",
        alignItems: "center",
    },
});


const StoryboardGallery = (props) => {
    const {setCurrent} = props;
    const storyboardList = useSelector( state =>  state.recommend.value.initial !== null?state.recommend.value.initial.map(
        p => p.storyboardList[0]
    ):[])
    const dispatch = useDispatch();

    React.useEffect(
        async () => {
            // for (const rawName of ["25-Snowball Fight"]) {
            for (const rawName of ["25-Snowball Fight", "27-Flappy Parrot"]) {
            // for (const projectName of ["35-Green%20Your%20City", "25-Snowball%20Fight", "27-Flappy%20Parrot"]) {
                const projectName = rawName.split(" ").join("%20");
                const url = `/static/project/${projectName}/recommend.json`;
                const res = await axios({
                        method: 'get',
                        url: url,
                    })
                dispatch(addRecommend(res.data));
            }

        }, []
    )
    return (
        <>
            <Container maxWidth="lg"
            >
                {storyboardList.map(s => (
                    <FrameListBox
                        key = {s._id}
                        storyboardData = {s}
                        setCurrent={setCurrent}
                    />
                ))}
            </Container>
        </>
    )
}

const FrameListBox = React.memo(
    (props) => {
        const {storyboardData, setCurrent} = props;
        const classes = useStyles();
        const [onHover, setOnHover] = React.useState();
        const dispatch = useDispatch();

        const handleClick = (e) => {
            dispatch(setCacheValue(storyboardData));
            setCurrent(1)
        }

        return (
            <>
                <div
                    style={{
                        padding: "10px 10px 5px 10px"
                    }}
                >
                    <Typography align="center" variant="body">
                        {storyboardData.name}
                    </Typography>
                </div>
                <div className={classes.baseDiv}
                     onMouseEnter={() => {setOnHover(true)}}
                     onMouseLeave={() =>{ setOnHover(false)}}
                >
                    <div className={classes.elementToStretch}>
                        <FrameList
                            frameList={storyboardData.frameList}
                            _id={null}
                            handleDelete={null}
                            handleAdd={null}
                        />
                        <div className={classes.divOverlap} style={{display: onHover? "flex":"none" }}
                        >
                                <Tooltip title="Use">
                                    <Button type="primary"
                                            shape="circle"
                                            onClick={handleClick}
                                            icon={ <ArrowRightOutlined /> } size="large" />
                                </Tooltip>
                        </div>
                    </div>
                </div>
                </>
        )
    }
)





export default StoryboardGallery;
