import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    divide: {
        height: '50%',
        width: 1,
        background: 'rgba(0, 0, 0, 0.1)',
    }
}))
