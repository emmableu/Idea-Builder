import Icon from "@ant-design/icons/es";
import React from "react";

const DragHandleSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M20,9H4v2h16V9z M4,15h16v-2H4V15z"/></g></g></g></svg>
);

const DragHandleIcon = props => <Icon component={DragHandleSvg} {...props} />;

export default DragHandleIcon;
