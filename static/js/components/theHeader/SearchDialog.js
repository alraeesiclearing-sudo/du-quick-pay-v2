import * as React from "react";
import {useState} from "react";
import {makeStyles} from "@mui/styles";
import duTheme from "../../assets/theme";
import {
    Box,
    Container,
    FormControl,
    Grid, InputAdornment,
    Link,
    List, Hidden, ListItem,
    OutlinedInput,
    Typography, Button
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const useStyles = makeStyles((theme) => {
    return {
        searchDialog: {
            position: "fixed",
            zIndex: "200",
            background: theme.palette.gradients.magentaVioletAqua,
            width: "100%",
            height: "100%",
            top: 0,
            [theme.breakpoints.up("md")]: {
                top: "30px",
                height: "calc(100vh - 30px)",
                paddingTop: theme.spacing(15),
                paddingBottom: theme.spacing(15),
            },
            [theme.breakpoints.down("md")]: {
                padding: `${theme.spacing(5)} ${theme.spacing(4)}`,
            },

        },
        usfulLinks: {
            "& .MuiLink-root": {
                color: theme.palette.primary.contrastText,
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
            }
        },
        searchBox: {
            "& .MuiOutlinedInput-input": {
                height: 52,
                fontSize: 32,
                color: theme.palette.common.white,
                [theme.breakpoints.down("md")]: {
                    height: 32,
                    fontSize: 20,
                }
            },
            "& .MuiInputBase-colorPrimary.Mui-focused": {
                background: "rgba(255,255,255,0.2)",
                "&:after": {
                    background: "transparent"
                }

            },
            "& .MuiOutlinedInput-notchedOutline": {
                background: "rgba(255,255,255,0.2)",
                border: 0
            },
            "& .MuiInputAdornment-root": {
                position: "relative",
                zIndex: 100,
                color: theme.palette.common.white,
            },
            "& .MuiButton-root": {
                ...theme.MuiButton,
                background: theme.palette.common.white,
                color: theme.palette.common.grey,
                height: "44px",
                paddingLeft: theme.spacing(5),
                paddingRight: theme.spacing(5),
                "&:hover": {
                    color: theme.palette.common.grey,
                    background: theme.palette.common.white,
                },
                [theme.breakpoints.down("md")]: {
                    display: "none"
                }
            }

        }
    }
});

export default function SearchDialog(props) {
    const { searchDialogData, modalHandler } = props;
    const classes = useStyles();

    const [search, setSearch] = useState("")

    const searchChangeHandle = (event) => {
        setSearch(event.target.value);
    }

    const clearSearchHandler = (event) => {
        setSearch("");
    }

    return (
        <React.Fragment>
            <Box className={classes.searchDialog}>
                <Container disableGutters maxWidth="lg">
                    <Grid container>
                        <Grid align="right" item xs={12} sx={{pb:{ xs: 4, md: 10 }, positin: "relative"}}>
                            <Link component="button" onClick={(e) => modalHandler(e, false)} color={duTheme.palette.common.white}>
                                <ClearIcon />
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sx={{pb:10}}>
                            <Hidden mdUp>
                                <Typography variant="h5" component="div" color={duTheme.palette.common.white} gutterBottom>{searchDialogData.title}</Typography>
                            </Hidden>

                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                action="https://www.du.ae/dxsearchresult"
                                method="GET"
                            >
                                <FormControl fullWidth sx={{ m: 1 }} className={classes.searchBox}>

                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        name="q"
                                        value={search}
                                        onChange={e => { searchChangeHandle(e)} }
                                        placeholder={searchDialogData.placeHolder}
                                        endAdornment={(
                                            <>
                                                <InputAdornment position="start" sx={{display: !search && "none"}} onClick={e => clearSearchHandler(e)}><CancelOutlinedIcon /></InputAdornment>
                                                <Button disabled={!search.length} type="submit" variant="outlined">{searchDialogData.btnLbl}</Button>
                                            </>
                                        )}
                                    />
                                </FormControl>

                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container direction="row" spacing={{ xs: 5, sm: 5, md: 20 }}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" component="h5" color={duTheme.palette.common.white} gutterBottom>{searchDialogData.topSearch.title}</Typography>
                                    <List className={classes.usfulLinks} sx={{p:0}}>
                                        { searchDialogData.topSearch.links.map((link, i) =>
                                            <ListItem key={i} sx={{px:0}}>
                                                <Link href={link.link} underline="hover">
                                                    <Typography variant="body1" component="div">{link.name}</Typography>
                                                    <ChevronRightIcon fontSize="small" sx={{ml:8}} />
                                                </Link>
                                            </ListItem>
                                        )}
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" component="h5" color={duTheme.palette.common.white} gutterBottom>{searchDialogData.popularHelp.title}</Typography>
                                    <List className={classes.usfulLinks}sx={{p:0}}>
                                        { searchDialogData.popularHelp.links.map((link, i) =>
                                            <ListItem key={i} sx={{px:0}}>
                                                <Link href={link.link} underline="hover">
                                                    <Typography variant="body1" component="div">{link.name}</Typography>
                                                    <ChevronRightIcon fontSize="small" sx={{ml:8}} />
                                                </Link>
                                            </ListItem>
                                        )}
                                    </List>


                                    <Typography variant="body1" component="p" gutterBottom sx={{mt:4}}>
                                        <Link underline="always" href={searchDialogData.popularHelp.viewAll.link} color={duTheme.palette.common.white}>
                                            {searchDialogData.popularHelp.viewAll.name}
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    )
}