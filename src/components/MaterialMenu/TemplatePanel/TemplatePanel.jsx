import React from 'react';
import { Grid } from '@material-ui/core';
import TemplatePanelImgTile from './TemplatePanelImgTile';
import {useSelector} from "react-redux";

const TemplatePanel = props => {
    const templateList = useSelector(state =>{
        return state.project.value.templateList});

    return (
        <Grid container spacing={1} justifyContent="center">
            {templateList.map(templateId => (
                <>
                    <Grid item xs={10}>
                        <TemplatePanelImgTile
                            templateId={templateId} />
                    </Grid>
                </>
            ))}
        </Grid>
    );
};

export default TemplatePanel;
