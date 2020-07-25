/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Note from '../models/note.model';
import { connect } from 'react-redux';
import { IAppState, AppThunkDispatch } from '../store';
import { getNotesSelector, getSelectedNote, getMatchingNotes } from '../selectors/notes.selector';
import { selectNote } from '../actions/notes.action';

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
                            secondary={note.detail}
                        ></ListItemText>
                    </ListItem>
                );
            })}
        </List>
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
