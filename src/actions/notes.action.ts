import { ThunkAction } from 'redux-thunk';
import Note from '../models/note.model';
import { Dispatch, AnyAction } from 'redux';
import { IAppState } from '../store';
import NoteService from '../services/notes.service';

export enum NotesAction {
    ADD_NOTE = 'ADD_NOTE',
    SELECT_NOTE = 'SELECT_NOTE',
    UPDATE_NOTE = 'UPDATE_NOTE',
    REMOVE_NOTE = 'REMOVE_NOTE',
}

export const addNoteSuccess = (note: Note): AnyAction => {
    return {
        type: NotesAction.ADD_NOTE,
        payload: {
            ...note,
        },
    };
};

export const addNote = (
    title: string,
    detail: string
): ThunkAction<Promise<Note>, IAppState, undefined, AnyAction> => {
    return async (dispatch: Dispatch) => {
        const note = await NoteService.addNote(title, detail);
        dispatch(addNoteSuccess(note));
        return note;
    };
};

export const updateNoteSuccess = (note: Note): AnyAction => {
    return {
        type: NotesAction.UPDATE_NOTE,
        payload: {
            ...note,
        },
    };
};

export const updateNote = (
    noteId: number,
    title: string,
    detail: string
): ThunkAction<Promise<Note>, IAppState, undefined, AnyAction> => {
    return async (dispatch: Dispatch) => {
        const note = await NoteService.updateNote(noteId, title, detail);
        dispatch(updateNoteSuccess(note));
        return note;
    };
};

export const removeNoteSuccess = (note: { noteId: number }): AnyAction => {
    return {
        type: NotesAction.REMOVE_NOTE,
        payload: {
            ...note,
        },
    };
};

export const removeNote = (
    noteId: number
): ThunkAction<
    Promise<{ noteId: number }>,
    IAppState,
    undefined,
    AnyAction
> => {
    return async (dispatch: Dispatch) => {
        const note = await NoteService.removeNote(noteId);
        dispatch(removeNoteSuccess(note));
        return note;
    };
};

export const selectNote = (noteId: number): AnyAction => {
    return {
        type: NotesAction.SELECT_NOTE,
        payload: {
            noteId,
        },
    };
};
