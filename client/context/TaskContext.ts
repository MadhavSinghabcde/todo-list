import { TaskContextType } from "@/types/task";
import { createContext } from "react";

const TaskContext = createContext<TaskContextType | null>(null);

export { TaskContext };
