import { delay } from '../utils/promise.utils';
import Note from '../models/note.model';

class NoteService {
    static async addNote(
        title: string,
        detail: string,
        tags: string[]
    ): Promise<Note> {
        await delay(1000);
        const noteId = new Date().getTime();

        return new Note({
            noteId,
            title,
            detail,
            tags,
        });
    }

    static async updateNote(
        noteId: number,
        title: string,
        detail: string,
        tags: string[]
    ): Promise<Note> {
        await delay(1000);

        return {
            noteId,
            title,
            detail,
            tags,
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
