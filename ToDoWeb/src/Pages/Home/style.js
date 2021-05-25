import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    topBar: {
        maxWidth: 600,
        width: '100%',
        padding: 8,
        display:'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#EEEEEE'
    },
    taskList: {
        maxWidth: 600,
        width: '100%',
    },
}))
