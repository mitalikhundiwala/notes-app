export default class Note {
    noteId: number;
    title: string;
    detail: string;
    tags: string[];
    lastUpdatedOn: Date;

    constructor(data: any) {
        this.noteId = data.noteId;
        this.title = data.title;
        this.detail = data.detail;
        this.tags = data.tags;
        this.lastUpdatedOn = data.lastUpdatedOn;
    }
}
