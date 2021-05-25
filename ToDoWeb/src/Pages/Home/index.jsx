import React from 'react';
import style from './style';
import {useSelector, useDispatch} from 'react-redux';
import {getTasks, dismissError} from "../../Modules/taskActions";
import TaskItem from "../../Components/TaskItem";
import Snackbar from "@material-ui/core/Snackbar";
import CreateTask from 'Components/CreateTask';
import Button from '@material-ui/core/Button';

const Home = props => {
    const [creatingTask, setCreatingTask] = React.useState(false);
    const taskCount = useSelector(state => state.tasks.tasks.length);
    const tasks = useSelector(state => state.tasks.tasks, taskList => taskList.length === taskCount);
    const taskErrors = useSelector(state => state.tasks.errors);
    const dispatch = useDispatch();

    const classes = style();

    React.useEffect(() => {
        dispatch(getTasks());
    }, [])

    const startNewTask = () => setCreatingTask(true);
    const dismissCreation = () => setCreatingTask(false);
    const onDismissError = () => dispatch(dismissError());

    return (
        <div className={classes.root}>
            <div className={classes.topBar}>
                <Button color={'primary'} variant={'contained'} onClick={startNewTask}>Create Task</Button>
            </div>
            <div className={classes.taskList}>
                {taskCount > 0 ?tasks.map((item, index) => <TaskItem index={index} item={item} key={index} />) : null}
            </div>
            <Snackbar onClose={onDismissError} autoHideDuration={5000} open={taskErrors.error} message={'Error: ' + taskErrors.message} />
            <CreateTask open={creatingTask} onClose={dismissCreation} />
        </div>
    )
}

export default Home;
