import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Note from './models/note.model';
import NoteList from './components/note-list.component';
import Header from './components/header.component';

const App: FunctionComponent = () => {
    const notes: Note[] = [
        {
            noteId: 1,
            title: 'My First Note',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        },
        {
            noteId: 2,
            title: 'My Second Note',
            description:
                'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        },
        {
            noteId: 3,
            title: 'My Third Note',
            description: 'lorem ipsum lorem ipsum ',
        },
        {
            noteId: 4,
            title: 'My Fourth Note',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        },
        {
            noteId: 5,
            title: 'My Fifth Note',
            description: 'lorem ipsum ',
        },
    ];

    return (
        <>
            <Header />
            <Container>
                <Box mt={8}>
                    <NoteList notes={notes}></NoteList>
                </Box>
            </Container>
        </>
    );
};

export default App;
