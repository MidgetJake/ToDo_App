import React from 'react';
import style from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {registerUser} from 'Modules/userActions';

const Register = props => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [complete, setComplete] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const registerState = useSelector(state => state.user.register, shallowEqual);
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        dispatch(registerUser(username, password))
    }

    React.useEffect(() => {
        if(registerState.attempting) {
            setLoading(true);
        } else {
            if(registerState.success) {
                setUsername('')
                setPassword('')
                setComplete(true);
            }
            setLoading(false);
        }
    }, [registerState])

    const classes = style();

    return (
        <div className={classes.root}>
            {!complete ? (
                <>
                    <Typography className={classes.registerTitle} variant={'h5'}>Sign up</Typography>
                    <form onSubmit={handleSubmit} className={classes.registerForm}>
                        {registerState.error && (
                            <Typography variant={'caption'} gutterBottom className={classes.errorText}>
                                {registerState.code}
                            </Typography>
                        )}
                        <TextField className={classes.registerItem} error={registerState.error} variant={'outlined'} label={'Username'} onChange={event => setUsername(event.target.value)}/>
                        <TextField error={registerState.error} variant={'outlined'} type={'password'} label={'Password'} className={classes.registerItem} onChange={event => setPassword(event.target.value)}/>
                        <Button type={'submit'} disabled={loading} variant={'contained'} color={'primary'} className={classes.registerItem} onClick={handleSubmit}>
                            Sign up
                        </Button>
                    </form>
                </>
            ) : (
                <>
                    <Typography variant={'subtitle1'} className={classes.successText}>
                        Successfully registered!
                    </Typography>
                    <Typography variant={'caption'} className={classes.successText}>
                        You may now login
                    </Typography>
                </>
            )}
        </div>
    )
}

export default Register;
