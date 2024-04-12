import { TaskContext } from "@/context/TaskContext";
import { TaskContextType } from "@/types/task";
import { useContext } from "react";
import TaskCard from "./TaskCard";

type TasksProps = {
    completed: boolean;
}

const Tasks = ({ completed }: TasksProps) => {
    const { tasks } = useContext(TaskContext) as TaskContextType;

    return (
        <div className='flex flex-col gap-5 w-full'>
            <div className='flex items-center gap-3'>
                <h1 className='font-extralight text-sm'>{completed ? 'Completed Tasks' : 'Uncompleted Tasks'}</h1>
                <div className='w-10 border border-gray-500'></div>
            </div>

            {
                // Check array of completed/uncompleted tasks
                tasks
                    ?.filter(task => task.completed === completed)
                    .length === 0 && <h1 className='text-[#a1a1aa]'>No tasks!</h1>
            }

            {tasks?.map(task => (
                task.completed === completed && <TaskCard
                    key={task._id}
                    task={task}
                />
            ))}
        </div>
    )
}

export default Tasks;
