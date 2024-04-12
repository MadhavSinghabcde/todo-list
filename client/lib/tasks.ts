import { Task, UpdateTaskReq } from "@/types/task";

// import { delay } from "./utils";

// const token = process.env.NEXT_PUBLIC_TEMP_TOKEN as string;
// TODO: Fix all 'throw data.error' to actual Error instance

// CHECK: If works every time any API endpoint is called
// THEN: Passon token as param on every request
// const { currentAuthUser } = useContext(AuthContext) as AuthContextType;
// const token = currentAuthUser?.token;

const BASE_URL = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL

const getTasks = async (token: string): Promise<Task[]> => {
    // Use for Skeleton testing
    // await delay(2500);

    try {
        const res = await fetch(`${BASE_URL}/api/tasks`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            cache: 'no-store'
        })

        // CHECK: Check of either 'throw <error>' OR 'throw new Error(<error>)'
        const data = await res.json();
        if (!res.ok) throw data;

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const updateTask = async (newTask: Task, token: string): Promise<Task> => {
    const updatedTask: UpdateTaskReq = {
        title: newTask.title,
        description: newTask.description,
        completed: newTask.completed
    }

    try {
        const res = await fetch(`${BASE_URL}/api/tasks/${newTask._id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask),
            cache: 'no-store'
        })

        const data = await res.json();
        if (!res.ok) throw data;

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const removeTask = async (taskId: string, token: string): Promise<Task> => {
    try {
        const res = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            cache: 'no-store'
        })
        
        const data = await res.json();
        if (!res.ok) throw data;

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const addTask = async (newTask: UpdateTaskReq, token: string): Promise<Task> => {
    try {
        const res = await fetch(`${BASE_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask),
            cache: 'no-store'
        })

        const data = await res.json();
        if (!res.ok) throw data;

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {
    getTasks,
    removeTask,
    updateTask,
    addTask
};
