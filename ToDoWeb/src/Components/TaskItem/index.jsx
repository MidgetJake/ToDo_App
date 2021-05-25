import React from 'react';
import style from './style';

import {useDispatch, useSelector} from 'react-redux';
import {deleteTask, updateTask} from '../../Modules/taskActions';
import Card from '@material-ui/core/Card';
import Checkbox from "@material-ui/core/Checkbox";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const TaskItem = (props) => {
    const [item, setItem] = React.useState(props.item);
    const [loadingTimeout, setLoadingTimeout] = React.useState(null);
    const task = useSelector(state => state.tasks.tasks[props.index]);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const classes = style();
    const onDeleteItem = () => dispatch(deleteTask(item.id));

    React.useEffect(() => {
        setItem(task);
        setLoading(false);
        clearTimeout(loadingTimeout);
    }, [task]);

    const onCompleteItem = () => {
        setLoading(true);
        const tmpItem = {
            ...item,
            completed: !item.completed,
        };

        dispatch(updateTask(tmpItem, item));

        // A timeout for the action
        setLoadingTimeout(setTimeout(() => {
            setLoading(false)
        }, 5000))
    };

    // If it were the last item it would start throwing fits
    // as the state would update here before the list updated
    if (!item) {
        return null;
    }

    return (
        <Card className={classes.root} >
            <Checkbox disabled={loading} checked={item.completed} onChange={onCompleteItem}/>
            <Typography className={classes.text}>{item.name}</Typography>
            <IconButton color={'secondary'} onClick={onDeleteItem}>
                <DeleteIcon />
            </IconButton>
        </Card>
    )
}

export default TaskItem;
