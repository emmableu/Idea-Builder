import React from 'react';
import TemplateImgCard from "./TemplateImgCard";



const TemplatePanelImgTile = (props) => {
    const {templateData} = props;

    return (
        <>
            <TemplateImgCard
                templateData={templateData}
                heightToWidthRatio={'75%'}
                contentNode={null}
                key={templateData._id}
            />
        </>
    )
}



export default TemplatePanelImgTile;
