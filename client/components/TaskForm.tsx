import { UpdateTaskReq } from "@/types/task";
import { FormEvent, useState } from "react";
import Button from "./Button";

type TaskFormProps = {
    isPopupOpen: boolean;
    closePopup: () => void;
    handleAddTask: (task: UpdateTaskReq) => void;
}

const TaskForm = ({ isPopupOpen, closePopup, handleAddTask }: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const task: UpdateTaskReq = { title, description, completed: false };
        handleAddTask(task);

        setTitle('');
        setDescription('');
    }

    return (
        <div role="dialog" className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${isPopupOpen ? 'block' : 'hidden'} bg-inherit border border-[#27272a] rounded-xl p-6 flex flex-col gap-5`}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute top-4 right-4 cursor-pointer opacity-70 hover:opacity-100" onClick={closePopup}>
                <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            <div className='flex flex-col space-y-1.5'>
                <h2 className='text-lg font-semibold leading-none tracking-tight'>Add task</h2>
                <p className='text-sm text-[#a1a1aa]'>Enter the required details to add a new task.</p>
            </div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-1.5'>
                    <label className='text-sm font-medium leading-none' htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title of your task"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-[#27272a] bg-transparent px-2 py-1 text-sm shadow-sm transition-colors placeholder-[#a1a1aa] focus:outline-none focus:ring-1 focus:ring-[#fafafa]"
                        required
                    />
                </div>
                <div className='flex flex-col space-y-1.5'>
                    <label className='text-sm font-medium leading-none' htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Some extra description of your task"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="flex w-full rounded-md border border-[#27272a] bg-transparent px-2 py-1 text-sm shadow-sm transition-colors placeholder-[#a1a1aa] focus:outline-none focus:ring-1 focus:ring-[#fafafa]"
                        required
                    />
                </div>
                <div className='flex justify-end'>
                    <Button className="bg-white text-[#27272a] hover:bg-white/90">Add</Button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;
