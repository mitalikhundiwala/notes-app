/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Note from '../models/note.model';
import { connect } from 'react-redux';
import { IAppState, AppThunkDispatch } from '../store';
import {
    getAvailableTags,
    getTagsWithNoteCount,
} from '../selectors/notes.selector';
import { Typography, Card, Box, Chip } from '@material-ui/core';

interface IProps {
    tags: string[];
    tagsWithNoteCount: { [key: string]: number };
}

const TagList: FunctionComponent<IProps> = ({ tags, tagsWithNoteCount }) => {
    return (
        <Card variant="outlined">
            <Box pt={1} pl={2}>
                <Typography variant="subtitle1" gutterBottom>
                    Tags ({tags.length})
                </Typography>
                {tags.map((tag: string) => (
                    <Box
                        key={tag}
                        display="inline-block"
                        marginRight={1}
                        marginBottom={1}
                    >
                        <Chip label={`${tag} (${tagsWithNoteCount[tag]})`} />
                    </Box>
                ))}
            </Box>
        </Card>
    );
};

const mapStateToProps = (state: IAppState) => {
    const tags: string[] = getAvailableTags(state);
    const tagsWithNoteCount = getTagsWithNoteCount(state);
    return {
        tags,
        tagsWithNoteCount,
    };
};

export default connect(mapStateToProps)(TagList);
