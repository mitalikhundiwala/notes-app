/* eslint-disable react/prop-types */
import React, { FunctionComponent, useCallback, useState } from 'react';
import Note from '../models/note.model';
import { connect } from 'react-redux';
import { Typography, SwipeableDrawer, Chip, Box } from '@material-ui/core';
import { Grid, IconButton } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import { IAppState, AppThunkDispatch } from '../store';
import { getSelectedNote } from '../selectors/notes.selector';
import UpdateNote from '../components/note-update.component';
import { removeNote } from '../actions/notes.action';
import format from 'date-fns/format';

interface IProps {
    selectedNote: Note;
    removeNote: (noteId: number) => void;
}

const NoteDetail: FunctionComponent<IProps> = ({
    selectedNote,
    removeNote,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setIsOpen(open);
    };

    const closeDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onToggle = useCallback(() => {
        return;
    }, []);
    return (
        <Box p={2}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Box ml={2}>
                    <IconButton
                        aria-label="Edit Note"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={toggleDrawer(true)}
                    >
                        <Create />
                    </IconButton>
                </Box>
                <Box ml={2}>
                    <IconButton
                        aria-label="Delete Note"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => removeNote(selectedNote.noteId)}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            </Box>
            <Box mb={1}>
                <Typography variant="h5" gutterBottom>
                    {selectedNote.title}
                </Typography>
            </Box>
            <Box mb={2}>
                <Typography variant="caption" gutterBottom>
                    Last Updated On: {format(selectedNote.lastUpdatedOn, 'Pp')}
                </Typography>
            </Box>
            <Box mb={2}>
                {selectedNote.tags.map(tag => (
                    <Box key={tag} display="inline-block" marginRight={1}>
                        <Chip label={tag} />
                    </Box>
                ))}
            </Box>
            <Box mb={2}>
                <Typography variant="body2" gutterBottom>
                    {selectedNote.detail}
                </Typography>
            </Box>
            <SwipeableDrawer
                anchor="right"
                open={isOpen}
                onClose={onToggle}
                onOpen={onToggle}
            >
                <UpdateNote
                    note={selectedNote}
                    onCancel={closeDrawer}
                    onCreate={closeDrawer}
                ></UpdateNote>
            </SwipeableDrawer>
        </Box>
    );
};

const mapStateToProps = (state: IAppState) => {
    const selectedNote = getSelectedNote(state);
    return {
        selectedNote,
    };
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
    return {
        removeNote: (noteId: number) => {
            return dispatch(removeNote(noteId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
