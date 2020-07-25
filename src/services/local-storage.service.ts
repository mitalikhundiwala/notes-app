import { IAppState } from '../store/index';
import Note from '../models/note.model';

export default class LocalStorageService {
    static saveState(state: IAppState): void {
        try {
            const serializedState = JSON.stringify({
                notes: state.notes,
            });
            localStorage.setItem('note-app', serializedState);
        } catch (err) {
            // Ignore Errors
        }
    }

    static loadState(): any {
        try {
            const serializedState = localStorage.getItem('note-app');
            if (serializedState === null) {
                return {};
            }
            const parsedState = JSON.parse(serializedState);
            Object.keys(parsedState.notes)?.forEach(noteId => {
                const note = new Note({
                    ...parsedState.notes[noteId],
                    lastUpdatedOn: new Date(
                        parsedState.notes[noteId].lastUpdatedOn
                    ),
                });
                parsedState.notes[noteId] = note;
            });
            return {
                ...parsedState,
            };
        } catch (err) {
            return {};
        }
    }
}
