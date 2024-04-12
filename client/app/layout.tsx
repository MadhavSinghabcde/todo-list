'use client'

// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { AuthUser } from '@/types/auth';
import { TaskContext } from '@/context/TaskContext';
import { Task } from '@/types/task';
import NavBar from '@/components/NavBar';

type RootLayoutProps = {
    children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] })

// const metadata: Metadata = {
//     title: 'Task Manager',
//     description: 'A Task Manager to manage tasks obv ;)',
// }

const RootLayout = ({ children }: RootLayoutProps) => {
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const [currentAuthUser, setCurrentAuthUser] = useState<AuthUser | null>(null);

    return (
        <html lang="en">
            {/* TODO: X-axis padding on smaller screens */}
            <body className={`relative ${inter.className} antialiased max-w-5xl mx-auto leading-7`}>
                <AuthContext.Provider value={{ currentAuthUser, setCurrentAuthUser }}>
                    <TaskContext.Provider value={{ tasks, setTasks }}>
                        <NavBar />
                        {children}
                    </TaskContext.Provider>
                </AuthContext.Provider>
            </body>
        </html>
    )
}

// export { metadata };
export default RootLayout;
