export default class Note {
  noteId: number;
  title: string;
  description: string;

  constructor(data: any) {
    this.noteId = data.noteId;
    this.title = data.title;
    this.description = data.description;
  }
}
