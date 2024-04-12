import { Request, Response } from "express";
import { genSalt, hash, compare } from 'bcrypt';
import UserModel, { UserType } from "../models/user";
import { validationResult } from "express-validator";
import { createToken } from "../lib/utils";

const loginUser = async (req: Request, res: Response) => {
    // CHECK: Reconsider validation on login
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    // Combine the two (email and password) in a single response
    // For security resaons (not knowing what is wrong from either)
    if (!user) {
        const error = 'User doesn\'t exist';
        return res.status(404).send({ error });
    }

    const correctPassword = await compare(password, user.password);

    if (!correctPassword) {
        const error = 'Wrong password';
        return res.status(401).send({ error });
    }

    const token = createToken(email);
    const response = {
        username: user.username,
        email: user.email,
        token
    };

    res.send(response);
}

const registerUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // TODO -
        // Password check should be only after user in DB had been checked
        // But user field should be checked before password field
        return res.status(400).send({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
        const error = 'User already exist';
        return res.status(409).send({ error });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUserValues: UserType = {
        username,
        email,
        password: hashedPassword
    }

    const newUser = await UserModel.create(newUserValues);

    const token = createToken(newUser.email);
    const response = {
        username: newUser.username,
        email: newUser.email,
        token
    };

    res.send(response);
}

export {
    loginUser,
    registerUser,
};
