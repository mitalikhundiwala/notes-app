import React, { FunctionComponent, createRef } from 'react';
import { FormikProps } from 'formik';
import { TextField, Button, Grid } from '@material-ui/core';

const NoteEditor: FunctionComponent<FormikProps<IFormValues>> = props => {
    // console.log(props);
    return (
        <form noValidate onSubmit={props.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="title"
                        label="Title"
                        fullWidth
                        error={!!props.errors.title}
                        helperText={props.errors.title}
                        variant="outlined"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="detail"
                        label="Detail"
                        multiline
                        fullWidth
                        rows={8}
                        error={!!props.errors.detail}
                        helperText={props.errors.detail}
                        variant="outlined"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export interface IFormValues {
    title: string;
    detail: string;
}

export default NoteEditor;
