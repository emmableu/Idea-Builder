import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'
import React from "react"; // If using WebPack and style-loader.

 const ShareTagsInput = (props) => {
     const {tags, setTags} = props;

     const handleChange = (tags) => {
            setTags(tags);
     }

    return <TagsInput
        value={tags}
        maxTags={1}
        addOnBlur={true}
        onChange={handleChange}
        inputProps={{
            className: 'react-tagsinput-input',
            placeholder:  `City Name + date (e.g., raleigh1022)`,
        }}
    />
}


export default ShareTagsInput;
