'use server'

import { login, register } from "@/lib/user";
import { AuthUser, AuthUserCheck } from "@/types/auth";

// Type : LoginUserDetails | RegisterUserDetails
const sendAuthRequest = async <T>(
    userDetails: T,
    authRequest: (userDetails: T) => Promise<any>
) => {
    try {
        // CHECK?: Type checking could be done on the first server request
        // check on @/lib/user
        const user: AuthUser = await authRequest(userDetails);
        const newState: AuthUserCheck = {
            user,
            error: null
        };

        return newState;
    } catch (error) {
        if (error instanceof Error) {
            const newState = {
                user: null,
                error: error.message
            }

            return newState;
        }
    }
}

const registerUser = async (_prevState: any, formData: FormData) => {
    // CHECK: Valid use of 'as' in this
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const userDetails = { username, email, password };
    const newState = await sendAuthRequest(userDetails, register);

    return newState;
}

const loginUser = async (_prevState: any, formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const userDetails = { email, password };
    const newState = await sendAuthRequest(userDetails, login);

    return newState;
}

export { registerUser, loginUser };
