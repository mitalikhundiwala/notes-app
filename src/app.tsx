import React, { FunctionComponent } from 'react';
import NoteList from './components/note-list.component';
import Note from './models/note.model';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">Notes</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Box mt={8}>
                    <NoteList notes={notes}></NoteList>
                </Box>
            </Container>
        </>
    );
};

export default App;
