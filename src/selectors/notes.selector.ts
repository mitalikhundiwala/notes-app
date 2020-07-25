import { createSelector } from 'reselect';
import { IAppState } from '../store';
import Note from '../models/note.model';

const getNotes = (state: IAppState) => state.notes;
const getSelectedNoteId = (state: IAppState) => state.ui.selectedNoteId;

export const getNotesSelector = createSelector([getNotes], notes => {
    return Object.values(notes).map(note => {
        return notes[note.noteId];
    });
});

export const getSelectedNote = createSelector(
    [getNotes, getSelectedNoteId],
    (notes, selectedNoteId) => {
        return selectedNoteId ? notes[selectedNoteId] : null ?? null;
    }
);

export const getAvailableTags = createSelector([getNotes], notes => {
    return Object.values(notes)
        .map((note: Note) => {
            return note.tags ?? [];
        })
        .reduce(function (a, b) {
            return a.concat(b);
        }, []);
});
