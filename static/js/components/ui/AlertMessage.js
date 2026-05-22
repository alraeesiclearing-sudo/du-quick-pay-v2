import React from 'react';
import {Alert, AlertTitle} from "@mui/material";

const AlertMessage = (props) => {
    const { alertType = "info", alertTitle = "Error", alertMessage = "Default error" } = props;
    return (
        <>
            <Alert severity={alertType}>
                {alertTitle && <AlertTitle>Error</AlertTitle>}
                {alertMessage}
            </Alert>
        </>
    );
};

export default AlertMessage;