import {useState} from 'react';
import {Box, Container} from "@mui/material";
import Grid from "@mui/material/Grid";

// page components
import RaffleForm from "../../components/tourist/RaffleForm";
import {IsRtl, MediaQueryCheck} from "../../customHook/useGlobal";


export default function TouristRaffle() {

    const isScreenSmall = MediaQueryCheck("sm")
    const isScreenMedium = MediaQueryCheck("md")

    const isRtl = IsRtl()

    const [errState, setErrState] = useState()
    const formErrorHandler = (err) => {
        setErrState(err)
    };

    return (
        <>

            <Container disableGutters maxWidth="false">

                    <Grid container justifyContent={isScreenMedium && "space-between"} >
                        <Grid item xs={12}>
                            <RaffleForm formErrorHandler={formErrorHandler} />
                        </Grid>
                    </Grid>

            </Container>
        </>
    )
}