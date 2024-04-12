import { AuthContextType } from "@/types/auth";
import { createContext } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };
