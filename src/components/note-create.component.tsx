import React, { FunctionComponent } from 'react';
import { Formik, FormikErrors } from 'formik';
import NoteEditor, { IFormValues } from './note-editor.component';
import { Box } from '@material-ui/core';
import { addNote } from '../actions/notes.action';
import { AppThunkDispatch, IAppState } from '../store';
import { connect } from 'react-redux';
import Note from '../models/note.model';

interface IOwnProps {
    addNote: (title: string, detail: string) => Promise<Note>;
}

interface IProps extends IOwnProps {
    handleCancel: () => void;
}

const CreateNote: FunctionComponent<IProps> = ({ addNote, handleCancel }) => {
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
                    const title = values.title?.trim();
                    const detail = values.detail?.trim();
                    addNote(title, detail);
                }}
            >
                {props => <NoteEditor {...props} handleCancel={handleCancel} />}
            </Formik>
        </Box>
    );
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
    return {
        addNote: (title: string, detail: string) => {
            return dispatch(addNote(title, detail));
        },
    };
};

export default connect(undefined, mapDispatchToProps)(CreateNote);
