import React from 'react';
import TemplateImgCard from "./TemplateImgCard";



const TemplatePanelImgTile = (props) => {
    const {templateId} = props;

    return (
        <>
            <TemplateImgCard
                templateId={templateId}
                heightToWidthRatio={'75%'}
                contentNode={null}
            />
        </>
    )
}



export default TemplatePanelImgTile;
