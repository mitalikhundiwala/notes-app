import React, { FunctionComponent } from 'react';
import { Formik, FormikErrors } from 'formik';
import NoteEditor, { IFormValues } from './note-editor.component';
import { Box } from '@material-ui/core';
import { addNote } from '../actions/notes.action';
import { AppThunkDispatch, IAppState } from '../store';
import { connect } from 'react-redux';
import Note from '../models/note.model';
import { getAvailableTags } from '../selectors/notes.selector';

interface IOwnProps {
    addNote: (title: string, detail: string, tags: string[]) => Promise<Note>;
    tags: string[];
}

interface IProps extends IOwnProps {
    onCreate: () => void;
    onCancel: () => void;
}

const CreateNote: FunctionComponent<IProps> = ({
    addNote,
    onCreate,
    onCancel,
    tags,
}) => {
    return (
        <Box p={2}>
            <Formik
                initialValues={{
                    title: '',
                    detail: '',
                    tags: [],
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
                    await addNote(title, detail, tags);
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

const mapStateToProps = (state: IAppState) => {
    return {
        tags: getAvailableTags(state),
    };
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
    return {
        addNote: (title: string, detail: string, tags: string[]) => {
            return dispatch(addNote(title, detail, tags));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNote);
