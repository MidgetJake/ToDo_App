import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import {addTask} from "Modules/taskActions";
import {DialogActions} from "@material-ui/core";

const CreateTask = props => {
    const [taskName, setTaskName] = React.useState('');
    const dispatch = useDispatch();

    const submitItem = () => {
        dispatch(addTask(taskName));
        setTaskName('');
        props.onClose();
    }

    const updateValue = event => {
        setTaskName(event.target.value)
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Create a new task</DialogTitle>
            <DialogContent>
                <TextField value={taskName} label={'To Do Task'} onChange={updateValue}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={submitItem}>Create Task</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateTask;
