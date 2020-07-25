import { AnyAction } from 'redux';
import { NotesAction } from '../actions/notes.action';

export interface IState {
    selectedNoteId: number | null;
    searchTerm: string | null;
}

const defaultState: IState = {
    selectedNoteId: null,
    searchTerm: null,
};

export default (state: IState = defaultState, action: AnyAction): IState => {
    switch (action.type) {
        case NotesAction.SELECT_NOTE:
            return {
                ...state,
                selectedNoteId: action.payload.noteId,
            };
        case NotesAction.REMOVE_NOTE: {
            return {
                ...state,
                selectedNoteId: null,
            };
        }
        case NotesAction.SEARCH_NOTE: {
            return {
                ...state,
                searchTerm: action.payload.searchTerm,
            };
        }
        default:
            return state;
    }
};
