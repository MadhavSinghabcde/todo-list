import { NextFunction, Request, Response } from "express";

const serverError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    const error = 'Something went wrong';
    res.status(500).send({ error });
}

export default serverError;
