import { AuthUser, LoginUserDetails, RegisterUserDetails } from "@/types/auth";

const BASE_URL = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL

const sendRequest = async (
    userDetails: LoginUserDetails | RegisterUserDetails,
    slug: string
): Promise<AuthUser> => {
    try {
        const res = await fetch(`${BASE_URL}/api/users/${slug}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails),
            cache: 'no-store'
        })
        const data = await res.json();

        // Possible reponse status code
        // 400 -> Some validatin error in form (login/regsiter)
        // 401 -> Wrong password (login)
        // 404 -> User doesn't exist (login)
        // 409 -> User already exist (register)
        // 500 -> Some missed server error (server middleware)

        // TODO: Do something for multiple errors
        if (res.status === 400) {
            console.error(data, res.status);
            throw new Error(data.errors[0].msg);
        }

        if (!res.ok) throw new Error(data.error);

        return data;
    } catch (error) {
        throw error;
    }
}

const register = async (userDetails: RegisterUserDetails) => {
    try {
        const user = await sendRequest(userDetails, 'register');
        return user;
    } catch (error) {
        throw error;
    }
}

const login = async (userDetails: LoginUserDetails) => {
    try {
        const user = await sendRequest(userDetails, 'login');
        return user;
    } catch (error) {
        throw error;
    }
}

export { register, login };
