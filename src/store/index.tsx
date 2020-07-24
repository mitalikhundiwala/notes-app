import {
    createStore,
    combineReducers,
    Reducer,
    AnyAction,
    compose,
    applyMiddleware,
} from 'redux';

import notesReducer, { IState as INotesState } from '../reducers/notes.reducer';
import thunk, { ThunkDispatch } from 'redux-thunk';

export interface IAppState {
    notes: INotesState;
}
export type AppThunkDispatch = ThunkDispatch<IAppState, undefined, AnyAction>;

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers: Reducer<IAppState> = combineReducers({
    notes: notesReducer,
});

export default () => {
    const store = createStore(
        combinedReducers,
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
