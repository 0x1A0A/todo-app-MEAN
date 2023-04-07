interface Task {
    _id: string,
    title: string,
    status: string,
};

interface TaskPayload {
    title: string,
};

export {Task, TaskPayload};