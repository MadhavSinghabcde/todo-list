'use client'

import { AuthContext } from "@/context/AuthContext";
import { TaskContext } from "@/context/TaskContext";
import { TaskContextType } from "@/types/task";
import { AuthContextType } from "@/types/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

const NavBar = () => {
    const { currentAuthUser, setCurrentAuthUser } = useContext(AuthContext) as AuthContextType;
    const { setTasks } = useContext(TaskContext) as TaskContextType;

    const pathname = usePathname();
    const router = useRouter();

    const logoutUser = () => {
        localStorage.clear();
        setCurrentAuthUser(null);
        setTasks(null);

        // CHECK: Use of redirect from next/navigation?
        // CHECK: Use of reouter.push('/login')
        router.replace('/login');
    }

    return (
        <div className='absolute w-full h-20 flex justify-between items-center'>
            <h1 className='font-bold uppercase'>Tasksphere</h1>
            <ul className='flex gap-6 items-center text-sm font-medium'>
                {currentAuthUser ? (
                    <>
                        <li>{currentAuthUser.email}</li>
                        <li>
                            <button
                                onClick={logoutUser}
                                className='inline-flex w-full whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer bg-transparent text-white hover:bg-[#27272a]'
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href='/login' className={`${pathname === '/login' ? 'text-[#e1e7ef]' : 'text-[#ededed]/60'} transition-colors ease-in-out hover:text-[#ededed]/80`}>Login</Link>
                        </li>
                        <li>
                            <Link href='/register' className={`${pathname === '/register' ? 'text-[#e1e7ef]' : 'text-[#ededed]/60'} transition-colors ease-in-out hover:text-[#ededed]/80`}>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </div >
    )
}

export default NavBar;
