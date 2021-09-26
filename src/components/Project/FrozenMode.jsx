import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";


const FrozenMode = () => {

    return (
        <Box style={{width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            }}
        >
            <Box style={{width: "400px",
                    height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Typography component="h1" variant="subtitle1" style={{
                color: "grey",
                fontStyle: "italic",
            }}>
                {`This project has been edited by another student. 
                Please reload your page to import their latest updates.
                Note that Idea Builder only allows one student to edit at a time. 
                `}
            </Typography>
            </Box>
        </Box>

    )

}



export default FrozenMode;



