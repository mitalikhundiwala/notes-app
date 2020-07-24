import { createStore, combineReducers, Reducer } from "redux";

import notesReducer, { IState as INotesState } from "../reducers/notes.reducer";

export interface IAppState {
  notes: INotesState;
}

const combinedReducers: Reducer<IAppState> = combineReducers({
  notes: notesReducer,
});

export default () => {
  const store = createStore(combinedReducers);

  return store;
};
