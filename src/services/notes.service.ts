import { delay } from '../utils/promise.utils';
import Note from '../models/note.model';

class NoteService {
    static async addNote(title: string, detail: string): Promise<Note> {
        await delay(1000);
        const noteId = new Date().getTime();

        return new Note({
            noteId,
            title,
            detail,
        });
    }

    static async updateNote(
        noteId: number,
        title: string,
        detail: string
    ): Promise<Note> {
        await delay(1000);

        return {
            noteId,
            title,
            detail,
        };
    }

    static async removeNote(
        noteId: number
    ): Promise<{
        noteId: number;
    }> {
        await delay(1000);

        return {
            noteId,
        };
    }
}

export default NoteService;
