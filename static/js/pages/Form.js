import React, {useState, useContext, useEffect} from 'react';
import axios from "axios"
import {DirectionContext} from "../Contexts/DirectionContext";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from 'react-number-format';

import {
    Box,
    Card,
    CardActionArea,
    CardContent, Checkbox,
    Container, Divider, FormControlLabel, Link,
    Grid, InputAdornment, Paper, Radio,
    Typography, TextField, Button
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import duTheme from "../assets/theme";

const useStyles = makeStyles((theme) => {
    return {
        "isActive": {
            border: "2px solid #C724B1"
        },
    }
});

export default function Form() {
    const classes = useStyles();

    const { register, control, handleSubmit, watch } = useForm({
        mode: "onBlur"
    });

    const onSubmit = data => {
        console.log(data)
    }

    const onCardChangeHandler = (e) => {
        console.log(e.target.value);
    }

    const onCardExpiryChangeHandler = (e) => {
        console.log(e.target.value);
    }

    const amount = watch(`amount`);

    return (
        <React.Fragment>
            <Box noValidate component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container maxWidth="lg" sx={{mx: "auto", mt:10}}>
                <Grid item xs={12}>
                    { amount }
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="amount"
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, onChange, value, onBlur }, fieldState: { error } }) => (
                            <TextField
                                label="Enter amount"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                                ref={ref}
                                helperText={error ? error.message : "Enter a value between AED 1 and 30000." }
                                margin="normal"
                                required
                            />
                        )}
                        rules={{ required: "required", pattern: { value:/^s*-?[1-9]\d*(\.\d{1,2})?\s*$/i, message: "enter valid amount"} }}
                    />
                </Grid>
                {/*<Grid item xs={12}>
                    <Controller
                        name="card"
                        control={control}
                        defaultValue=""
                        render={({ field: {onChange, value, onBlur }, fieldState: { error } }) => (
                            <TextField
                                label="Card number"
                                variant="outlined"
                                value={value}
                                onChange={e => {
                                    onCardChangeHandler(e)
                                    onChange(e.target.value);
                                }}
                                onBlur={onBlur}
                                error={!!error}
                                helperText={error ? error.message : "Enter valid Visa or Mastercard number" }
                                margin="normal"
                                required
                            />
                        )}
                        rules={{ required: "required", pattern: { value:/4\d{3}\s\d{4}\s\d{4}\s\d{4}|5[1-5]\d{2}\s\d{4}\s\d{4}\s\d{4}|3[47]\d{2}\s\d{4}\s\d{4}\s\d{3}/i, message: "enter valid card"} }}
                    />
                </Grid>*/}
                <Grid item xs={12}>
                    <Controller
                        name="card"
                        control={control}
                        defaultValue=""
                        render={({ field: {onChange, value, onBlur }, fieldState: { error } }) => (
                            <NumberFormat
                                label="Card number"
                                variant="outlined"
                                value={value}
                                format="#### #### #### ####"
                                placeholder="1234 1234 1234 1234"
                                error={!!error}
                                helperText={error ? error.message : "Enter valid Visa or Mastercard number" }
                                margin="normal"
                                required
                                onChange={e => {
                                    onCardChangeHandler(e)
                                    onChange(e.target.value);
                                }}
                                onBlur={onBlur}
                                error={!!error}
                                customInput={
                                    TextField
                                }
                            />

                        )}
                        rules={{ required: "required", pattern: { value:/4\d{3}\s\d{4}\s\d{4}\s\d{4}|5[1-5]\d{2}\s\d{4}\s\d{4}\s\d{4}|3[47]\d{2}\s\d{4}\s\d{4}\s\d{3}/i, message: "enter valid card"} }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="fullname"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <TextField
                                label="Name on card"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                                helperText={error ? error.message : "" }
                                margin="normal"
                                required
                            />
                        )}
                        rules={{ required: "Enter name", pattern: { value:/^[a-zA-Z\-'\s]{1,25}$/, message: "Avoid special character or numbers. Max 25 characters"} }}
                    />
                </Grid>
                {/*<Grid item xs={12}>
                    <Controller
                        name="cc_expiry"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <TextField
                                label="Card expiry date"
                                variant="outlined"
                                value={value}
                                onChange={e => {
                                    onCardExpiryChangeHandler(e)
                                    onChange(e.target.value);
                                }}
                                onBlur={onBlur}
                                error={!!error}
                                helperText={error ? error.message : "" }
                                margin="normal"
                                required
                            />
                        )}
                        rules={{ required: "Card expiry date", pattern: { value:/\d{2}[\/]\d{2}/, message: "Card expiry date"} }}
                    />
                </Grid>*/}
                <Grid item xs={12}>
                    <Controller
                        name="cc_expiry"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <NumberFormat
                                label="Card expiry date"
                                variant="outlined"
                                value={value}
                                format="##/##"
                                placeholder="MM/YY"
                                error={!!error}
                                helperText={error ? error.message : "" }
                                margin="normal"
                                required
                                onChange={e => {
                                    onCardExpiryChangeHandler(e)
                                    onChange(e.target.value);
                                }}
                                onBlur={onBlur}
                                error={!!error}
                                customInput={
                                    TextField
                                }
                            />
                        )}
                        rules={{ required: "Card expiry date", pattern: { value:/\d{2}[\/]\d{2}/, message: "Card expiry date"} }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="cc_code"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <TextField
                                label="CVV / CVC"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                                helperText={error ? error.message : "" }
                                margin="normal"
                                required
                                type="password"
                            />
                        )}
                        rules={{ required: "Enter CVV", pattern: { value:/\d{3}/, message: "Enter CVV"} }}
                    />
                </Grid>
                <Grid item xs={12} py={4}>


                    <FormControlLabel control={
                        <Controller
                            control={control}
                            name="test"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <Checkbox
                                    onBlur={onBlur} // notify when input is touched
                                    onChange={onChange} // send value to hook form
                                    // checked={value}
                                    color={error && "error" }
                                />
                            )}
                            rules={{ required: "required" }}
                        />
                    } label={
                        <div>
                            <span>I agree to payments  </span>
                            <Link href="https://www.du.ae/terms-and-conditions">Terms and conditions</Link>
                        </div>
                    } />
                </Grid>
                <Grid item xs={12} py={4}>
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </Grid>
            </Grid>
            </Box>
        </React.Fragment>
    )
}