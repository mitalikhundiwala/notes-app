import React, { FunctionComponent } from 'react';
import { Formik, FormikErrors } from 'formik';
import NoteEditor, { IFormValues } from './note-editor.component';
import { Box } from '@material-ui/core';
import { updateNote } from '../actions/notes.action';
import { AppThunkDispatch, IAppState } from '../store';
import { connect } from 'react-redux';
import Note from '../models/note.model';
import { getAvailableTags } from '../selectors/notes.selector';

interface IOwnProps {
    updateNote: (
        noteId: number,
        title: string,
        detail: string,
        tags: string[]
    ) => Promise<Note>;
    tags: string[];
}

interface IProps extends IOwnProps {
    note: Note;
    onCreate: () => void;
    onCancel: () => void;
}

const UpdateNote: FunctionComponent<IProps> = ({
    updateNote,
    onCreate,
    onCancel,
    note,
    tags,
}) => {
    return (
        <Box p={2}>
            <Formik
                initialValues={{
                    title: note.title,
                    detail: note.detail,
                    tags: note.tags,
                }}
                validate={values => {
                    const errors: FormikErrors<IFormValues> = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    const title = values.title?.trim();
                    const detail = values.detail?.trim();
                    const tags = values.tags;
                    await updateNote(note.noteId, title, detail, tags);
                    actions.setSubmitting(false);
                    onCreate();
                }}
            >
                {props => (
                    <NoteEditor
                        {...props}
                        onCancel={onCancel}
                        existingTags={tags}
                    />
                )}
            </Formik>
        </Box>
    );
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
    return {
        updateNote: (
            noteId: number,
            title: string,
            detail: string,
            tags: string[]
        ) => {
            return dispatch(updateNote(noteId, title, detail, tags));
        },
    };
};

const mapStateToProps = (state: IAppState) => {
    return {
        tags: getAvailableTags(state),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNote);
