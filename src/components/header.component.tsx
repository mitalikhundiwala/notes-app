/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PostAdd from '@material-ui/icons/PostAdd';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CreateNote from './note-create.component';

const Header: FunctionComponent = () => {
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor: string, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">Notes</Typography>
                    <IconButton
                        aria-label="Add Note"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={toggleDrawer('right', !state['right'])}
                    >
                        <PostAdd />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor="right"
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >
                <CreateNote></CreateNote>
            </SwipeableDrawer>
        </>
    );
};

export default Header;
