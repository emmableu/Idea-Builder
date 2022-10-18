import React from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {loadProjectFromDatabase} from "../../redux/features/projectSlice";
import ProjectDrawer from "./ProjectDrawer";
import Spinner from "../Spinner";
import ViewMode from "../ViewMode/ViewMode";
import {loadAssets} from "../../redux/features/allRecommendSlice";
import FrozenMode from "./FrozenMode";
import {loadAllRecommend} from "../../redux/features/recommendSlice";
import {setCodeModalOpen} from "../../redux/features/codeSlice";
import Code from "../Code/Code";
import SurveyComponent from "../SurveyComponent";


const ProjectPageContainer = () => {
    const {_id} = useParams();
    const dispatch = useDispatch();
    const projectData = useSelector(
        state => state.project.value
    );
    const snapWindowLoaded = useSelector(s => s.code.snapWindowLoaded);

    React.useEffect(() => {
        if (snapWindowLoaded) {
            dispatch(setCodeModalOpen(false));
        }
    }, [snapWindowLoaded])

    const view = useSelector(
        state => state.mode.view
    )
    const frozenMode = useSelector(
        state => {
            // console.log("frozenmode: ", state.author.value.frozenMode)
            return state.author.value.frozenMode}
    )
    React.useEffect(() => {
            // dispatch(setCodeModalOpen(true));
            dispatch(loadProjectFromDatabase(_id))
            // dispatch(loadAllRecommend());
            // dispatch(loadAssets());
        }, [])

    return (
        <>
            {/*{frozenMode && <FrozenMode/>}*/}
            {
                view ? <ViewMode/> :

                    // projectData === null || !snapWindowLoaded ?
                    //     <Spinner loading={true}/> : <ProjectDrawer />

                projectData === null ?
                <Spinner loading={true}/> : <ProjectDrawer />


            }

        {/*{(!frozenMode && projectData===null) || (!snapWindowLoaded) && <Spinner loading={true}/>}*/}
        {/*{!frozenMode &&  projectData!==null && view === false && snapWindowLoaded && <ProjectDrawer />}*/}
        {/*{!frozenMode &&  projectData!==null && view === true && <ViewMode />}*/}

            {!view && <Code />}
            {/*{!view && <SurveyComponent/>}*/}
        </>

    )


}

export default ProjectPageContainer;
