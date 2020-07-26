/* eslint-disable react/prop-types */
import React, { FunctionComponent, useCallback, useState } from 'react';
import Note from '../models/note.model';
import { connect } from 'react-redux';
import {
    Typography,
    SwipeableDrawer,
    Chip,
    Box,
    Card,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core';
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

    const [isOpenDialog, setIsDialogOpen] = React.useState(false);

    const handleClickOpen = () => {
        setIsDialogOpen(true);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    return (
        <Card variant="outlined">
            <Box p={2}>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Box ml={2}>
                        <Button
                            size="small"
                            color="secondary"
                            onClick={() => handleClickOpen()}
                        >
                            Delete
                        </Button>
                        <Dialog
                            open={isOpenDialog}
                            onClose={handleClose}
                            aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle
                                style={{ cursor: 'move' }}
                                id="draggable-dialog-title"
                            >
                                Confirmation
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    color="primary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        removeNote(selectedNote.noteId);
                                    }}
                                    color="primary"
                                >
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    <Box ml={2}>
                        <Button
                            size="small"
                            color="primary"
                            onClick={toggleDrawer(true)}
                        >
                            Edit
                        </Button>
                    </Box>
                </Box>
                <Box mb={1}>
                    <Typography variant="h5" gutterBottom>
                        {selectedNote.title}
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="caption" gutterBottom>
                        Last Updated On:{' '}
                        {format(selectedNote.lastUpdatedOn, 'Pp')}
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
                    <Typography
                        style={{ whiteSpace: 'pre-wrap' }}
                        component="p"
                        variant="body2"
                        gutterBottom
                    >
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
        </Card>
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
