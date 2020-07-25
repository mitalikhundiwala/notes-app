import React, { FunctionComponent } from 'react';
import { FormikProps } from 'formik';
import { TextField, Button, Grid, CircularProgress } from '@material-ui/core';
import Autocomplete, {
    createFilterOptions,
} from '@material-ui/lab/Autocomplete';

export interface IFormValues {
    title: string;
    detail: string;
    tags: string[];
}

interface IProps extends FormikProps<IFormValues> {
    onCancel: () => void;
    existingTags: string[];
}

const filter = createFilterOptions<string>();

const NoteEditor: FunctionComponent<IProps> = props => {
    console.log(props);
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
                        value={props.values.title}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        id="tags"
                        options={props.existingTags}
                        getOptionLabel={option => option}
                        value={props.values.tags}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            if (params.inputValue !== '') {
                                filtered.push(params.inputValue);
                            }

                            return filtered;
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Tags"
                                placeholder="Choose or Create new"
                            />
                        )}
                        onChange={(event: any, newValue: string[] | null) => {
                            props.setFieldValue('tags', newValue);
                        }}
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
                        value={props.values.detail}
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
                                disabled={props.isSubmitting}
                            >
                                {props.isSubmitting ? 'Saving...' : 'Save'}
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                fullWidth
                                onClick={props.onCancel}
                                disabled={props.isSubmitting}
                            >
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
