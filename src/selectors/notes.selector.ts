import { createSelector } from 'reselect';
import { IAppState } from '../store';

const getNotes = (state: IAppState) => state.notes;

export const getNotesSelector = createSelector([getNotes], notes => {
    return Object.values(notes).map(note => {
        return notes[note.noteId];
    });
});
