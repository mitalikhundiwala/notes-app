/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Note from '../models/note.model';
import { connect } from 'react-redux';
import { IAppState } from '../store';
import { getNotesSelector } from '../selectors/notes.selector';

interface IProps {
    notes: Note[];
}

const NoteList: FunctionComponent<IProps> = ({ notes }) => {
    return (
        <List>
            {notes.map((note: Note) => {
                return (
                    <ListItem key={note.noteId}>
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
    const notes: Note[] = getNotesSelector(state);
    return {
        notes: notes,
    };
};

export default connect(mapStateToProps)(NoteList);
