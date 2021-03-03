import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    background: {
        position: 'fixed',
        zIndex: 1,
        opacity: 0.9,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: theme.palette.primary.main,
    },
    spinner: {
        zIndex: 1000,
        height: 100,
        width: 100,
    },
    wrapper: {
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    }
}));

export default function Spinner() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.wrapper}>
                <CircularProgress
                color="secondary"
                size="large"
                className={classes.spinner}
                />
            </div>
            <div className={classes.background} />
        </div>

    );
}
