import { createSelector } from 'reselect';
import { IAppState } from '../store';
import Note from '../models/note.model';

const getNotes = (state: IAppState) => state.notes;
const getSelectedNoteId = (state: IAppState) => state.ui.selectedNoteId;
const getSearchTerm = (state: IAppState) => state.ui.searchTerm;

export const getAllNotes = createSelector([getNotes], notes => {
    return Object.values(notes)
        .map(note => {
            return notes[note.noteId];
        })
        .sort((a, b) => {
            return a.lastUpdatedOn < b.lastUpdatedOn ? 1 : -1;
        });
});

export const getMatchingNotes = createSelector(
    [getAllNotes, getSearchTerm],
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
    [getNotes, getSelectedNoteId],
    (notes, selectedNoteId) => {
        return selectedNoteId ? notes[selectedNoteId] : null ?? null;
    }
);

export const getAvailableTags = createSelector([getNotes], notes => {
    const allTags = Object.values(notes)
        .map((note: Note) => {
            return note.tags ?? [];
        })
        .reduce((a, b) => {
            return a.concat(b);
        }, [])
        .sort((a, b) => {
            return a > b ? 1 : -1;
        });
    return [...new Set(allTags)];
});

export const getTagsWithNoteCount = createSelector(
    [getAvailableTags, getAllNotes],
    (tags, notes) => {
        const tagsWithNoteCount = tags.map((tag: string) => {
            const notesWithTag = notes.filter((note: Note) => {
                return note.tags?.includes(tag);
            });
            return [tag, notesWithTag.length];
        });

        return Object.fromEntries(tagsWithNoteCount);
    }
);
