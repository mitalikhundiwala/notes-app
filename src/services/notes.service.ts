import { delay } from '../utils/promise.utils';
import Note from '../models/note.model';

class NoteService {
    static async addNote(title: string, detail: string): Promise<Note> {
        await delay(1000);
        const noteId = new Date().getTime();

        return new Note({
            noteId,
            title,
            description: detail,
        });
    }
}

export default NoteService;
