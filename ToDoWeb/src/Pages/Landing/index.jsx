import React from 'react';
import Login from 'Components/Login';
import Register from 'Components/Register';
import style from './style';

const Landing = props => {
    const classes = style();

    return (
        <div className={classes.root}>
            <Login />
            <div className={classes.divide} />
            <Register />
        </div>
    )
}

export default Landing;
