'use client'

import { useContext, useEffect, useState } from "react";
import { TaskContext } from "@/context/TaskContext";
import { TaskContextType, UpdateTaskReq } from "@/types/task";
import { addTask, getTasks } from "@/lib/tasks";
import Button from "@/components/Button";
import Tasks from "@/components/Tasks";
import { redirect } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { AuthContextType, AuthUser } from "@/types/auth";
import TaskForm from "@/components/TaskForm";

const App = () => {
    const { currentAuthUser, setCurrentAuthUser } = useContext(AuthContext) as AuthContextType;
    const { setTasks } = useContext(TaskContext) as TaskContextType;
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleAddTask = async (task: UpdateTaskReq) => {
        console.log({ task });
        setIsPopupOpen(false)

        // Optimistic UI
        const randomId = Math.floor(Math.random() * 1000).toString();
        setTasks(prevTasks => {
            return [...prevTasks!, {
                ...task,
                __v: 0,
                _id: randomId,
                // CHECK: User of 'not null' operator here
                userEmail: currentAuthUser?.email!
            }];
        })

        // Actual action
        if (currentAuthUser) {
            const addedTask = await addTask(
                task,
                currentAuthUser.token
            );

            // Change in from optimistic tasks
            // Update to new server received value (id, userEmail)
            // CHECK: Might be a little ugly refactor. Need some improvement ig?
            setTasks(prevTasks => {
                return prevTasks
                    ? prevTasks.map(currTask => {
                        return currTask._id === randomId
                            ? addedTask
                            : currTask
                    })
                    : [addedTask]
            })
        }
    }

    useEffect(() => {
        const fetchTask = async (currentUser: AuthUser) => {
            const fetchedTasks = await getTasks(currentUser.token);
            setTasks(fetchedTasks);
        }

        // TODO?: Change to cookie base system
        if (localStorage.getItem('user')) {
            // TODO: Fix all these naming confusion
            // Between 'currentUser' and 'currentAuthUser'
            const currentUser: AuthUser = JSON.parse(localStorage.getItem('user')!);

            setCurrentAuthUser(currentUser);
            fetchTask(currentUser);
        } else {
            redirect('/login');
        }

    }, [])

    return (
        <>
            <TaskForm closePopup={() => setIsPopupOpen(false)} isPopupOpen={isPopupOpen} handleAddTask={handleAddTask} />
            <div className='pt-[10.5rem] pb-20'>
                <div className='flex justify-between items-center mb-10'>
                    <h1 className='text-5xl font-extrabold'>{currentAuthUser?.username}'s Data</h1>
                    <Button onClick={() => setIsPopupOpen(true)} className='bg-white text-[#27272a] hover:bg-white/90'>Add Task</Button>
                </div>
                <div className='flex justify-between gap-10'>
                    <Tasks completed={false} />
                    <Tasks completed={true} />
                </div>
            </div>
        </>
    )
}

export default App;
