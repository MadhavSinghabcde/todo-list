import jwt from "jsonwebtoken"

// CHECK: use of 'as'
const JWT_SECRET = process.env.JWT_SECRET as string;

const createToken = (email: string) => {
    const tokenOptions = { expiresIn: '3d' };
    const token = jwt.sign({ email }, JWT_SECRET, tokenOptions);

    return token;
}

export { createToken };
