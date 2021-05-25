import React from 'react';
import style from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {loginUser} from 'Modules/userActions';

const Login = props => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const loginState = useSelector(state => state.user.login, shallowEqual);
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        dispatch(loginUser(username, password))
    }

    React.useEffect(() => {
        if(loginState.attempting) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [loginState])

    const classes = style();

    return (
        <div className={classes.root}>
            <Typography className={classes.loginTitle} variant={'h5'}>Login</Typography>
            <form onSubmit={handleSubmit} className={classes.loginForm}>
                {loginState.error && (
                    <Typography variant={'caption'} gutterBottom className={classes.errorText}>
                        Incorrect username or password
                    </Typography>
                )}
                <TextField className={classes.loginItem} error={loginState.error} variant={'outlined'} label={'Username'} onChange={event => setUsername(event.target.value)}/>
                <TextField error={loginState.error} variant={'outlined'} type={'password'} label={'Password'} className={classes.loginItem} onChange={event => setPassword(event.target.value)}/>
                <Button type={'submit'} disabled={loading} variant={'contained'} color={'primary'} className={classes.loginItem} onClick={handleSubmit}>
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login;
