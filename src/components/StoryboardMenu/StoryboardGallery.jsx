import React from 'react';
import Container from '@material-ui/core/Container';
import axios from '../../axiosConfig';
import FrameList from '../FrameList/FrameList';
import Typography from '@material-ui/core/Typography';
import {IconButton, makeStyles} from '@material-ui/core';
import {Button, Modal, Tooltip} from 'antd'
import globalConfig, {globalLog} from '../../globalConfig';
import ArrowRightOutlined from '@ant-design/icons/lib/icons/ArrowRightOutlined';
import {addRecommend, resetRecommend, setSelectedRecommend, setRecommend} from '../../redux/features/recommendSlice';
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
    state => state.recommend.value.initial,
    (projectList) => {
        return {projectList}
    }
)

const mapStateToProps = (state) => {
    return getRecommendProjectList(state);
}



const StoryboardGallery = (props) => {
    const {setCurrent, projectList} = props;
    const dispatch = useDispatch();

    let rawNameList;
    if (Cookies.get('userId')==="mbobbad" || Cookies.get('userId')==="wwang33" ) {
        rawNameList = [
            // 'acceleration',
            'asteroid_alien_move',
            'bullet_wrap',
            'button_select',
            'carousel',
            'checkout_list',
            'click_show_calendar',
            'collision_change_score',
            'collision_explosion',
            'hit_remove',
            'inertia',
            'initialize_fish_property',
            'initialize_to_random',
            // 'jump',
            'key_trigger_bounce',
            'keymove',
            'move_between_points',
            'move_free',
            'move_with_mouse',
            'multiple_choice_question',
            'paddle',
            'radio_options',
            'shoot_bullets',
            'show_hide_calendar',
            'spawn_enemies',
            'start_button',
            'timer',
            'turn_smaller']
    }
    else {
        rawNameList = [ "Ball hits shape",
        'Ball trail']
    }
    React.useEffect(
         () => {
             if (projectList.length > 0) {
                 return;
             }
            // for (const rawName of ) {
            for (const rawName of rawNameList) {
            // for (const projectName of ['35-Green%20Your%20City', '25-Snowball%20Fight', '27-Flappy%20Parrot']) {
                const projectName = rawName.split(' ').join('%20');
                // const url = `/static/project/${projectName}/recommend.json`;
                const url = `/static/project/${projectName}/recommend.json`;
                axios({
                        method: 'get',
                        url: url,
                    }).then( res =>
                    dispatch(addRecommend(res.data))
            )
            }

        }, []
    )
    return (
        <>
            <Container maxWidth='lg'
            >
                <Typography style={{fontStyle: 'italic',color: "grey"}} component="h1" variant="body2">
                    {/*Sign in using your unity ID*/}
                    {`You may select a recommended storyboard to begin with.\n
                    When you program in Snap for Project 1, you will see code examples for these storyboards.`}

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
                    <Typography align='center' variant='subtitle2'>
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
