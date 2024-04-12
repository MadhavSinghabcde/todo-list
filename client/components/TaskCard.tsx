import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import { Task, TaskContextType } from "@/types/task"
import { removeTask, updateTask } from "@/lib/tasks";
import Button from "./Button";
import { AuthContext } from "@/context/AuthContext";
import { AuthContextType } from "@/types/auth";

type TaskCardProps = {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    const { tasks, setTasks } = useContext(TaskContext) as TaskContextType;
    const { currentAuthUser } = useContext(AuthContext) as AuthContextType;

    const handleRemoveTask = async (taskId: string) => {
        // Optimistic UI
        setTasks(prevTasks => {
            return prevTasks!.filter(task => task._id !== taskId);
        })

        // Actual action
        if (currentAuthUser) {
            const removedTask = await removeTask(
                taskId,
                currentAuthUser?.token
            );

            console.log(removedTask);
        }
    }

    const handleUpdateTask = async (taskId: string) => {
        // // Optimistic UI
        setTasks(prevTasks => {
            return prevTasks!.map(
                task => task._id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        })

        // Actual action
        let newUpdatedTask = tasks!.find(task => task._id === taskId);
        if (newUpdatedTask) newUpdatedTask = {
            ...newUpdatedTask,
            completed: !newUpdatedTask.completed
        };

        if (newUpdatedTask && currentAuthUser) {
            const completedTask = await updateTask(
                newUpdatedTask,
                currentAuthUser?.token
            );

            console.log(completedTask);
        }
    }

    return (
        <div className='flex justify-between items-start border border-[#27272a] p-6 rounded-md gap-5'>
            <div className='flex flex-col space-y-1.5'>
                <h1 className='text-2xl font-bold'>{task.title}</h1>
                <h1 className='text-[#a1a1aa] text-sm'>{task.description}</h1>
                <h1 className={`${task.completed ? 'text-green-500' : 'text-red-500'} text-sm`}>
                    {task.completed ? 'Completed' : 'Not Completed'}
                </h1>
            </div>
            <div className='flex flex-col gap-3'>
                {!task.completed && <Button onClick={() => handleUpdateTask(task._id)} className="hover:border-green-500">Done {'->'}</Button>}
                {task.completed && <Button onClick={() => handleUpdateTask(task._id)} className="hover:border-blue-500">{'<-'} Revert</Button>}
                <Button onClick={() => handleRemoveTask(task._id)} className="hover:border-red-500">Delete</Button>
            </div>
        </div>
    )
}

export default TaskCard;
