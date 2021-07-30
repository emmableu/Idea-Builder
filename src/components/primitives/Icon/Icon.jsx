import React from "react";
import Icon from '@ant-design/icons';
import { ReactComponent as IdeaBuilder } from "./idea.svg";
import { ReactComponent as Copy } from "./copy.svg";

export const IdeaBuilderIcon = (props) => <Icon
    {...props}
    component={IdeaBuilder}
/>


export const CopyIcon = (props) => <Icon
    {...props}
    component={Copy}
/>

