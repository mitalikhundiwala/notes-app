import {
    createStore,
    combineReducers,
    Reducer,
    AnyAction,
    compose,
    applyMiddleware,
} from 'redux';

import notesReducer, { IState as INotesState } from '../reducers/notes.reducer';
import uiReducer, { IState as IUIState } from '../reducers/ui.reducer';
import thunk, { ThunkDispatch } from 'redux-thunk';
import LocalStorageService from '../services/local-storage.service';

export interface IAppState {
    notes: INotesState;
    ui: IUIState;
}
export type AppThunkDispatch = ThunkDispatch<IAppState, undefined, AnyAction>;

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers: Reducer<IAppState> = combineReducers({
    notes: notesReducer,
    ui: uiReducer,
});

export default () => {
    const store = createStore(
        combinedReducers,
        LocalStorageService.loadState(),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
