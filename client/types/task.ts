import { Dispatch, SetStateAction } from "react"

type Task = {
    __v: number;
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    userEmail: string;
}

type UpdateTaskReq =  Omit<Task , "__v" | "_id" | "userEmail">;

type TaskContextType = {
    tasks: Task[] | null;
    setTasks: Dispatch<SetStateAction<Task[] | null>>;
}

export type { Task, UpdateTaskReq, TaskContextType };
