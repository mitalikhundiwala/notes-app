/* eslint-disable react/prop-types */
import React, { FunctionComponent, useState, useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PostAdd from '@material-ui/icons/PostAdd';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CreateNote from './note-create.component';
import SearchIcon from '@material-ui/icons/Search';
import {
    InputBase,
    createStyles,
    makeStyles,
    Theme,
    fade,
    Button,
    Box,
} from '@material-ui/core';
import { AppThunkDispatch } from '../store';
import { searchNote } from '../actions/notes.action';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    })
);
interface IProps {
    handleSearch: (searchTerm: string) => void;
}

const Header: FunctionComponent<IProps> = ({ handleSearch }) => {
    const classes = useStyles();

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
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search Notes…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={event => {
                                handleSearch(event.target.value);
                            }}
                        />
                    </div>
                    <Box flexGrow={1} />
                    <Button
                        color="inherit"
                        startIcon={<PostAdd />}
                        onClick={toggleDrawer(true)}
                    >
                        Create
                    </Button>
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

const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
    return {
        handleSearch: (searchTerm: string) => {
            return dispatch(searchNote(searchTerm));
        },
    };
};

export default connect(undefined, mapDispatchToProps)(Header);
