import React from "react"
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  top: 35vh;
`;

function Spinner(loading) {
    let color = "#1890ff";

    return (
        <div className="sweet-loading" style={{height: "100vh"}}>
            <MoonLoader color={color} loading={loading} css={override} size={70} />
        </div>
    );
}

export default Spinner;
