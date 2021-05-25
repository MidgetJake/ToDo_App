import {ADD_TASK, DELETE_TASK, UPDATE_TASK, GET_ALL_TASKS, FAILED_TASK_GET, RESET_ERROR} from "./Constants";

const initialState = {
    tasks: [],
    errors: {
        error: false,
        message: '',
    }
}

const taskReducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type) {
        case ADD_TASK:
            newState.tasks.push(action.payload);
            return newState;
        case DELETE_TASK:
            newState.tasks = newState.tasks.filter(task => task.id !== action.payload)
            return newState;
        case UPDATE_TASK:
            const updated = newState.tasks.findIndex(task => task.id === action.payload.id)
            newState.tasks[updated] = action.payload;
            return newState;
        case GET_ALL_TASKS:
            newState.tasks = action.payload.data;
            return newState;
        case FAILED_TASK_GET:
            newState.errors = {
                error: true,
                message: action.payload.message
            }

            // If it was updated, revert it
            if(action.payload.hasOwnProperty('task')) {
                const index = newState.tasks.findIndex(task => task.id === action.payload.task.id)
                newState.tasks[index] = action.payload.task;
            }
            return newState;
        case RESET_ERROR:
            newState.errors = {
                error: false,
                message: ''
            }
            return newState;
        default:
            return state;
    }
}

export default taskReducer;
