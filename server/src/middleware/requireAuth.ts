import jwt from 'jsonwebtoken';
import {
    NextFunction,
    Request,
    Response
} from "express";
import UserModel from '../models/user';
import { Payload } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET as string;

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        const error = 'No JWT token provided';
        return res.status(401).send({ error });
    }

    const token = authorization.split(' ')[1];

    try {
        // CHECK: Use of 'as'
        const payload = jwt.verify(token, JWT_SECRET) as Payload;
        const user = await UserModel.findOne({ email: payload.email });

        // CHECK: Why did I do this? Why a check for user?
        if (!user) {
            const error = 'User doesn\'t exist';
            return res.status(404).send({ error });
        }

        req.email = payload.email;
        next();
    } catch (err) {
        const error = 'Unauthorized access';
        return res.status(401).send({ error });
    }
}

export default requireAuth;
