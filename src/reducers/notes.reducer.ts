import Note from '../models/note.model';
import { AnyAction } from 'redux';
import { NotesAction } from '../actions/notes.action';

export type IState = { [key: string]: Note };

const defaultState: IState = {};

export default (state: IState = defaultState, action: AnyAction): IState => {
    switch (action.type) {
        case NotesAction.ADD_NOTE: {
            const note: Note = action.payload;

            const newSlice = {
                [note.noteId]: note,
            };

            return {
                ...state,
                ...newSlice,
            };
        }
        case NotesAction.UPDATE_NOTE: {
            const note: Note = action.payload;

            const updatedSlice = {
                [note.noteId]: {
                    ...state[action.payload.noteId],
                    title: action.payload.title,
                    detail: action.payload.detail,
                },
            };

            return {
                ...state,
                ...updatedSlice,
            };
        }
        case NotesAction.REMOVE_NOTE: {
            const payload: { noteId: number } = action.payload;
            const notes = {
                ...state,
            };
            delete notes[payload.noteId];
            return notes;
        }
        default:
            return state;
    }
};
