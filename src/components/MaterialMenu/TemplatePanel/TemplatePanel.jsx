import React from 'react';
import { Grid } from '@material-ui/core';
import TemplatePanelImgTile from './TemplatePanelImgTile';
import {connect} from "react-redux";
import {createSelector} from "reselect";

const getTemplateList = createSelector(
    state => state.project.value.templateList,
    templateList => templateList,
);

const mapStateToProps = (state) => {
    return {
        templateList: getTemplateList(state),
    };
};



const TemplatePanel = props => {
    const {templateList} = props;
    return (
        <Grid container spacing={1} justifyContent="center">
            {templateList.map(templateData => (
                <>
                    <Grid item xs={10}>
                        <TemplatePanelImgTile
                            templateData={templateData}
                            key={templateData._id}
                        />
                    </Grid>
                </>
            ))}
        </Grid>
    );
};

export default connect(mapStateToProps)(TemplatePanel);
