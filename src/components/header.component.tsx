/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PostAdd from '@material-ui/icons/PostAdd';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const Header: FunctionComponent = () => {
    const [state, setState] = React.useState({
        bottom: false,
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
                        onClick={toggleDrawer('bottom', !state['bottom'])}
                    >
                        <PostAdd />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor="bottom"
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
                onOpen={toggleDrawer('bottom', true)}
            >
                Hello
            </SwipeableDrawer>
        </>
    );
};

export default Header;
