import React, { FunctionComponent, createRef } from 'react';
import { FormikProps } from 'formik';
import { TextField, Button, Grid } from '@material-ui/core';

export interface IFormValues {
    title: string;
    detail: string;
}

interface IProps extends FormikProps<IFormValues> {
    handleCancel: () => void;
}

const NoteEditor: FunctionComponent<IProps> = props => {
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
                    <Grid container>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button fullWidth onClick={props.handleCancel}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default NoteEditor;
