import React from "react"
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
import {Backdrop} from "@material-ui/core";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

function Spinner(loading) {
    let color = "#1890ff";

    return (
        <Backdrop className="sweet-loading" style={{height: "100vh", zIndex: 1999}} open={loading}>
            <MoonLoader color={color} loading={loading} css={override} size={70} />
        </Backdrop>
    );
}

export default Spinner;
