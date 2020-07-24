import React from 'react';
import { Formik, FormikProps, FormikErrors } from 'formik';
import NoteEditor, { IFormValues } from './note-editor.component';
import { Box } from '@material-ui/core';

const CreateNote = () => {
    return (
        <Box p={2}>
            <Formik
                initialValues={{
                    title: '',
                    detail: '',
                }}
                validate={values => {
                    const errors: FormikErrors<IFormValues> = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    debugger;
                    console.log('values::', values);
                }}
            >
                {props => <NoteEditor {...props} />}
            </Formik>
        </Box>
    );
};

export default CreateNote;
