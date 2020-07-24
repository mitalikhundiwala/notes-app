/* eslint-disable react/prop-types */
import React, { FunctionComponent, useState, useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PostAdd from '@material-ui/icons/PostAdd';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CreateNote from './note-create.component';

const Header: FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (
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

        setIsOpen(open);
    };

    const closeDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onToggle = useCallback(() => {
        return;
    }, []);

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
                        onClick={toggleDrawer(true)}
                    >
                        <PostAdd />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor="right"
                open={isOpen}
                onClose={onToggle}
                onOpen={onToggle}
            >
                <CreateNote
                    onCancel={closeDrawer}
                    onCreate={closeDrawer}
                ></CreateNote>
            </SwipeableDrawer>
        </>
    );
};

export default Header;
