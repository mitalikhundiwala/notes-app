/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Note from '../models/note.model';
import { connect } from 'react-redux';
import { IAppState, AppThunkDispatch } from '../store';
import {
    getAllNotes,
    getSelectedNote,
    getMatchingNotes,
} from '../selectors/notes.selector';
import { selectNote } from '../actions/notes.action';
import { Typography, Card, CardContent, Box } from '@material-ui/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

interface IProps {
    notes: Note[];
    selectedNote: Note | null;
    selectNote: (noteId: number) => void;
}

const NoteList: FunctionComponent<IProps> = ({
    notes,
    selectedNote,
    selectNote,
}) => {
    return (
        <Card variant="outlined">
            <Box pl={2} pt={1}>
                <Typography variant="subtitle1">
                    Notes ({notes.length})
                </Typography>
            </Box>
            <List>
                {notes.map((note: Note) => {
                    return (
                        <ListItem
                            key={note.noteId}
                            selected={note.noteId === selectedNote?.noteId}
                            onClick={() => selectNote(note.noteId)}
                        >
                            <ListItemText
                                primary={note.title}
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            style={{ display: 'inline' }}
                                            color="textPrimary"
                                        >
                                            {formatDistanceToNow(
                                                note.lastUpdatedOn,
                                                { addSuffix: true }
                                            )}
                                        </Typography>{' '}
                                        {note.detail.substr(0, 40)}
                                    </>
                                }
                            ></ListItemText>
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );
};

const mapStateToProps = (state: IAppState) => {
    const notes: Note[] = getMatchingNotes(state);
    const selectedNote = getSelectedNote(state);
    return {
        selectedNote,
        notes,
    };
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
    return {
        selectNote: (noteId: number) => {
            return dispatch(selectNote(noteId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
