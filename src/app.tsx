import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import NoteList from './components/note-list.component';
import TagList from './components/tag-list.component';
import NoteDetail from './components/note-detail.component';
import Header from './components/header.component';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { IAppState } from './store';
import Alert from '@material-ui/lab/Alert';
import Note from './models/note.model';
import { getMatchingNotes } from './selectors/notes.selector';

interface IProps {
    selectedNoteId: number | null;
    notes: Note[];
}

const App: FunctionComponent<IProps> = ({ selectedNoteId, notes }) => {
    return (
        <>
            <Header />
            <Container>
                <Box mt={8}>
                    {notes.length ? (
                        <Grid container spacing={2}>
                            <Grid item sm={3} xs={12}>
                                <Box mt={2}>
                                    <NoteList></NoteList>
                                </Box>
                                <Box mt={2}>
                                    <TagList></TagList>
                                </Box>
                            </Grid>
                            <Grid item sm={9} xs={12}>
                                {selectedNoteId ? (
                                    <Box mt={2}>
                                        <NoteDetail></NoteDetail>
                                    </Box>
                                ) : (
                                    <Box p={2}>
                                        <Alert severity="info">
                                            Please select a note from list or
                                            create a new one!
                                        </Alert>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    ) : (
                        <Box p={2}>
                            <Alert severity="info">Start creating notes!</Alert>
                        </Box>
                    )}
                </Box>
            </Container>
        </>
    );
};

const mapStateToProps = (state: IAppState) => {
    return {
        selectedNoteId: state.ui.selectedNoteId,
        notes: getMatchingNotes(state),
    };
};

export default connect(mapStateToProps)(App);
