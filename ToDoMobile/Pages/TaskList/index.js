import React from 'react';
import style from './styles';
import { FlatList } from 'react-native';
import { View, Text, Button, Dialog, Toast } from 'react-native-ui-lib';
import {useSelector, useDispatch} from 'react-redux';
import {getTasks, dismissError} from "../../Modules/taskActions";
import TaskItem from "../../Components/TaskItem";
import CreateTask from '../../Components/CreateTask';


const TaskList = props => {
    const [creatingTask, setCreatingTask] = React.useState(false);
    const tasks = useSelector(state => state.tasks.tasks, taskList => taskList.length === taskCount);
    const taskErrors = useSelector(state => state.tasks.errors);
    const [taskCount, setTaskCount] = React.useState(tasks.length);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTasks());
    }, [])

    React.useEffect(() => {
        setTaskCount(tasks.length)
    }, [tasks]);

    const renderItem = (item) => {
        return <TaskItem item={item}/>
    }

    const startNewTask = () => setCreatingTask(true);
    const dismissCreation = () => setCreatingTask(false);
    const onDismissError = () => dispatch(dismissError());

    return (
        <View style={style.root}>
            <FlatList
                data={tasks.length > 0 ? tasks : []}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={style.bottomSect}>
                <Button style={style.bottomButton} onPress={startNewTask} label={'Create new task'}/>
                <Text style={style.bottomText}>Swipe right to delete, check the box to complete</Text>
            </View>
            <Dialog visible={creatingTask} onDismiss={dismissCreation}>
                <CreateTask onClose={dismissCreation}/>
            </Dialog>
            <Toast backgroundColor={'#a34646'} onDismiss={onDismissError} visible={taskErrors.error} message={'ERROR: ' + taskErrors.message} autoDismiss={5000}/>
        </View>
    );
}

export default TaskList;
