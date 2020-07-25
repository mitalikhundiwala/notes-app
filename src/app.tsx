import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import NoteList from './components/note-list.component';
import NoteDetail from './components/note-detail.component';
import Header from './components/header.component';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { IAppState } from './store';
import Alert from '@material-ui/lab/Alert';

interface IProps {
    selectedNoteId: number | null;
}

const App: FunctionComponent<IProps> = ({ selectedNoteId }) => {
    return (
        <>
            <Header />
            <Container>
                <Box mt={8}>
                    <Grid container>
                        <Grid item sm={3}>
                            <NoteList></NoteList>
                        </Grid>
                        <Grid item sm={9}>
                            {selectedNoteId ? (
                                <NoteDetail></NoteDetail>
                            ) : (
                                <Box p={2}>
                                    <Alert severity="info">
                                        Please select note from list or create a
                                        new one!
                                    </Alert>
                                </Box>
                            )}
                        </Grid>
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
