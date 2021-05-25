import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(1),
    },
    registerTitle: {
        paddingBottom: theme.spacing(2),
        margin: theme.spacing(1),
    },
    registerForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    registerItem: {
        marginTop: theme.spacing(1) + 'px !important',
    },
    errorText: {
        color: '#f44336',
        marginTop: theme.spacing(1),
    },
    successText: {
        marginLeft: 16,
    },
    successCaption: {
        textAlign: 'center'
    },
}))
