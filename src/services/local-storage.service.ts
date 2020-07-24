import { IAppState } from '../store/index';

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

    static loadState(): {
        notes: { [key: string]: any };
    } {
        try {
            const serializedState = localStorage.getItem('note-app');
            if (serializedState === null) {
                return {};
            }
            const parsedState = JSON.parse(serializedState);
            console.log(parsedState);
            return {
                ...parsedState,
            };
        } catch (err) {
            return {};
        }
    }
}
