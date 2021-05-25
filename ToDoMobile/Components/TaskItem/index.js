import React from 'react';
import style from './styles';
import {Drawer, View, Card, Checkbox} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTask, updateTask} from '../../Modules/taskActions';
import {Text} from 'react-native';

const TaskItem = props => {
    const [item, setItem] = React.useState(props.item.item);
    const [loadingTimeout, setLoadingTimeout] = React.useState(null);
    const task = useSelector(state => state.tasks.tasks[props.item.index]);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const onDeleteItem = () => {
        dispatch(deleteTask(item.id));
    }

    React.useEffect(() => {
        // Update the state when the task is updated within the state
        setItem(task);
        // The action was complete to make sure we clear the timeout
        clearTimeout(loadingTimeout);
        setLoading(false);
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
        <Card style={style.task}>
            <Drawer
                bounciness={0}
                fullSwipeLeft={false}
                leftItem={{
                  text: 'Delete',
                  background: '#ab5656',
                  onPress: onDeleteItem,
            }}>
                <View style={style.inner}>
                    <Checkbox disabled={loading} value={item.completed} onValueChange={onCompleteItem}/>
                    <Text style={style.text}>{item.name}</Text>
                </View>
            </Drawer>
        </Card>
    );
};

export default TaskItem;
