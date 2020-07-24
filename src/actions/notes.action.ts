import { ThunkAction } from 'redux-thunk';
import Note from '../models/note.model';
import { Dispatch, AnyAction } from 'redux';
import { IAppState } from '../store';
import NoteService from '../services/notes.service';

export enum NotesAction {
    ADD_NOTE = 'ADD_NOTE',
}

export const addNoteSuccess = (note: Note) => ({
    type: NotesAction.ADD_NOTE,
    payload: {
        ...note,
    },
});

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
