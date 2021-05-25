import {ADD_TASK, DELETE_TASK, UPDATE_TASK, GET_ALL_TASKS, FAILED_TASK_GET, RESET_ERROR} from "./Constants";
import {API} from 'aws-amplify';

export const addTask = task => dispatch => API.put('ToDo_API', 'create_task', {
    body: {
        name: task,
    },
}).then(data => {
    dispatch({
        type: ADD_TASK,
        payload: {
            completed: false,
            name: task,
            id: data.data.task_id,
        },
    });
}).catch(err => {
    dispatch({
        type: FAILED_TASK_GET,
        payload: {
            message: 'Failed to create task',
        },
    })
});

export const deleteTask = taskId => dispatch => API.del('ToDo_API', 'delete_task', {
    body: {
        id: taskId
    },
}).then(data => {
    dispatch({
        type: DELETE_TASK,
        payload: data.data.task_id,
    });
}).catch(err => {
    dispatch({
        type: FAILED_TASK_GET,
        payload: {
            message: 'Failed to delete task',
        },
    })
});

export const updateTask = (task, taskCache) => dispatch => API.post('ToDo_API', 'update_task', {
    body: task,
}).then(() => {
    dispatch({
        type: UPDATE_TASK,
        payload: task,
    });
}).catch(err => {
    dispatch({
        type: FAILED_TASK_GET,
        payload:  {
            task: taskCache,
            message: 'Failed to update task',
        },
    })
});

export const getTasks = () => (dispatch) => {
    API.get('ToDo_API', 'get_list').then(data => {
        dispatch({
            type: GET_ALL_TASKS,
            payload: data,
        });
    }).catch(err => {
        dispatch({
            type: FAILED_TASK_GET,
            payload: {
                message: 'Failed to get tasks',
            },
        })
    })
}

export const dismissError = () => dispatch => {
    dispatch({
        type: RESET_ERROR,
        payload: null,
    })
}
