import React from 'react';
import Container from '@material-ui/core/Container';
import axios from '../../axiosConfig';
import FrameList from '../FrameList/FrameList';
import Typography from '@material-ui/core/Typography';
import {IconButton, makeStyles} from '@material-ui/core';
import {Button, Modal, Tooltip} from 'antd'
import globalConfig, {globalLog} from '../../globalConfig';
import ArrowRightOutlined from '@ant-design/icons/lib/icons/ArrowRightOutlined';
import {
    addRecommend,
    resetRecommend,
    setSelectedRecommend,
    setRecommend,
    resetDisplayRecommend
} from '../../redux/features/recommendSlice';
import { useDispatch, useSelector, connect } from 'react-redux';
import {createSelector} from 'reselect'
import Cookies from "js-cookie";

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
        position: 'absolute',
        display: 'flex',
        top: '50%',
        left: 0,
        zIndex: 1,
        width: '100%',
        height: 0,  //need to save space for the slider bar below
        cursor: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const getRecommendProjectList = createSelector(
    state => state.recommend.value.displayList,
    (projectList) => {
        return {projectList}
    }
)

const mapStateToProps = (state) => {
    return getRecommendProjectList(state);
}



const StoryboardGallery = (props) => {
    const {setCurrent, projectList} = props;
    // const dispatch = useDispatch();
    // React.useEffect( () => {
    //     display(resetDisplayRecommend())
    // }, [])
    // let rawNameList;
    // if (["mbobbad", "wwang33", 'twprice', 'test1', 'test2', 'test3', 'test4',
    //     'kljone23', 'ggdallma', 'svegesa', 'jlrusse7', 'akjone23', 'cliu27', 'jarevoir', 'wlstell', 'mlmacdon',
    //         'nmbock2', 'jpsoutha', 'thkelley', 'jhsmith9', 'ndcovert', 'zxu16', 'eagodwin', 'imwilli2', 'jwjenni3',
    //         'mlmitch7', 'nbward', 'ptsmith4', 'smthomp7', 'sejeffe2', 'nbbailey', 'zmander2', 'mbautis2', 'cehandly',
    //         "wtmorga3",
    //         "ujkaraba",
    //         "slmclenn",
    //         "sechestn",
    //         "nrsoufan",
    //         "msevans5",
    //         "kghaley",
    //         "kbsitton",
    //         "jhcarlyl",
    //         "eemarsh",
    //         "delaseri",
    //         "cfveit",
    //         "btsek2",
    //         "aschenna",
    //         "antearry",
    //         "aahasan"
    // ].includes(Cookies.get('userId'))) {
    //     rawNameList = ['Bounce Around the Stage', 'Paw Prints', 'Select a Button in a List', 'Move When Key Is Pressed', 'Boat Race', 'Snake Eating Apples', 'Create Many Actors', 'Click Icon to Show and Hide Calendar', 'Increases Score When Explode', 'Move With the Mouse', 'Browse Through Carousel', 'Helicopter Dropping Water', 'Snake Turning', 'Game Timer', 'Flower Grows When Water Dropped', 'Bounce on Paddle', 'Actor Moves Randomly to the Right', 'Initialize Actors to Random Positions', 'Move Between Points', 'Jump', 'Catching Fruit']
    // }
    // else {
    //     rawNameList = []
    // }
    // React.useEffect(
    //      () => {
    //          if (projectList.length > 0) {
    //              return;
    //          }
    //         // for (const rawName of ) {
    //         for (const rawName of rawNameList) {
    //         // for (const projectName of ['35-Green%20Your%20City', '25-Snowball%20Fight', '27-Flappy%20Parrot']) {
    //             const projectName = rawName.split(' ').join('%20');
    //             // const url = `/static/project/${projectName}/recommend.json`;
    //             const url = `/static/week2project/${projectName}/recommend.json`;
    //             axios({
    //                     method: 'get',
    //                     url: url,
    //                 }).then( res =>
    //                 dispatch(addRecommend(res.data))
    //         )
    //         }
    //
    //     }, []
    // )
    return (
        <>
            <Container maxWidth='lg'
            >
                <Typography style={{fontStyle: 'italic',color: "grey"}} component="h1" variant="body2">
                    You may select a recommended storyboard to begin with.
                    When you program in Snap for Project 1,
                    you will see <a target="_blank" href="https://isnap.csc.ncsu.edu/public/example-helper/snap.html?assignment=project1">code examples</a>
                    {" "}  for these storyboards.
                </Typography>
                {projectList.map(p => (
                    <FrameListBox
                        key = {p._id}
                        projectData = {p}
                        setCurrent={setCurrent}
                    />
                ))}
            </Container>
        </>
    )
}

const FrameListBox = React.memo(
    (props) => {
        const {projectData, setCurrent} = props;
        const storyboardData = projectData.storyboardList[0];
        const classes = useStyles();
        const [onHover, setOnHover] = React.useState();
        const dispatch = useDispatch();

        const handleClick = (e) => {
            dispatch(setSelectedRecommend(projectData));
            setCurrent(current => current + 1)
        }

        return (
            <>
                <div
                    style={{
                        padding: '10px 10px 5px 10px'
                    }}
                >
                    <Typography align='center' variant='subtitle1'>
                        {storyboardData.name}
                    </Typography>
                    {/*<Typography align='center' variant='subtitle2'>*/}
                    {/*    {storyboardData.note}*/}
                    {/*</Typography>*/}
                    <Typography style={{fontStyle: 'italic',color: "grey"}} component="div" variant="body2">
                        {storyboardData.note}
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
                        <div className={classes.divOverlap} style={{display: onHover? 'flex':'none' }}
                        >
                                <Tooltip title='Use'>
                                    <Button type='primary'
                                            shape='circle'
                                            onClick={handleClick}
                                            icon={ <ArrowRightOutlined /> } size='large' />
                                </Tooltip>
                        </div>
                    </div>
                </div>
                </>
        )
    }
)





export default connect(mapStateToProps)(StoryboardGallery);
