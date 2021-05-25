import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(1),
    },
    loginTitle: {
        paddingBottom: theme.spacing(2),
        margin: theme.spacing(1),
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    loginItem: {
        marginTop: theme.spacing(1) + 'px !important',
    },
    errorText: {
        color: '#f44336',
        marginTop: theme.spacing(1),
    },
}))
