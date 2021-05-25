import React from 'react';
import style from './styles';
import {Button, TextField, Card} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import {addTask} from '../../Modules/taskActions';
import {Text} from 'react-native';

const TaskItem = props => {
    const [taskName, setTaskName] = React.useState("");
    const dispatch = useDispatch();

    const submitItem = () => {
        dispatch(addTask(taskName));
        props.onClose();
    }

    return (
        <Card style={style.root}>
            <Text style={style.title}>Create a new task</Text>
            <TextField title={'Task'} placeholder={'Task name...'} onChangeText={setTaskName} />
            <Button onPress={submitItem} label={'Create Task'}/>
        </Card>
    );
};

export default TaskItem;
