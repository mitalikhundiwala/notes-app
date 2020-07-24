import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import NoteList from './components/note-list.component';
import NoteDetail from './components/note-detail.component';
import Header from './components/header.component';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { IAppState } from './store';

interface IProps {
    selectedNoteId: number | null;
}

const App: FunctionComponent<IProps> = ({ selectedNoteId }) => {
    // const notes: Note[] = [
    //     {
    //         noteId: 1,
    //         title: 'My First Note',
    //         detail: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
    //     },
    //     {
    //         noteId: 2,
    //         title: 'My Second Note',
    //         detail:
    //             'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
    //     },
    //     {
    //         noteId: 3,
    //         title: 'My Third Note',
    //         detail: 'lorem ipsum lorem ipsum ',
    //     },
    //     {
    //         noteId: 4,
    //         title: 'My Fourth Note',
    //         detail: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
    //     },
    //     {
    //         noteId: 5,
    //         title: 'My Fifth Note',
    //         detail: 'lorem ipsum ',
    //     },
    // ];

    return (
        <>
            <Header />
            <Container>
                <Box mt={8}>
                    <Grid container>
                        <Grid item sm={6}>
                            <NoteList></NoteList>
                        </Grid>
                        {selectedNoteId ? (
                            <Grid item sm={6}>
                                <NoteDetail></NoteDetail>
                            </Grid>
                        ) : null}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

const mapStateToProps = (state: IAppState) => {
    return {
        selectedNoteId: state.ui.selectedNoteId,
    };
};

export default connect(mapStateToProps)(App);
