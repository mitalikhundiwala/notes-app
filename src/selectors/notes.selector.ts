import { createSelector } from 'reselect';
import { IAppState } from '../store';
import Note from '../models/note.model';

const getAllNotes = (state: IAppState) => state.notes;
const getSelectedNoteId = (state: IAppState) => state.ui.selectedNoteId;
const getSearchTerm = (state: IAppState) => state.ui.searchTerm;

export const getNotesSelector = createSelector([getAllNotes], notes => {
    return Object.values(notes)
        .map(note => {
            return notes[note.noteId];
        })
        .sort((a, b) => {
            return a.lastUpdatedOn < b.lastUpdatedOn ? 1 : -1;
        });
});

export const getMatchingNotes = createSelector(
    [getNotesSelector, getSearchTerm],
    (notes, searchTerm) => {
        const filteredNotes = notes.filter(note => {
            const searchRegEx = new RegExp(`${searchTerm}`, 'i');
            return (
                (searchTerm ? note.title.search(searchRegEx) != -1 : true) ||
                (searchTerm ? note.detail.search(searchRegEx) != -1 : true) ||
                (searchTerm
                    ? note.tags.join(',').search(searchRegEx) != -1
                    : true)
            );
        });
        console.log(filteredNotes);
        return filteredNotes;
    }
);

export const getSelectedNote = createSelector(
    [getAllNotes, getSelectedNoteId],
    (notes, selectedNoteId) => {
        return selectedNoteId ? notes[selectedNoteId] : null ?? null;
    }
);

export const getAvailableTags = createSelector([getAllNotes], notes => {
    return Object.values(notes)
        .map((note: Note) => {
            return note.tags ?? [];
        })
        .reduce(function (a, b) {
            return a.concat(b);
        }, []);
});
