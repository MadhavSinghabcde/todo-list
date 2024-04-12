'use client'

import { useFormStatus } from "react-dom";

type AuthButtonProp = {
    type: string;
}

const AuthButton = ({ type }: AuthButtonProp) => {
    const { pending } = useFormStatus()

    return (
        <button
            aria-disabled={pending}
            className={`${pending ? 'cursor-wait' : 'cursor-pointer'} inline-flex w-full whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer bg-white text-[#27272a] hover:bg-white/90`}
        >
            {pending ? 'Loading...' : type === 'register' ? 'Register' : 'Login'}
        </button>
    )
}

export default AuthButton;
