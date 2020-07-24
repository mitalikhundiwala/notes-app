import Note from '../models/note.model';
import { AnyAction } from 'redux';
import { NotesAction } from '../actions/notes.action';

export type IState = { [key: string]: Note };

const defaultState: IState = {};

export default (state: IState = defaultState, action: AnyAction): IState => {
    switch (action.type) {
        default:
            return state;
    }
};
